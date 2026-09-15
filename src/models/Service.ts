import mongoose, { Schema, models, model } from "mongoose";

const ProcessStepSchema = new Schema(
  {
    number: String,
    title: String,
    summary: String,
    detail: String,
    image: String,
  },
  { _id: false },
);

const SubServiceSchema = new Schema(
  {
    title: String,
    summary: String,
    detail: String,
  },
  { _id: false },
);

const ServiceSchema = new Schema(
  {
    slug: { type: String, unique: true, required: true },
    name: String,
    shortDescription: String,
    valueProposition: String,
    icon: String,
    image: String,
    processSteps: [ProcessStepSchema],
    subServices: [SubServiceSchema],
    metrics: [
      {
        label: String,
        value: Number,
        suffix: String,
        prefix: String,
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Service = models.Service || model("Service", ServiceSchema);
