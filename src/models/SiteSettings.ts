import mongoose, { Schema, models, model } from "mongoose";

const MetricSchema = new Schema(
  {
    label: String,
    value: Number,
    suffix: { type: String, default: "+" },
    prefix: { type: String, default: "" },
  },
  { _id: false },
);

const HeroRotatingLineSchema = new Schema(
  {
    label: String,
    detail: String,
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema(
  {
    brandName: { type: String, default: "Vertara Global" },
    tagline: String,
    heroHeadline: String,
    heroSubheadline: String,
    heroBackgroundImage: String,
    heroRotatingEyebrow: String,
    heroRotatingLines: [HeroRotatingLineSchema],
    heroPrimaryCta: String,
    heroSecondaryCta: String,
    heroFormEyebrow: String,
    heroFormTitle: String,
    heroFormDescription: String,
    heroFormButton: String,
    heroFormSuccess: String,
    contactEmail: String,
    contactPhone: String,
    metrics: [MetricSchema],
    trustPopImage: String,
    trustPopHeadline: String,
    aboutStory: String,
    aboutMission: String,
    leadership: [
      {
        name: String,
        role: String,
        bio: String,
        image: String,
      },
    ],
  },
  { timestamps: true },
);

export type SiteSettingsDoc = mongoose.InferSchemaType<typeof SiteSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

if (models.SiteSettings) {
  delete (models as Record<string, unknown>).SiteSettings;
}

export const SiteSettings = model("SiteSettings", SiteSettingsSchema);
