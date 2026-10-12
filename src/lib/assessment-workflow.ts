import { GccAssessment } from "@/models/GccAssessment";
import { sendEmail } from "@/lib/mail";
import { reportDueAt } from "@/lib/business-days";

/**
 * The client requires a practice expert to review and approve the feasibility
 * report, with delivery inside 2 business days. The report body is whatever the
 * expert stores here. No report layout, scoring model, or file format has been
 * specified, so this workflow does not generate one.
 */
export const REPORT_FORMAT_UNDECIDED =
  "The feasibility report is written or referenced by a Vertara practice expert. Automatic report generation is not implemented because the report format has not been defined.";

const STALE_CLAIM_MS = 2 * 60 * 1000;

export class WorkflowError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function assertId(id: string) {
  if (!/^[a-f\d]{24}$/i.test(id)) {
    throw new WorkflowError("Assessment not found.", 404);
  }
}

async function loadAssessment(id: string) {
  assertId(id);
  const assessment = await GccAssessment.findById(id);
  if (!assessment) throw new WorkflowError("Assessment not found.", 404);
  return assessment;
}

export async function startExpertReview(id: string, reviewer: string, reviewerAccount?: string | null) {
  const name = reviewer.trim();
  if (!name || name.length > 120) {
    throw new WorkflowError("Enter the practice expert who will review this assessment.");
  }
  const assessment = await loadAssessment(id);
  if (assessment.status === "approved" || assessment.status === "report_sent") {
    throw new WorkflowError("This assessment is already past expert review.");
  }
  assessment.status = "in_review";
  assessment.reviewer = name;
  if (reviewerAccount?.trim()) assessment.reviewerAccount = reviewerAccount.trim();
  if (!assessment.reviewStartedAt) assessment.reviewStartedAt = new Date();
  if (!assessment.reportDueAt) {
    assessment.reportDueAt = reportDueAt(assessment.createdAt ? new Date(assessment.createdAt) : new Date());
  }
  await assessment.save();
  return assessment;
}

export async function approveAssessmentReport(
  id: string,
  input: { reportContent?: string | null; reportReference?: string | null },
) {
  const content = input.reportContent?.trim() || "";
  const reference = input.reportReference?.trim() || "";
  if (content.length > 20000 || reference.length > 500) {
    throw new WorkflowError("The report content or reference is too long.");
  }
  if (!content && !reference) {
    throw new WorkflowError("Store the expert-reviewed report text or a report reference before approval.");
  }

  const assessment = await loadAssessment(id);
  if (assessment.status !== "in_review") {
    throw new WorkflowError("A practice expert must review the assessment before it can be approved.");
  }
  if (!assessment.reviewer?.trim()) {
    throw new WorkflowError("Assign a practice expert before approving the report.");
  }

  assessment.reportContent = content || undefined;
  assessment.reportReference = reference || undefined;
  assessment.status = "approved";
  assessment.approvedAt = new Date();
  assessment.reportDeliveryStatus = "pending";
  assessment.reportDeliveryError = "";
  await assessment.save();
  return assessment;
}

function reportEmailText(assessment: {
  name?: string | null;
  company?: string | null;
  reportContent?: string | null;
  reportReference?: string | null;
  reviewer?: string | null;
}) {
  const lines = [
    "Your GCC Assessment feasibility report has been reviewed and approved by a Vertara practice expert.",
    "",
    `Name: ${assessment.name || "—"}`,
    `Company: ${assessment.company || "—"}`,
    `Reviewed by: ${assessment.reviewer || "—"}`,
    "",
  ];
  if (assessment.reportContent?.trim()) {
    lines.push("Report:", assessment.reportContent.trim(), "");
  }
  if (assessment.reportReference?.trim()) {
    lines.push("Report reference:", assessment.reportReference.trim(), "");
  }
  return lines.join("\n");
}

export async function deliverApprovedReport(id: string) {
  assertId(id);
  const claim = crypto.randomUUID();
  const staleBefore = new Date(Date.now() - STALE_CLAIM_MS);
  const assessment = await GccAssessment.findOneAndUpdate(
    {
      _id: id,
      status: "approved",
      reportDeliveryStatus: { $ne: "sent" },
      $or: [
        { reportDeliveryClaim: { $exists: false } },
        { reportDeliveryClaim: null },
        { reportDeliveryClaim: "" },
        { reportDeliveryClaimedAt: { $lte: staleBefore } },
      ],
    },
    { $set: { reportDeliveryClaim: claim, reportDeliveryClaimedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (!assessment) {
    const current = await GccAssessment.findById(id).select("status reportDeliveryStatus");
    if (!current) throw new WorkflowError("Assessment not found.", 404);
    if (current.status === "report_sent" || current.reportDeliveryStatus === "sent") {
      return { ok: true as const, alreadySent: true };
    }
    if (current.status !== "approved") {
      throw new WorkflowError("The report must be approved by a practice expert before it can be sent.");
    }
    return { ok: false as const, error: "A report delivery attempt is already in progress." };
  }

  if (!assessment.reviewer?.trim() || !assessment.approvedAt) {
    await releaseReportClaim(id, claim, "Expert approval is incomplete.");
    throw new WorkflowError("The report must be approved by a practice expert before it can be sent.");
  }
  if (!assessment.reportContent?.trim() && !assessment.reportReference?.trim()) {
    await releaseReportClaim(id, claim, "Approved report content is missing.");
    throw new WorkflowError("The approved report content is missing.");
  }

  const result = await sendEmail({
    to: assessment.email,
    subject: `Your Vertara GCC feasibility report`,
    text: reportEmailText(assessment),
  });

  if (result.ok) {
    await GccAssessment.findOneAndUpdate(
      { _id: id, reportDeliveryClaim: claim },
      {
        $set: {
          status: "report_sent",
          reportDeliveryStatus: "sent",
          reportDeliveryError: "",
          reportSentAt: new Date(),
          reportDeliveryClaim: null,
          reportDeliveryClaimedAt: null,
        },
        $inc: { reportDeliveryAttempts: 1 },
      },
    );
    return { ok: true as const, alreadySent: false };
  }

  await releaseReportClaim(id, claim, result.error);
  return { ok: false as const, error: result.error };
}

async function releaseReportClaim(id: string, claim: string, error: string) {
  await GccAssessment.findOneAndUpdate(
    { _id: id, reportDeliveryClaim: claim, status: { $ne: "report_sent" } },
    {
      $set: {
        status: "approved",
        reportDeliveryStatus: "failed",
        reportDeliveryError: error,
        reportDeliveryClaim: null,
        reportDeliveryClaimedAt: null,
      },
      $inc: { reportDeliveryAttempts: 1 },
    },
  );
}
