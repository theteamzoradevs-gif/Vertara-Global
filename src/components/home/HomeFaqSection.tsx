"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

interface FaqItem {
  question: string;
  answer: string;
  id?: string;
  [key: string]: any;
}

interface HomeFaqSectionProps {
  faqs: FaqItem[];
}

export function HomeFaqSection({ faqs }: HomeFaqSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <Section id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions enterprise buyers ask before the first call"
        titleClassName="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]"
        description="Timelines, ownership, cost, cities, and roles answered without the runaround."
      />
      <Accordion
        items={displayedFaqs.map((f, idx) => ({
          id: f.id || f.question || `faq-${idx}`,
          title: f.question,
          content: f.answer,
        }))}
      />
      {faqs.length > 5 && (
        <div className="mt-6 flex justify-center sm:justify-start">
          <Button
            type="button"
            variant="primary"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "View less FAQ" : "View full FAQ"}
          </Button>
        </div>
      )}
    </Section>
  );
}
