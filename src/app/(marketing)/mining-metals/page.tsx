import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  MiningOpportunityJourney,
  MiningSectorNeedsSelector,
  MiningHowVertaraHelpsReveal,
} from "@/components/industries/MiningMetalsInteractiveSections";

export const metadata = {
  title: "Mining & Metals GCC Setup in India | Vertara Global",
  description:
    "From site reporting to asset intelligence. Build a dedicated Indian Mining & Metals capability center — SCADA telemetry, SAP EAM, predictive reliability engineering, and GRI/SASB ESG reporting.",
};

export default function MiningMetalsPage() {
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
            <span>Mining & Metals</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Site Reporting to Asset Intelligence
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            An asset-intelligence centre sized for a single-site operator not a
            global major&apos;s COE. Own asset analytics, structural engineering,
            remote procurement, and ESG/HSE compliance in India.
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
          title="From Back-Office Reporting to Site Asset Autonomy"
          description="A progressive 3-stage roadmap turning offshore mining support into predictive fleet telemetry, remote maintenance scheduling, and real-time ESG disclosure."
        />
        <MiningOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Remote Telemetry & Enterprise EAM"
          description="Explore the low-bandwidth satellite links, edge telemetry architectures, and structural engineering talent required for global mining operations."
        />
        <MiningSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Integrated Operating Engine for Mining & Metals"
          description="Connected capability delivery across edge telemetry, SAP EAM expertise, environmental legal covenants, and mining equipment hiring."
        />
        <MiningHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your mining & metals asset intelligence center"
          description="Share your asset footprint and operational priorities, our mining practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-mining-metals"
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
