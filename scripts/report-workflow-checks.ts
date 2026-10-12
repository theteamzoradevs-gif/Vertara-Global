import assert from "node:assert/strict";
import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { GccAssessment } from "../src/models/GccAssessment";
import { notifyFounderOfAssessment } from "../src/lib/founder-notification";
import { smtpConfigured } from "../src/lib/mail";
import {
  approveAssessmentReport,
  deliverApprovedReport,
  startExpertReview,
  WorkflowError,
} from "../src/lib/assessment-workflow";

const answers = Array.from({ length: 12 }, (_, index) => ({
  question: `Question ${index + 1}`,
  answer: `Answer ${index + 1}`,
}));

async function main() {
  const conn = await connectDB();
  assert.ok(conn, "MongoDB is required for the workflow check");
  const submissionKey = `workflow-check-${Date.now()}`;
  const created = await GccAssessment.create({
    name: "Workflow Check",
    company: "Workflow Co",
    email: "workflow-check@example.com",
    submissionKey,
    answers,
    status: "new",
    notificationStatus: "pending",
  });
  const id = String(created._id);

  try {
    const loaded = await GccAssessment.findById(id);
    assert.equal(loaded?.status, "new");

    await assert.rejects(
      () => approveAssessmentReport(id, { reportContent: "Too early" }),
      (err: unknown) => err instanceof WorkflowError && /review/.test(err.message),
    );
    await assert.rejects(
      () => deliverApprovedReport(id),
      (err: unknown) => err instanceof WorkflowError && /approved/.test(err.message),
    );

    const reviewed = await startExpertReview(id, "Practice Expert", "admin@example.com");
    assert.equal(reviewed.status, "in_review");
    assert.equal(reviewed.reviewer, "Practice Expert");
    assert.ok(reviewed.reviewStartedAt);
    assert.ok(reviewed.reportDueAt);

    await assert.rejects(
      () => approveAssessmentReport(id, { reportContent: "   " }),
      (err: unknown) => err instanceof WorkflowError,
    );

    const approved = await approveAssessmentReport(id, {
      reportContent: "Expert-approved feasibility notes.",
      reportReference: "expert-file-ref-1",
    });
    assert.equal(approved.status, "approved");
    assert.ok(approved.approvedAt);
    assert.equal(approved.reportContent, "Expert-approved feasibility notes.");

    const firstDelivery = await deliverApprovedReport(id);
    const afterFirst = await GccAssessment.findById(id);
    if (smtpConfigured()) {
      console.log("smtp delivery result", firstDelivery);
    } else {
      assert.equal(firstDelivery.ok, false);
      assert.equal(afterFirst?.status, "approved");
      assert.equal(afterFirst?.reportDeliveryStatus, "failed");
      assert.notEqual(afterFirst?.status, "report_sent");
    }

    const secondDelivery = await deliverApprovedReport(id);
    const afterSecond = await GccAssessment.findById(id);
    assert.equal(await GccAssessment.countDocuments({ submissionKey }), 1);
    if (!smtpConfigured()) {
      assert.equal(secondDelivery.ok, false);
      assert.equal(afterSecond?.status, "approved");
      assert.equal(afterSecond?.reportDeliveryStatus, "failed");
      assert.ok((afterSecond?.reportDeliveryAttempts || 0) >= 2);
    }

    const notice = await notifyFounderOfAssessment(afterSecond || created);
    if (!smtpConfigured()) assert.equal(notice.ok, false);
    const afterNotice = await GccAssessment.findById(id);
    assert.equal(afterNotice?.notificationStatus, smtpConfigured() ? afterNotice?.notificationStatus : "failed");
    const attempts = afterNotice?.notificationAttempts || 0;

    await notifyFounderOfAssessment(afterNotice || created);
    const retried = await GccAssessment.findById(id);
    if (!smtpConfigured()) {
      assert.equal(retried?.notificationStatus, "failed");
      assert.ok((retried?.notificationAttempts || 0) > attempts);
    }

    await GccAssessment.findByIdAndUpdate(id, { $set: { notificationStatus: "sent", notificationClaim: null } });
    const duplicate = await notifyFounderOfAssessment(retried || created);
    const afterDuplicate = await GccAssessment.findById(id);
    assert.equal(duplicate.ok, true);
    assert.equal("alreadySent" in duplicate && duplicate.alreadySent, true);
    assert.equal(afterDuplicate?.notificationStatus, "sent");
    assert.equal(afterDuplicate?.notificationAttempts, retried?.notificationAttempts);

    const unauthorized = await fetch("http://localhost:3000/api/admin/assessments/" + id + "/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewer: "Nobody" }),
    });
    assert.equal(unauthorized.status, 401);
    const unauthorizedDeliver = await fetch("http://localhost:3000/api/admin/assessments/" + id + "/deliver", {
      method: "POST",
    });
    assert.equal(unauthorizedDeliver.status, 401);

    console.log(
      JSON.stringify({
        workflow: "passed",
        smtpConfigured: smtpConfigured(),
        founderDeliveryConfirmed: Boolean(smtpConfigured() && notice.ok),
        reportDeliveryConfirmed: Boolean(smtpConfigured() && firstDelivery.ok),
      }),
    );
  } finally {
    await GccAssessment.deleteMany({ submissionKey });
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
