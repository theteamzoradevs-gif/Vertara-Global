import mongoose, { Schema, models, model } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    company: String,
    email: String,
    phone: String,
    intent: String,
    message: String,
    source: {
      type: String,
      default: "contact",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "archived"],
      default: "new",
    },
    metadata: Schema.Types.Mixed,
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

if (models.Lead) {
  delete (models as Record<string, unknown>).Lead;
}

export const Lead = model("Lead", LeadSchema);
