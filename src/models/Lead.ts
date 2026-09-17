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
  },
  { timestamps: true },
);

if (models.Lead) {
  delete (models as Record<string, unknown>).Lead;
}

export const Lead = model("Lead", LeadSchema);
