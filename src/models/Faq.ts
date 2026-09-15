import mongoose, { Schema, models, model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Faq = models.Faq || model("Faq", FaqSchema);
