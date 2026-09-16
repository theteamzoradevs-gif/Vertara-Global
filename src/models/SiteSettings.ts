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

const SiteSettingsSchema = new Schema(
  {
    brandName: { type: String, default: "Veratara Global" },
    tagline: String,
    heroHeadline: String,
    heroSubheadline: String,
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

export const SiteSettings =
  models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
