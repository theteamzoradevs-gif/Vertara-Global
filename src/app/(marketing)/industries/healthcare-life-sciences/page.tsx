import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  HealthcareOpportunityJourney,
  HealthcareSectorNeedsSelector,
  HealthcareHowVertaraHelpsReveal,
} from "@/components/industries/HealthcareInteractiveSections";

export const metadata = {
  title: "Healthcare & Life Sciences GCC Setup in India | Vertara Global",
  description:
    "From back office support to regulatory grade capability. Build a dedicated Indian Healthcare & Life Sciences capability center — biostatistics, pharmacovigilance, GxP systems validation, and clinical data management.",
};

export default function HealthcareLifeSciencesPage() {
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
            <span>Healthcare & Life Sciences</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Back Office Support to Regulatory Grade Capability
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            A regulatory-grade centre sized for a mid-market pipeline not
            scaled down from a Big Pharma template. Own pharmacovigilance,
            biostatistics, and audit-ready clinical data in India.
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
          title="From Transactional Support to Clinical Trial Ownership"
          description="A progressive 3-stage roadmap evolving offshore clinical seats into autonomous trial analytics, pharmacovigilance oversight, and regulatory dossier authoring."
        />
        <HealthcareOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for 21 CFR Part 11 & Zero-Trust Clinical Data"
          description="Explore the automated audit trails, air-gapped clinical data architectures, and specialized biopharma talent pipelines required for inspection-ready operations."
        />
        <HealthcareSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Audit-Ready Operating System for Life Sciences"
          description="Connected delivery across GxP infrastructure, statistical talent acquisition, legal entity structuring, and enterprise security."
        />
        <HealthcareHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your healthcare & life sciences capability center"
          description="Share your therapeutic focus and operational priorities, our life sciences practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-healthcare-life-sciences"
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
