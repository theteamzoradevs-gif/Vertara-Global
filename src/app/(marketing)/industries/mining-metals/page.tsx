import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { CTABand } from "@/components/ui/CTABand";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import {
  MiningOpportunityJourney,
  MiningSectorNeedsSelector,
  MiningHowVertaraHelpsReveal,
} from "@/components/industries/MiningMetalsInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Mining & Metals GCC Setup in India | Vertara Global",
  description:
    "From site reporting to asset intelligence. Build a dedicated Indian Mining & Metals capability center — SCADA telemetry, SAP EAM, predictive reliability engineering, and GRI/SASB ESG reporting.",
};

const miningFaqs = [
  {
    id: "faq-1",
    title: "How do you connect remote mine SCADA and fleet systems into a centralized India GCC?",
    content:
      "We design low-bandwidth, satellite-compatible edge telemetry pipelines using MQTT and OPC UA protocols. Data from heavy mobile equipment (Caterpillar MineStar, Komatsu Modular) and fixed processing plant SCADA is securely streamed and indexed into SAP EAM and IBM Maximo in real time.",
  },
  {
    id: "faq-2",
    title: "How does the India hub support GRI, SASB, and ICMM sustainability reporting?",
    content:
      "We establish automated environmental telemetry pipelines tracking tailings dam sensors, water reuse ratios, and Scope 1–3 emissions. Our team validates and compiles disclosure-ready data models matching the exact standards required by international institutional investors and regulatory bodies.",
  },
  {
    id: "faq-3",
    title: "Which Indian clusters offer the best Mining, Metallurgical, and Asset Engineering talent?",
    content:
      "Kolkata, Jamshedpur, and Dhanbad have historic depth in mineral processing, heavy metallurgy, and mine planning software (Datamine, Micromine, Surpac); Bengaluru and Hyderabad lead in heavy equipment IoT telemetry and predictive asset health algorithms.",
  },
  {
    id: "faq-4",
    title: "Can a single-site or junior mining company start with a small, focused pod?",
    content:
      "Yes. You do not need a multi-site enterprise mandate. We help single-site and mid-tier operators launch focused pods of 8–15 engineers dedicated to asset reliability modeling, critical spares procurement expediting, or ESG compliance, expanding as new deposits or processing lines come online.",
  },
  {
    id: "faq-5",
    title: "How quickly can a dedicated mining asset intelligence pod become operational?",
    content:
      "Under our Assisted Captive or EOR delivery models, a vetted team of reliability engineers, fleet data analysts, and SAP EAM specialists can be fully operational with secure infrastructure in 60 to 90 days from project kickoff.",
  },
];

export default async function MiningMetalsPage() {
  const [settings, testimonials, logos] = await Promise.all([
    getSettings(),
    getTestimonials(),
    getClientLogos(),
  ]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#0e3621]">
        {/* Right-aligned Realistic Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/mining-metals.png"
            alt="Mining & Metals Resource Operations"
            fill
            className="object-cover object-right lg:object-right"
            priority
            sizes="100vw"
          />
          {/* Subtle Emerald / Forest Green Soft Gradient & Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320] via-[#0d3320]/95 via-40% sm:via-48% md:via-52% to-[#0d3320]/25 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320] via-transparent to-[#0d3320]/40" />
          <div className="absolute inset-0 bg-[#0d3320]/20 mix-blend-multiply" />
          <FlowThreads intensity="medium" onDark className="opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
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
              Book a Mining consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE MINING JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Site Reporting to Asset Intelligence"
          description="A progressive 3-stage journey turning localized site telemetry into multi-site reliability engineering, ESG governance, and supply chain control."
        />
        <MiningOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT ASSET ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for SCADA Fleet Sync, ESG Compliance & Remote Supply"
          description="Explore the standardized heavy fleet interconnects, audit-grade sustainability pipelines, and critical spares buffering required for remote extractive operations."
        />
        <MiningSectorNeedsSelector />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your Mining & Metals GCC plans?"
          description="Share your mine site footprint, fleet telemetry goals, and asset management headcount targets. A partner will map fit, timeline, and next steps."
          primaryHref="#enquire"
          primaryLabel="Talk through your case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 6. HOW VERTARA HELPS — CONNECTED BLUEPRINT */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for Mining & Metals"
          description="A connected capability engine spanning structural site design, GRI/SASB compliance, unified asset data layers, mining talent clusters, and remote capex finance."
        />
        <MiningHowVertaraHelpsReveal />
      </Section>

      {/* 7. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust"
          title="Enterprises building lasting India capability"
          description="The capabilities we deliver, backed by the experiences of leaders building and scaling in India."
        />
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex min-h-[64px] items-center justify-center rounded-xl border border-[#cddcd1] bg-[#e5ebe6] px-2 py-2 text-center text-xs font-semibold text-navy transition hover:-translate-y-0.5 hover:border-[#2e3f33]/40 hover:shadow-md sm:min-h-[80px] sm:rounded-2xl sm:px-3 sm:text-sm"
            >
              {logo.logoText}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TestimonialMarquee items={testimonials} />
        </div>
      </Section>

      {/* 8. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your asset intelligence capability center"
          description="Share your mining operations footprint, we'll connect you with our Mining & Metals practice lead."
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

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Mining & Metals GCCs"
          description="Fleet telemetry, remote site procurement, GRI/SASB compliance, and engineering talent hubs answered upfront."
        />
        <Accordion items={miningFaqs} />
      </Section>
    </>
  );
}
