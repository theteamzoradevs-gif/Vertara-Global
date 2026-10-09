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
import { ContactContent } from "@/models/ContactContent";
import {
  seedSettings,
  seedServices,
  seedEngagementModels,
  seedCaseStudies,
  seedTestimonials,
  seedClientLogos,
  seedFaqs,
} from "@/data/seed-content";
import {
  seedAboutContent,
  type AboutContentData,
  type WhatWeStandForPoint,
  type ByTheNumbersPoint,
  type TeamMember,
} from "@/data/seed-about";
import {
  seedContactContent,
  type ContactContentData,
} from "@/data/seed-contact";
import { FAQ_TOPIC_CATEGORIES } from "@/lib/faq-categories";
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
    return sortFeaturedFirst(JSON.parse(JSON.stringify(docs)) as InsightItem[]);
  }, []);
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

const ORIGINAL_FAQ_CATEGORY: Record<string, (typeof FAQ_TOPIC_CATEGORIES)[number]> = {
  "What is a Global Capability Center (GCC)?": "The basics",
  "What roles can we hire through a GCC?": "The basics",
  "Can we own the GCC outright?": "Working with Vertara",
  "Do you provide a bridge while our entity is forming?": "Working with Vertara",
  "How long does it take to set up a GCC in India?": "Time, cost and cities",
  "What does a GCC cost compared to an offshore vendor?": "Time, cost and cities",
  "Which Indian city should we choose?": "Time, cost and cities",
  "How do engagement models differ?": "Getting started",
};

async function syncFaqRecords() {
  const initialized = await Faq.exists({ catalogVersion: 2 });
  if (initialized) return;

  await Faq.deleteOne({ question: "test", answer: "atoz" });

  const docs = await Faq.find().sort({ order: 1, createdAt: 1 });
  for (const doc of docs) {
    const original = ORIGINAL_FAQ_CATEGORY[doc.question];
    if (original) doc.category = original;
  }

  const selected: typeof docs = [];
  for (const heading of FAQ_TOPIC_CATEGORIES) {
    const item = docs.find(
      (doc) => doc.category === heading && !selected.some((chosen) => chosen._id.equals(doc._id)),
    );
    if (item && selected.length < 5) selected.push(item);
  }
  for (const doc of docs) {
    if (selected.length >= 5) break;
    if (!selected.some((chosen) => chosen._id.equals(doc._id))) selected.push(doc);
  }

  for (const doc of docs) {
    if (selected.some((chosen) => chosen._id.equals(doc._id))) {
      doc.category = "Home";
    }
    doc.catalogVersion = 2;
    await doc.save();
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  return withDB(async () => {
    await syncFaqRecords();
    const docs = await Faq.find().sort({ order: 1, createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(docs)) as FaqItem[];
  }, seedFaqs);
}

export async function getAboutContent(): Promise<AboutContentData> {
  return withDB(async () => {
    let doc = await AboutContent.findOne().lean();
    if (!doc) {
      const created = await AboutContent.create(seedAboutContent);
      doc = created.toObject();
    }
    const parsed = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>;

    // Safely parse whatWeStandFor
    let whatWeStandFor = seedAboutContent.whatWeStandFor;
    if (Array.isArray(parsed.whatWeStandFor) && parsed.whatWeStandFor.length > 0) {
      const first = parsed.whatWeStandFor[0];
      if (typeof first?.point === "string") {
        whatWeStandFor = parsed.whatWeStandFor as WhatWeStandForPoint[];
      }
    }

    // Safely parse byTheNumbers
    let byTheNumbers = seedAboutContent.byTheNumbers;
    if (Array.isArray(parsed.byTheNumbers) && parsed.byTheNumbers.length > 0) {
      const first = parsed.byTheNumbers[0];
      if (typeof first?.point === "string") {
        byTheNumbers = parsed.byTheNumbers as ByTheNumbersPoint[];
      }
    }

    // Safely parse theTeam
    let theTeam = seedAboutContent.theTeam;
    if (Array.isArray(parsed.theTeam) && parsed.theTeam.length > 0) {
      // Check if it's the old team with Rajesh or missing full bio
      const hasRajesh = (parsed.theTeam as Array<{ name?: string }>).some(
        (m) => m?.name?.toLowerCase().includes("rajesh")
      );
      if (!hasRajesh) {
        theTeam = parsed.theTeam as TeamMember[];
      }
    }

    const parsedAboutUs = (parsed.aboutUs || {}) as Partial<AboutContentData["aboutUs"]>;
    const parsedOurStory = (parsed.ourStory || {}) as Partial<AboutContentData["ourStory"]>;
    const parsedOurVision = (parsed.ourVision || {}) as Partial<AboutContentData["ourVision"]>;
    const parsedTheName = (parsed.theName || {}) as Partial<AboutContentData["theName"]>;
    const parsedCta = (parsed.closingCta || {}) as Partial<AboutContentData["closingCta"]>;

    return {
      aboutUs: {
        title: parsedAboutUs.title || seedAboutContent.aboutUs.title,
        description: parsedAboutUs.description || seedAboutContent.aboutUs.description,
      },
      ourStory: {
        title: parsedOurStory.title || seedAboutContent.ourStory.title,
        content: parsedOurStory.content || seedAboutContent.ourStory.content,
      },
      ourVision: {
        title: parsedOurVision.title || seedAboutContent.ourVision.title,
        statement: parsedOurVision.statement || seedAboutContent.ourVision.statement,
      },
      theName: {
        title: parsedTheName.title || seedAboutContent.theName.title,
        paragraph: parsedTheName.paragraph || seedAboutContent.theName.paragraph,
      },
      whatWeStandFor,
      byTheNumbers,
      theTeam,
      closingCta: {
        text: parsedCta.text || seedAboutContent.closingCta.text,
      },
    };
  }, seedAboutContent);
}

export async function getContactContent(): Promise<ContactContentData> {
  return withDB(async () => {
    let doc = await ContactContent.findOne().lean();
    if (!doc) {
      const created = await ContactContent.create(seedContactContent);
      doc = created.toObject();
    }
    const parsed = JSON.parse(JSON.stringify(doc)) as Partial<ContactContentData>;
    return {
      eyebrow: parsed.eyebrow || seedContactContent.eyebrow,
      headline: parsed.headline || seedContactContent.headline,
      description: parsed.description || seedContactContent.description,
      formTitle: parsed.formTitle || seedContactContent.formTitle,
      formSubmitLabel: parsed.formSubmitLabel || seedContactContent.formSubmitLabel,
      companyName: parsed.companyName || seedContactContent.companyName,
      contactEmail: parsed.contactEmail || seedContactContent.contactEmail,
      contactPhone: parsed.contactPhone || seedContactContent.contactPhone,
      officeAddress: parsed.officeAddress ?? seedContactContent.officeAddress,
      calendlyUrl: parsed.calendlyUrl ?? seedContactContent.calendlyUrl,
    };
  }, seedContactContent);
}
