import mongoose, { Schema, models, model } from "mongoose";

const AnswerSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const GccAssessmentSchema = new Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_review", "approved", "report_sent"],
      default: "new",
    },
    submissionKey: { type: String, unique: true, sparse: true },
    answers: { type: [AnswerSchema], required: true },
    reportDueAt: Date,
    reviewer: String,
    reviewerAccount: String,
    reviewStartedAt: Date,
    approvedAt: Date,
    reportContent: String,
    reportReference: String,
    reportDeliveryStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
    },
    reportDeliveryError: String,
    reportDeliveryAttempts: { type: Number, default: 0 },
    reportSentAt: Date,
    reportDeliveryClaim: String,
    reportDeliveryClaimedAt: Date,
    notificationStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    notificationError: String,
    notificationAttempts: { type: Number, default: 0 },
    lastNotificationAt: Date,
    notificationClaim: String,
    notificationClaimedAt: Date,
  },
  { timestamps: true },
);

if (models.GccAssessment) {
  delete (models as Record<string, unknown>).GccAssessment;
}

export const GccAssessment = model("GccAssessment", GccAssessmentSchema);
