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
import { AboutContent } from "@/models/AboutContent";
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
import { seedAboutContent, type AboutContentData } from "@/data/seed-about";
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

function mergeSettings(doc: Partial<Settings> | null): Settings {
  const settings: Settings = {
    ...seedSettings,
    ...(doc || {}),
    metrics: Array.isArray(doc?.metrics) ? doc.metrics : seedSettings.metrics,
    leadership: doc?.leadership?.length ? doc.leadership : seedSettings.leadership,
    heroRotatingLines: doc?.heroRotatingLines?.length
      ? doc.heroRotatingLines
      : seedSettings.heroRotatingLines,
    libraryImages: Array.isArray(doc?.libraryImages)
      ? doc.libraryImages
      : seedSettings.libraryImages,
  };

  if (!settings.heroBackgroundImage) {
    settings.heroBackgroundImage = seedSettings.heroBackgroundImage;
  }
  if (!settings.heroRotatingEyebrow) {
    settings.heroRotatingEyebrow = seedSettings.heroRotatingEyebrow;
  }
  settings.heroPrimaryCta = "Discuss Your GCC Mandate";
  settings.heroSecondaryCta = "See Our Offerings";
  if (!settings.heroFormEyebrow) settings.heroFormEyebrow = seedSettings.heroFormEyebrow;
  if (!settings.heroFormTitle) settings.heroFormTitle = seedSettings.heroFormTitle;
  if (!settings.heroFormDescription) {
    settings.heroFormDescription = seedSettings.heroFormDescription;
  }
  if (!settings.heroFormButton) settings.heroFormButton = seedSettings.heroFormButton;
  if (typeof doc?.showQuickCallForm === "boolean") {
    settings.showQuickCallForm = doc.showQuickCallForm;
  }

  if (settings.brandName === "GCC Advisor") {
    settings.brandName = "Vertara Global";
  }
  if (settings.contactEmail === "hello@gccadvisor.com") {
    settings.contactEmail = "hello@verataraglobal.com";
  }
  if (settings.aboutStory?.includes("GCC Advisor")) {
    settings.aboutStory = settings.aboutStory.replace(/GCC Advisor/g, "Vertara Global");
  }
  return settings;
}

export async function getSettings(): Promise<Settings> {
  return withDB(async () => {
    const doc = await SiteSettings.findOne().lean();
    const parsed = doc
      ? (JSON.parse(JSON.stringify(doc)) as Partial<Settings>)
      : null;
    return mergeSettings(parsed);
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
    const items = docs.length
      ? (JSON.parse(JSON.stringify(docs)) as InsightItem[])
      : seedInsights;
    return sortFeaturedFirst(items);
  }, sortFeaturedFirst([...seedInsights]));
}

export async function getInsightBySlug(
  slug: string,
): Promise<InsightItem | null> {
  const insights = await getInsights();
  return insights.find((i) => i.slug === slug) ?? null;
}

function sortFeaturedFirst<T extends { featured?: boolean }>(items: T[]): T[] {
  const featured: T[] = [];
  const rest: T[] = [];
  for (const item of items) {
    if (item.featured === true) featured.push(item);
    else rest.push(item);
  }
  return [...featured, ...rest];
}

export function slugifyCaseStudy(title: string): string {
  return (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  return withDB(async () => {
    const docs = await CaseStudy.find().sort({ createdAt: 1 }).lean();
    const items = docs.length
      ? (JSON.parse(JSON.stringify(docs)) as CaseStudyItem[])
      : seedCaseStudies;
    return sortFeaturedFirst(items);
  }, sortFeaturedFirst([...seedCaseStudies]));
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyItem | null> {
  const cases = await getCaseStudies();
  const normalizedSlug = decodeURIComponent(slug || "").toLowerCase().trim();
  return (
    cases.find((c) => {
      const caseSlug = (c as { slug?: string }).slug || slugifyCaseStudy(c.title);
      const caseId = (c as { _id?: string })._id?.toString();
      return caseSlug === normalizedSlug || caseId === normalizedSlug;
    }) ?? null
  );
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
    const ALLOWED_CATEGORIES = ["Home", "Our Offerings", "Insights", "About Us"];
    await Faq.deleteMany({ category: { $nin: ALLOWED_CATEGORIES } });
    let docs = await Faq.find().sort({ order: 1 }).lean();
    if (docs.length === 0) {
      await Faq.insertMany(seedFaqs);
      docs = await Faq.find().sort({ order: 1 }).lean();
    }
    return docs.length
      ? (JSON.parse(JSON.stringify(docs)) as FaqItem[])
      : seedFaqs;
  }, seedFaqs);
}

export async function getAboutContent(): Promise<AboutContentData> {
  return withDB(async () => {
    let doc = await AboutContent.findOne().lean();
    if (!doc) {
      const created = await AboutContent.create(seedAboutContent);
      doc = created.toObject();
    }
    const parsed = JSON.parse(JSON.stringify(doc)) as Partial<AboutContentData>;
    return {
      intro: { ...seedAboutContent.intro, ...(parsed.intro || {}) },
      story: { ...seedAboutContent.story, ...(parsed.story || {}) },
      vision: { ...seedAboutContent.vision, ...(parsed.vision || {}) },
      theName: { ...seedAboutContent.theName, ...(parsed.theName || {}) },
      whatWeStandFor: Array.isArray(parsed.whatWeStandFor) && parsed.whatWeStandFor.length > 0
        ? parsed.whatWeStandFor
        : seedAboutContent.whatWeStandFor,
      byTheNumbers: Array.isArray(parsed.byTheNumbers) && parsed.byTheNumbers.length > 0
        ? parsed.byTheNumbers
        : seedAboutContent.byTheNumbers,
      theTeam: Array.isArray(parsed.theTeam) && parsed.theTeam.length > 0
        ? parsed.theTeam
        : seedAboutContent.theTeam,
      closingCta: { ...seedAboutContent.closingCta, ...(parsed.closingCta || {}) },
    };
  }, seedAboutContent);
}
