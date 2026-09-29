import mongoose, { Schema, models, model } from "mongoose";

const WhatWeStandForSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Layers" },
  },
  { _id: false }
);

const ByTheNumbersSchema = new Schema(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    bullets: { type: [String], default: [] },
    image: { type: String, default: "" },
    initials: { type: String, default: "" },
  },
  { _id: false }
);

const AboutContentSchema = new Schema(
  {
    intro: {
      eyebrow: { type: String, default: "About / Who We Are" },
      title: { type: String, default: "About Vertara Global" },
      description: { type: String, default: "" },
      image: { type: String, default: "/images/about us.png" },
    },
    story: {
      eyebrow: { type: String, default: "Our Story" },
      title: { type: String, default: "About Us" },
      content: { type: String, default: "" },
    },
    vision: {
      eyebrow: { type: String, default: "Our Vision" },
      title: { type: String, default: "Our Vision" },
      statement: { type: String, default: "" },
    },
    theName: {
      eyebrow: { type: String, default: "The Name" },
      title: { type: String, default: "The Meaning of Vertara" },
      meaning: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    whatWeStandFor: [WhatWeStandForSchema],
    byTheNumbers: [ByTheNumbersSchema],
    theTeam: [TeamMemberSchema],
    closingCta: {
      eyebrow: { type: String, default: "Enquire" },
      title: { type: String, default: "Start a conversation with the team" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "Request a partner call" },
      buttonLink: { type: String, default: "/contact" },
    },
  },
  { timestamps: true }
);

if (models.AboutContent) {
  delete (models as Record<string, unknown>).AboutContent;
}

export const AboutContent = model("AboutContent", AboutContentSchema);
