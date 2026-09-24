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
  ManufacturingOpportunityJourney,
  ManufacturingSectorNeedsSelector,
  ManufacturingHowVertaraHelpsReveal,
} from "@/components/industries/ManufacturingInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Manufacturing & Industrial IoT GCC Setup in India | Vertara Global",
  description:
    "From shop-floor support to production intelligence. Build a dedicated Indian Manufacturing capability center — SCADA, PLC telemetry, OT-IT convergence, IATF 16949 quality, and multi-plant supply chain operations.",
};

const manufacturingFaqs = [
  {
    id: "faq-1",
    title: "How do you connect disparate factory floor SCADA and MES systems securely?",
    content:
      "We implement edge-to-cloud telemetry using standardized OPC UA and MQTT industrial protocols, air-gapping operational technology (OT) from public interfaces. Data from Siemens, Rockwell, Honeywell, and Beckhoff PLCs is sanitized and encrypted before feeding central predictive dashboards and ERP systems.",
  },
  {
    id: "faq-2",
    title: "How does the India center support IATF 16949 and ISO 9001 compliance across global plants?",
    content:
      "Our team centralizes digital PPAP documentation, APQP timelines, FMEA risk matrices, and 8D root-cause investigations into a unified digital quality management system (QMS). Quality workflows travel across facilities uniformly rather than being re-created plant by plant.",
  },
  {
    id: "faq-3",
    title: "Which Indian hubs have the strongest Industrial Engineering & OT-IT talent?",
    content:
      "Pune, Chennai, and NCR/Faridabad lead in discrete automotive manufacturing, tooling design, and IATF quality engineering; Bengaluru and Hyderabad excel in embedded Industrial IoT firmware, digital twins, and SCADA automation analytics.",
  },
  {
    id: "faq-4",
    title: "Can we start by piloting predictive maintenance on just one plant's equipment?",
    content:
      "Yes. We recommend proving the telemetry and analytics model on a lighthouse plant — focusing on critical bottlenecks (OEE, unscheduled downtime, vibration anomaly detection) — and then packaging the solution for rapid rollout across remaining facilities.",
  },
  {
    id: "faq-5",
    title: "How quickly can a dedicated manufacturing intelligence pod become operational?",
    content:
      "Under our Assisted Captive or EOR delivery models, a vetted team of industrial engineers, SCADA telemetry specialists, and procurement analysts can be operational with configured data pipelines in 60 to 90 days from project kickoff.",
  },
];

export default async function ManufacturingPage() {
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
            src="/images/manufacturing.png"
            alt="Manufacturing & Smart Factory Workspace"
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
              Book a Manufacturing consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE MANUFACTURING JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Shop-Floor Support to Production Intelligence"
          description="A progressive 3-stage journey turning localized plant data into multi-site operational efficiency, predictive maintenance, and procurement leverage."
        />
        <ManufacturingOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT PRODUCTION ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for OT-IT Convergence, Standardized Quality & Multi-Plant Scale"
          description="Explore the industrial telemetry streaming pipelines, uniform ISO/IATF quality workflows, and supply chain benchmarking required for multi-site manufacturing enterprises."
        />
        <ManufacturingSectorNeedsSelector />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your Manufacturing GCC plans?"
          description="Share your plant network, OT-IT integration requirements, and industrial engineering headcount targets. A partner will map fit, timeline, and next steps."
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
          title="One Accountable Operating System for Manufacturing"
          description="A connected capability engine spanning digital plant twins, edge-to-cloud OT pipelines, ISO/IATF quality documentation, industrial talent clusters, and specialized hiring."
        />
        <ManufacturingHowVertaraHelpsReveal />
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
          title="Let's build your manufacturing capability center"
          description="Share your manufacturing footprint, we'll connect you with our Manufacturing & Industrial IoT practice lead."
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

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Manufacturing GCCs"
          description="SCADA/MES telemetry, multi-site quality documentation, industrial talent clusters, and plant launch timelines answered upfront."
        />
        <Accordion items={manufacturingFaqs} />
      </Section>
    </>
  );
}
