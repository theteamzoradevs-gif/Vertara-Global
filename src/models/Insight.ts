import mongoose, { Schema, models, model } from "mongoose";

const InsightSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    excerpt: String,
    body: String,
    coverImage: String,
    category: String,
    readTime: String,
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

if (models.Insight) {
  delete (models as Record<string, unknown>).Insight;
}

export const Insight = model("Insight", InsightSchema);
