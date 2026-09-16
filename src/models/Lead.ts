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
      enum: ["contact", "trust_pop", "chat", "engagement_selector"],
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "archived"],
      default: "new",
    },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true },
);

export const Lead = models.Lead || model("Lead", LeadSchema);
