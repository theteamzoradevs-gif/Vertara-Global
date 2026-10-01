import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  TechAiOpportunityJourney,
  TechAiSectorNeedsSelector,
  TechAiHowVertaraHelpsReveal,
} from "@/components/industries/TechAiInteractiveSections";

export const metadata = {
  title: "Technology & AI GCC Setup in India | Vertara Global",
  description:
    "From IT support to AI-grade infrastructure. Build a dedicated Indian Technology & AI capability center — GenAI/LLM engineering, high-density GPU clusters, MLOps pipelines, and Cloud FinOps governance.",
};

export default function TechnologyAiPage() {
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
            <span>Technology & AI</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From IT Support to AI-Grade Infrastructure
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            AI infrastructure built to scale with usage not provisioned for a
            headcount you don&apos;t have yet. Own GenAI/LLM engineering, MLOps,
            applied research, and high-density compute in India.
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
          title="From Basic Software Support to Autonomous AI Innovation"
          description="A progressive 3-stage roadmap turning offshore engineering pods into core transformer fine-tuning, automated MLOps pipelines, and patentable AI architectures."
        />
        <TechAiOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for High-Density GPU Compute & Sovereign Zero-Trust IP"
          description="Explore the hybrid cluster architectures, continuous evaluation harnesses, and sovereign IP frameworks required for cutting-edge AI labs."
        />
        <TechAiSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Agile AI Operating Engine for High-Growth Startups"
          description="Connected delivery across bare-metal GPU provisioning, senior AI research recruiting, corporate structuring, and FinOps telemetry."
        />
        <TechAiHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your technology & AI center in India"
          description="Share your architecture priorities and compute roadmap, our AI practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-technology-ai"
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
