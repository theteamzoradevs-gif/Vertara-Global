"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

export const FAQ_SUBHEADINGS = [
  "Home",
  "The basics",
  "Working with Vertara",
  "Time, cost and cities",
  "Getting started",
] as const;

export type FaqSubheading = (typeof FAQ_SUBHEADINGS)[number];

export function normalizeFaqCategory(category?: string): FaqSubheading {
  if (!category) return "The basics";
  const trimmed = category.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "home") return "Home";
  if (lower === "the basics" || lower === "basics") return "The basics";
  if (lower === "working with vertara" || lower === "about us" || lower === "vertara") {
    return "Working with Vertara";
  }
  if (
    lower === "time, cost and cities" ||
    lower === "time cost and cities" ||
    lower === "our offerings" ||
    lower === "offerings" ||
    lower === "cost" ||
    lower === "time" ||
    lower === "cities"
  ) {
    return "Time, cost and cities";
  }
  if (lower === "getting started" || lower === "insights" || lower === "start") {
    return "Getting started";
  }

  const match = FAQ_SUBHEADINGS.find((h) => h.toLowerCase() === lower);
  if (match) return match;

  return "The basics";
}

interface FaqItem {
  question: string;
  answer: string;
  id?: string;
  _id?: string;
  category?: string;
  [key: string]: any;
}

interface HomeFaqSectionProps {
  faqs: FaqItem[];
  scope?: "home" | "all";
}

export function HomeFaqSection({ faqs, scope = "home" }: HomeFaqSectionProps) {
  const source =
    scope === "home"
      ? faqs.filter((faq) => normalizeFaqCategory(faq.category) === "Home")
      : faqs;

  let displayedFaqs: FaqItem[];
  if (scope === "all" || source.length <= 5) {
    displayedFaqs = source;
  } else {
    const selected: FaqItem[] = [];
    for (const heading of FAQ_SUBHEADINGS) {
      const item = source.find(
        (f) =>
          normalizeFaqCategory(f.category) === heading &&
          !selected.some((s) => (s._id && s._id === f._id) || s.question === f.question)
      );
      if (item && selected.length < 5) {
        selected.push(item);
      }
    }
    for (const f of source) {
      if (selected.length >= 5) break;
      if (!selected.some((s) => (s._id && s._id === f._id) || s.question === f.question)) {
        selected.push(f);
      }
    }
    displayedFaqs = selected;
  }

  // Group displayed FAQs by the 4 subheadings
  const groups = FAQ_SUBHEADINGS.map((subheading) => ({
    subheading,
    items: displayedFaqs.filter(
      (f) => normalizeFaqCategory(f.category) === subheading
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <Section id="faq">
      <SectionHeader
        eyebrow="Frequently Asked Questions"
        title="Questions enterprise buyers ask before the first call"
        titleClassName="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]"
        description="Timelines, ownership, cost, cities, and roles answered without the runaround."
      />

      <div className="space-y-8 sm:space-y-10" style={{ fontFamily: "Calibri" }}>
        {groups.map((group) => (
          <div key={group.subheading} className="space-y-3 sm:space-y-4">
            {scope !== "home" && (
              <h3
                className="text-lg sm:text-xl md:text-[1.35rem] font-bold tracking-tight text-[#101C30]"
                style={{ fontFamily: "Calibri" }}
              >
                {group.subheading}
              </h3>
            )}
            <Accordion
              items={group.items.map((f, idx) => ({
                id: f._id || f.id || f.question || `${group.subheading}-${idx}`,
                title: f.question,
                content: f.answer,
              }))}
            />
          </div>
        ))}
      </div>

      {scope === "home" ? (
        <div className="mt-8 sm:mt-10 flex justify-center sm:justify-start">
          <Button href="/faq" variant="primary">
            View full FAQ
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
