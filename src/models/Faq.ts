import mongoose, { Schema, models, model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "Home" },
    order: { type: Number, default: 0 },
    catalogVersion: { type: Number },
  },
  { timestamps: true },
);

if (models.Faq) {
  delete (models as Record<string, unknown>).Faq;
}

export const Faq = model("Faq", FaqSchema);
