import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { Service } from "@/models/Service";
import { EngagementModel } from "@/models/EngagementModel";
import { Insight } from "@/models/Insight";
import {
  CaseStudy,
  Testimonial,
  ClientLogo,
} from "@/models/CaseStudy";
import { Faq } from "@/models/Faq";
import {
  seedSettings,
  seedServices,
  seedEngagementModels,
  seedInsights,
  seedCaseStudies,
  seedTestimonials,
  seedClientLogos,
  seedFaqs,
} from "@/data/seed-content";
import type {
  Settings,
  ServiceItem,
  EngagementModelItem,
  InsightItem,
  CaseStudyItem,
  TestimonialItem,
  ClientLogoItem,
  FaqItem,
} from "@/lib/content/types";

async function withDB<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const conn = await connectDB();
    if (!conn) return fallback;
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getSettings(): Promise<Settings> {
  return withDB(async () => {
    const doc = await SiteSettings.findOne().lean();
    return doc ? (JSON.parse(JSON.stringify(doc)) as Settings) : seedSettings;
  }, seedSettings);
}

export async function getServices(): Promise<ServiceItem[]> {
  return withDB(async () => {
    const docs = await Service.find().sort({ order: 1 }).lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as ServiceItem[])
      : seedServices;
  }, seedServices);
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getEngagementModels(): Promise<EngagementModelItem[]> {
  return withDB(async () => {
    const docs = await EngagementModel.find().sort({ order: 1 }).lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as EngagementModelItem[])
      : seedEngagementModels;
  }, seedEngagementModels);
}

export async function getInsights(): Promise<InsightItem[]> {
  return withDB(async () => {
    const docs = await Insight.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as InsightItem[])
      : seedInsights;
  }, seedInsights);
}

export async function getInsightBySlug(
  slug: string,
): Promise<InsightItem | null> {
  const insights = await getInsights();
  return insights.find((i) => i.slug === slug) ?? null;
}

export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  return withDB(async () => {
    const docs = await CaseStudy.find().lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as CaseStudyItem[])
      : seedCaseStudies;
  }, seedCaseStudies);
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  return withDB(async () => {
    const docs = await Testimonial.find().lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as TestimonialItem[])
      : seedTestimonials;
  }, seedTestimonials);
}

export async function getClientLogos(): Promise<ClientLogoItem[]> {
  return withDB(async () => {
    const docs = await ClientLogo.find().sort({ order: 1 }).lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as ClientLogoItem[])
      : seedClientLogos;
  }, seedClientLogos);
}

export async function getFaqs(): Promise<FaqItem[]> {
  return withDB(async () => {
    const docs = await Faq.find().sort({ order: 1 }).lean();
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as FaqItem[])
      : seedFaqs;
  }, seedFaqs);
}
