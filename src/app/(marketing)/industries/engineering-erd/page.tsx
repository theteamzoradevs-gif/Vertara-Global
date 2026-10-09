import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  ErdOpportunityJourney,
  ErdSectorNeedsSelector,
  ErdHowVertaraHelpsReveal,
} from "@/components/industries/ErdInteractiveSections";

export const metadata = {
  title: "Engineering & ER&D GCC Setup in India | Vertara Global",
  description:
    "From CAD seats to real product ownership. Build a dedicated Indian ER&D center engineered around your product architecture — systems design, embedded firmware, and simulation R&D.",
};

export default function EngineeringErdPage() {
  return (
    <main className="w-full font-sans" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#2F3F34]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            <Link href="/industries" className="hover:underline">
              Industries
            </Link>
            <span>/</span>
            <span>Engineering & ER&D</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From CAD Seats to Real Product Ownership
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            An ER&D centre engineered around your product architecture not
            someone else IT template. Own systems design, embedded firmware,
            and simulation-driven R&D in India.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#enquire" variant="gold" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — INTERACTIVE NUMBERED JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Drafting Pod to Product Ownership"
          description="A progressive 3-stage journey turning offshore engineering seats into genuine systems architecture and patent-generating innovation."
        />
        <ErdOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Heavy Simulation & Zero-Trust Security"
          description="Explore the technical infrastructure, high-density compute, and air-gapped security frameworks required for specialized ER&D operations."
        />
        <ErdSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — INTERACTIVE CAPABILITY REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for ER&D"
          description="A connected capability engine spanning roadmap innovation, compute sizing, discipline-led hiring, entity governance, and lab infrastructure."
        />
        <ErdHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your engineering capability center"
          description="Share what you're building, we'll connect you with our engineering & ER&D practice lead."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-engineering-erd"
              defaultIntent="talent"
              submitLabel="Request a call"
              className="h-full flex flex-col justify-between"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <IndustryFormSideContent />
          </div>
        </div>
      </Section>

      {/* Gold Mandate Banner */}
      <HomeCtaBanner />
    </main>
  );
}
