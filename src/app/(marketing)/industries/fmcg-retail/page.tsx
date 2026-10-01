import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  FmcgOpportunityJourney,
  FmcgSectorNeedsSelector,
  FmcgHowVertaraHelpsReveal,
} from "@/components/industries/FmcgRetailInteractiveSections";

export const metadata = {
  title: "FMCG & Retail GCC Setup in India | Vertara Global",
  description:
    "From order processing to demand intelligence. Build a dedicated Indian FMCG & Retail capability center engineered around your SKU data — consumer analytics, merchandising systems, and omnichannel supply chain.",
};

export default function FmcgRetailPage() {
  return (
    <main className="w-full font-sans" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#2F3F34]">
        <div className="absolute inset-0">
          <FlowThreads intensity="medium" onDark className="opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            <Link href="/industries" className="hover:underline">
              Industries
            </Link>
            <span>/</span>
            <span>FMCG & Retail</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Order Processing to Demand Intelligence
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            A demand-intelligence engine built on your SKU data not a generic
            BI dashboard. Own consumer analytics, merchandising systems, and
            end-to-end commercial operations in India.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#enquire" variant="gold" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE FMCG & RETAIL JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Transaction Logging to Predictive Retail"
          description="A proven 3-phase roadmap scaling India teams from basic sales data reporting to advanced price-pack architecture and global supply chain orchestration."
        />
        <FmcgOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT RETAIL ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Real-Time Ingestion, SKU-Level Precision & Zero-Trust Governance"
          description="Explore the streaming data architectures, store-level analytics pipelines, and strict consumer privacy frameworks required for modern retail enterprises."
        />
        <FmcgSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Enterprise Engine for FMCG & Retail GCCs"
          description="Integrated execution across data platform integration, commercial talent sourcing, corporate entity structuring, and enterprise security."
        />
        <FmcgHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Build your retail & FMCG center in India"
          description="Tell us your commercial priorities, our FMCG & retail practice team will assemble your build roadmap."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-fmcg-retail"
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
