import { Schema, models, model } from "mongoose";

const WhatWeStandForSchema = new Schema(
  {
    point: { type: String, required: true },
  },
  { _id: false }
);

const ByTheNumbersSchema = new Schema(
  {
    point: { type: String, required: true },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    bio: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const AboutContentSchema = new Schema(
  {
    aboutUs: {
      title: { type: String, default: "About Us" },
      description: { type: String, default: "" },
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
      paragraph: { type: String, default: "" },
    },
    whatWeStandFor: [WhatWeStandForSchema],
    byTheNumbers: [ByTheNumbersSchema],
    theTeam: [TeamMemberSchema],
    closingCta: {
      text: {
        type: String,
        default: "Let’s build the right GCC — and build it to last.",
      },
    },
  },
  { timestamps: true }
);

if (models.AboutContent) {
  delete (models as Record<string, unknown>).AboutContent;
}

export const AboutContent = model("AboutContent", AboutContentSchema);
