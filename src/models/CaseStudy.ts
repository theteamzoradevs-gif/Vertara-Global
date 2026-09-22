import mongoose, { Schema, models, model } from "mongoose";

const CaseStudySchema = new Schema(
  {
    title: String,
    client: String,
    industry: String,
    challenge: String,
    approach: String,
    result: String,
    metrics: [{ label: String, value: String }],
    image: String,
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const TestimonialSchema = new Schema(
  {
    quote: String,
    name: String,
    role: String,
    company: String,
    image: String,
  },
  { timestamps: true },
);

const ClientLogoSchema = new Schema(
  {
    name: String,
    logoText: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

if (models.CaseStudy) {
  delete (models as Record<string, unknown>).CaseStudy;
}

export const CaseStudy = model("CaseStudy", CaseStudySchema);
export const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);
export const ClientLogo =
  models.ClientLogo || model("ClientLogo", ClientLogoSchema);
