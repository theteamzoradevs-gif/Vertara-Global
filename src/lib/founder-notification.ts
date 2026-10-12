import type { Model } from "mongoose";
import { Lead } from "@/models/Lead";
import { GccAssessment } from "@/models/GccAssessment";
import { formatAssessmentAnswer, type StoredAssessmentAnswer } from "@/lib/gcc-assessment";
import { sendFounderEmail, type MailResult } from "@/lib/mail";

const STALE_CLAIM_MS = 2 * 60 * 1000;

export type FounderNoticeResult = MailResult | { ok: true; alreadySent: true };

function siteOrigin() {
  return (process.env.AUTH_URL || "http://localhost:3000").replace(/\/$/, "");
}

function stamp(value?: Date | string | null) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function assessmentAdminUrl(id: string) {
  return `${siteOrigin()}/admin/gcc-assessment?id=${id}`;
}

type LeadNotice = {
  _id?: { toString(): string } | string;
  name?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  intent?: string | null;
  message?: string | null;
  createdAt?: Date | string | null;
};

export function leadNotificationText(lead: LeadNotice) {
  return [
    "A new inquiry was saved on Vertara Global.",
    "",
    `Submission type: Lead`,
    `Name: ${lead.name || "—"}`,
    `Company: ${lead.company || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Source: ${lead.source || "—"}`,
    `Intent: ${lead.intent || "—"}`,
    `Message: ${lead.message || "—"}`,
    `Submitted: ${stamp(lead.createdAt)}`,
    "",
    `Admin: ${siteOrigin()}/admin/inquiries${lead._id ? `?id=${String(lead._id)}` : ""}`,
  ].join("\n");
}

export function assessmentNotificationText(assessment: {
  _id?: { toString(): string } | string;
  name?: string;
  company?: string;
  email?: string;
  createdAt?: Date | string;
  answers?: StoredAssessmentAnswer[];
}) {
  const id = assessment._id ? String(assessment._id) : "";
  const lines = [
    "A GCC Assessment was saved on Vertara Global.",
    "",
    `Submission type: GCC Assessment`,
    `Name: ${assessment.name || "—"}`,
    `Company: ${assessment.company || "—"}`,
    `Email: ${assessment.email || "—"}`,
    `Submitted: ${stamp(assessment.createdAt)}`,
    "",
    "The feasibility report is prepared by a Vertara practice expert within 2 business days. This email does not include a generated report.",
    "",
    id ? `View the full 12 answers: ${assessmentAdminUrl(id)}` : "",
  ];
  if (assessment.answers?.length) {
    lines.push("", "Answers:");
    assessment.answers.forEach((row, index) => {
      lines.push(`${index + 1}. ${row.question}`, formatAssessmentAnswer(row.answer), "");
    });
  }
  return lines.filter((line) => line !== undefined).join("\n");
}

type NoticeDoc = {
  notificationStatus?: string | null;
  notificationClaim?: string | null;
};

async function claimNotification(model: Model<NoticeDoc>, id: string) {
  const claim = crypto.randomUUID();
  const staleBefore = new Date(Date.now() - STALE_CLAIM_MS);
  return model.findOneAndUpdate(
    {
      _id: id,
      notificationStatus: { $ne: "sent" },
      $or: [
        { notificationClaim: { $exists: false } },
        { notificationClaim: null },
        { notificationClaim: "" },
        { notificationClaimedAt: { $lte: staleBefore } },
      ],
    },
    { $set: { notificationClaim: claim, notificationClaimedAt: new Date() } },
    { returnDocument: "after" },
  );
}

async function finishNotification(
  model: Model<NoticeDoc>,
  id: string,
  claim: string,
  ok: boolean,
  error?: string,
) {
  await model.findOneAndUpdate(
    { _id: id, notificationClaim: claim, notificationStatus: { $ne: "sent" } },
    {
      $set: {
        notificationStatus: ok ? "sent" : "failed",
        notificationError: ok ? "" : error || "Email send failed.",
        lastNotificationAt: new Date(),
        notificationClaim: null,
        notificationClaimedAt: null,
      },
      $inc: { notificationAttempts: 1 },
    },
  );
}

async function notifyFounder(
  model: Model<NoticeDoc>,
  id: string,
  subject: string,
  text: string,
): Promise<FounderNoticeResult> {
  let claimed;
  try {
    claimed = await claimNotification(model, id);
  } catch (err) {
    console.error("[mail] could not claim founder notification:", err);
    return { ok: false, error: "Could not record the notification attempt." };
  }
  if (!claimed) {
    const current = await model.findById(id).select("notificationStatus");
    if (!current) return { ok: false, error: "Record not found." };
    if (current.notificationStatus === "sent") return { ok: true, alreadySent: true };
    return { ok: false, error: "A founder notification attempt is already in progress." };
  }

  const claim = String(claimed.notificationClaim || "");
  const result = await sendFounderEmail({ subject, text });
  try {
    await finishNotification(model, id, claim, result.ok, result.ok ? undefined : result.error);
  } catch (err) {
    console.error("[mail] could not record founder notification status:", err);
  }
  return result;
}

export async function notifyFounderOfLead(lead: LeadNotice & {
  _id: { toString(): string } | string;
}): Promise<FounderNoticeResult> {
  const id = String(lead._id);
  return notifyFounder(
    Lead as Model<NoticeDoc>,
    id,
    `New inquiry: ${lead.name || "Website"}`,
    leadNotificationText(lead),
  );
}

export async function notifyFounderOfAssessment(assessment: {
  _id: { toString(): string } | string;
  name?: string;
  company?: string;
  email?: string;
  createdAt?: Date | string;
  answers?: StoredAssessmentAnswer[];
}): Promise<FounderNoticeResult> {
  const id = String(assessment._id);
  return notifyFounder(
    GccAssessment as Model<NoticeDoc>,
    id,
    `GCC Assessment: ${assessment.name || "New submission"}`,
    assessmentNotificationText(assessment),
  );
}
