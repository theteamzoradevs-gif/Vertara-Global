import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  ManufacturingOpportunityJourney,
  ManufacturingSectorNeedsSelector,
  ManufacturingHowVertaraHelpsReveal,
} from "@/components/industries/ManufacturingInteractiveSections";

export const metadata = {
  title: "Manufacturing & Industrial IoT GCC Setup in India | Vertara Global",
  description:
    "From shop-floor support to production intelligence. Build a dedicated Indian Manufacturing capability center — SCADA, PLC telemetry, OT-IT convergence, IATF 16949 quality, and multi-plant supply chain operations.",
};

export default function ManufacturingPage() {
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
            <span>Manufacturing</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Shop-Floor Support to Production Intelligence
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            A plant-intelligence centre built to scale plant to plant not
            rebuilt at every new facility. Own supply chain procurement, plant
            operations analytics, industrial IoT, and digital quality compliance
            in India.
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
          title="From Back-Office Reporting to Plant Operations Control"
          description="A progressive 3-stage roadmap turning offshore manufacturing support into predictive OEE analytics, autonomous supply chain nodes, and global quality governance."
        />
        <ManufacturingOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for OT-IT Convergence & Edge Telemetry"
          description="Explore the industrial protocols, edge computing architectures, and zero-trust shop floor connectivity required for global manufacturing hubs."
        />
        <ManufacturingSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Enterprise Operating System for Manufacturing GCCs"
          description="Connected delivery spanning PLC data engineering, category procurement hiring, entity compliance, and multi-plant telemetry integration."
        />
        <ManufacturingHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your manufacturing capability center"
          description="Share your plant footprint and operational priorities, our industrial practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-manufacturing"
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
