import type {
  Metric,
  seedSettings,
  seedServices,
  seedEngagementModels,
  seedInsights,
  seedCaseStudies,
  seedTestimonials,
  seedClientLogos,
  seedFaqs,
} from "@/data/seed-content";

export type Settings = typeof seedSettings;
export type ServiceItem = (typeof seedServices)[number] & { _id?: string };
export type EngagementModelItem = (typeof seedEngagementModels)[number] & {
  _id?: string;
};
export type InsightItem = (typeof seedInsights)[number] & {
  _id?: string;
  publishedAt?: string | Date;
};
export type CaseStudyItem = (typeof seedCaseStudies)[number] & { _id?: string };
export type TestimonialItem = (typeof seedTestimonials)[number] & {
  _id?: string;
};
export type ClientLogoItem = (typeof seedClientLogos)[number] & {
  _id?: string;
};
export type FaqItem = (typeof seedFaqs)[number] & { _id?: string };
export type { Metric };
