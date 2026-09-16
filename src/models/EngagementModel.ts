import mongoose, { Schema, models, model } from "mongoose";

const EngagementModelSchema = new Schema(
  {
    slug: { type: String, unique: true, required: true },
    name: String,
    summary: String,
    engagementLength: String,
    ownership: String,
    setupTime: String,
    bestFit: String,
    costProfile: String,
    practiceSteps: [{ title: String, detail: String }],
    selectorTags: {
      teamSize: [String],
      timeline: [String],
      ownership: [String],
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const EngagementModel =
  models.EngagementModel || model("EngagementModel", EngagementModelSchema);
