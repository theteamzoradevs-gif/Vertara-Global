import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { getFaqs } from "@/lib/content";

export const metadata = {
  title: "FAQ",
  description:
    "Deep FAQ for enterprise GCC buyers — timelines, cost, ownership, roles, cities, and engagement models.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        title="FAQ"
        description="Pre-answers to the questions CHROs, COOs, and global ops leaders ask before reaching out."
      />
      <Section>
        <SectionHeader
          eyebrow="Answers"
          title="Everything you wanted to ask before the first call"
        />
        <Accordion
          items={faqs.map((f: { question: string; answer: string }) => ({
            id: f.question,
            title: f.question,
            content: f.answer,
          }))}
        />
        <div className="mt-12">
          <CTABand title="Still deciding? Talk it through with a partner." />
        </div>
      </Section>
    </>
  );
}
