import mongoose, { Schema, models, model } from "mongoose";

const InsightSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    excerpt: String,
    body: String,
    coverImage: String,
    category: String,
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Insight = models.Insight || model("Insight", InsightSchema);
