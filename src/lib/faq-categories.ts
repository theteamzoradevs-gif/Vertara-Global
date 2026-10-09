export const FAQ_CATEGORIES = [
  "Home",
  "The basics",
  "Working with Vertara",
  "Time, cost and cities",
  "Getting started",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

/** Groups the homepage picker uses before a record is marked Home. */
export const FAQ_TOPIC_CATEGORIES = [
  "The basics",
  "Working with Vertara",
  "Time, cost and cities",
  "Getting started",
] as const;

const ALIASES: Record<string, FaqCategory> = {
  home: "Home",
  basics: "The basics",
  "the basics": "The basics",
  "about us": "Working with Vertara",
  vertara: "Working with Vertara",
  "working with vertara": "Working with Vertara",
  "our offerings": "Time, cost and cities",
  offerings: "Time, cost and cities",
  cost: "Time, cost and cities",
  time: "Time, cost and cities",
  cities: "Time, cost and cities",
  "time, cost and cities": "Time, cost and cities",
  "time cost and cities": "Time, cost and cities",
  insights: "Getting started",
  start: "Getting started",
  "getting started": "Getting started",
};

export function canonicalFaqCategory(category?: string | null): FaqCategory | null {
  const key = String(category || "").trim().toLowerCase();
  if (!key) return null;
  return ALIASES[key] || null;
}

export function isFaqCategory(category: string): category is FaqCategory {
  return FAQ_CATEGORIES.includes(category as FaqCategory);
}
