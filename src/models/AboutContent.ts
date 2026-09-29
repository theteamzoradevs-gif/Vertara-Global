import mongoose, { Schema, models, model } from "mongoose";

const WhatWeStandForSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const ByTheNumbersSchema = new Schema(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { _id: false }
);

const AboutContentSchema = new Schema(
  {
    aboutUs: {
      title: { type: String, default: "About Us" },
      content: { type: String, default: "" },
    },
    ourStory: {
      title: { type: String, default: "Our Story" },
      content: { type: String, default: "" },
    },
    ourVision: {
      title: { type: String, default: "Our Vision" },
      statement: { type: String, default: "" },
    },
    theName: {
      title: { type: String, default: "The Name" },
      meaning: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    whatWeStandFor: [WhatWeStandForSchema],
    byTheNumbers: [ByTheNumbersSchema],
    theTeam: [TeamMemberSchema],
    closingCta: {
      title: {
        type: String,
        default: "Let’s build the right GCC — and build it to last.",
      },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "Discuss your GCC mandate" },
      buttonLink: { type: String, default: "/contact" },
    },
  },
  { timestamps: true }
);

if (models.AboutContent) {
  delete (models as Record<string, unknown>).AboutContent;
}

export const AboutContent = model("AboutContent", AboutContentSchema);
