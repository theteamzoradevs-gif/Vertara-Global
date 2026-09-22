import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { CTABand } from "@/components/ui/CTABand";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/leads/ContactForm";
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
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
            alt="Manufacturing & Industrial IoT GCC in India"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          <FlowThreads intensity="medium" onDark className="opacity-45" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b49339]">
            <Link href="/industries" className="hover:underline">
              Industries
            </Link>
            <span>/</span>
            <span>Manufacturing</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From Shop-Floor Support to Production Intelligence
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            A plant-intelligence centre built to scale plant to plant not
            rebuilt at every new facility. Own supply chain procurement, plant
            operations analytics, industrial IoT, and digital quality compliance
            in India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "Supply Chain & Procurement",
              "Plant Operations Analytics",
              "Industrial IoT & SCADA",
              "Quality & IATF 16949",
              "Digital Plant Twins",
              "Predictive Maintenance (OEE)",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#enquire" variant="gold" size="lg">
              Book a Manufacturing consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore production model
            </Button>
          </div>
        </div>
      </section>

      {/* 2. VALUE METRICS STRIP */}
      <section className="border-b border-border bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">100%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">SCADA, MES & ERP integration</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">25–40%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Lower multi-plant downtime</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">IATF 16949</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Standardized quality protocols</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Shop-floor OT & IP perimeter</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — 3-STAGE MANUFACTURING JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Shop-Floor Support to Production Intelligence"
          description="A progressive 3-stage journey turning localized plant data into multi-site operational efficiency, predictive maintenance, and procurement leverage."
        />
        <ManufacturingOpportunityJourney />
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

      {/* 5. WHAT THIS SECTOR NEEDS — 3-POINT PRODUCTION ARCHITECTURE */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for OT-IT Convergence, Standardized Quality & Multi-Plant Scale"
          description="Explore the industrial telemetry streaming pipelines, uniform ISO/IATF quality workflows, and supply chain benchmarking required for multi-site manufacturing enterprises."
        />
        <ManufacturingSectorNeedsSelector />
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
          eyebrow="Trust & Track Record"
          title="Industrial leaders scaling global production intelligence"
          description="Hear from Heads of Manufacturing Operations, Plant Directors, and VP Supply Chain who transformed their factory efficiency with Vertara."
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
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-manufacturing"
            defaultIntent="talent"
            submitLabel="Request a Manufacturing partner call"
          />
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
