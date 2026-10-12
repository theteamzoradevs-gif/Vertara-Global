export const FAQ_PAGES = [
  "Home",
  "About Us",
  "Insights",
  "Engage with Us",
  "Services",
  "Industries",
  "Engagement Models",
  "Case Studies",
  "Contact",
  "Assessment",
  "FAQ",
  "Offerings",
] as const;

export type FaqPage = (typeof FAQ_PAGES)[number];

const PAGE_ALIASES: Record<string, FaqPage> = {
  home: "Home",
  "/": "Home",
  about: "About Us",
  "about us": "About Us",
  insights: "Insights",
  engage: "Engage with Us",
  "engage with us": "Engage with Us",
  "engage-with-us": "Engage with Us",
  services: "Services",
  "our services": "Services",
  industries: "Industries",
  "engagement models": "Engagement Models",
  "engagement-models": "Engagement Models",
  "case studies": "Case Studies",
  "case-studies": "Case Studies",
  contact: "Contact",
  "contact us": "Contact",
  assessment: "Assessment",
  "gcc assessment": "Assessment",
  faq: "FAQ",
  faqs: "FAQ",
  offerings: "Offerings",
};

export function canonicalFaqPage(page?: string | null): FaqPage | null {
  const key = String(page || "").trim().toLowerCase();
  if (!key) return null;
  return PAGE_ALIASES[key] || null;
}

export function isFaqPage(page: string): page is FaqPage {
  return FAQ_PAGES.includes(page as FaqPage);
}

export function resolveFaqPage(faq: { page?: string | null; category?: string | null }): string {
  const explicit = String(faq.page || "").trim();
  if (explicit) return canonicalFaqPage(explicit) || explicit;
  if (String(faq.category || "").trim().toLowerCase() === "home") return "Home";
  return "FAQ";
}

export function faqsForPage<T extends { page?: string | null; category?: string | null }>(
  faqs: T[],
  page: string,
): T[] {
  const target = canonicalFaqPage(page) || page;
  return faqs.filter((faq) => resolveFaqPage(faq) === target);
}
