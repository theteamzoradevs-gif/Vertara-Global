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
  FmcgOpportunityJourney,
  FmcgSectorNeedsSelector,
  FmcgHowVertaraHelpsReveal,
} from "@/components/industries/FmcgRetailInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "FMCG & Retail GCC Setup in India | Vertara Global",
  description:
    "From order processing to demand intelligence. Build a dedicated Indian FMCG & Retail capability center engineered around your SKU data — consumer analytics, merchandising systems, and omnichannel supply chain.",
};

const fmcgFaqs = [
  {
    id: "faq-1",
    title: "How do you protect customer loyalty PII and consumer data in compliance with global privacy laws?",
    content:
      "We design a zero-trust compliance perimeter from day one. All consumer and loyalty PII is stored in tokenized customer data lakes with field-level encryption and strict role-based access control (RBAC). Our infrastructure conforms strictly with GDPR, CCPA, and India's Digital Personal Data Protection (DPDP) Act, with 100% parent-company IP and data ownership covenants.",
  },
  {
    id: "faq-2",
    title: "How do you handle real-time POS data streaming across multi-country store networks?",
    content:
      "We build streaming ingestion pipelines using Apache Kafka, AWS Kinesis, or Azure Event Hubs directly connecting into your store POS (SAP, Oracle Retail, NCR) and e-commerce platforms (Shopify Plus, Salesforce Commerce Cloud). This eliminates batch-and-wait reporting, providing near-instantaneous inventory and sell-through visibility.",
  },
  {
    id: "faq-3",
    title: "Which Indian hubs have the strongest FMCG and Retail Analytics talent?",
    content:
      "Bengaluru leads in digital commerce, pricing algorithms, and predictive ML talent; NCR/Gurugram and Mumbai host the deepest concentration of FMCG category management, trade spend finance, and brand analytics leaders; Hyderabad offers high-throughput cloud data engineering expertise. We locate your team in the exact cluster matching your operational mandate.",
  },
  {
    id: "faq-4",
    title: "Can the India center manage Trade Spend and Promotion ROI modeling?",
    content:
      "Yes. We recruit specialized commercial finance and Revenue Growth Management (RGM) practitioners with proven experience modeling trade promotion elasticity, baseline sales decomposition, and joint business planning (JBP) analytics for global tier-1 CPG brands.",
  },
  {
    id: "faq-5",
    title: "How quickly can we launch an initial retail analytics pod?",
    content:
      "Under our Assisted Captive or EOR delivery models, a dedicated pod of 10–25 vetted retail data engineers and category specialists can be operational in enterprise-grade workspace with full system integration within 60 to 90 days.",
  },
];

export default async function FmcgRetailPage() {
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
            src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1600&q=80"
            alt="FMCG & Retail GCC in India"
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
            <span>FMCG & Retail</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From Order Processing to Demand Intelligence
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            A demand-intelligence engine built on your SKU data not a generic
            BI dashboard. Own consumer analytics, merchandising systems, and
            end-to-end commercial operations in India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "Consumer Analytics",
              "Merchandising Systems",
              "Supply Chain & Logistics",
              "Omnichannel Marketing",
              "E-Commerce & D2C",
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
              Book a Retail consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore commercial model
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
              <p className="mt-1 text-xs sm:text-sm text-slate">Real-time POS & ERP sync</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">30–45%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Lower stockout & markdown loss</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">SKU-Level</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Granular demand sensing</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Loyalty PII & consumer data</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — 3-STAGE FMCG & RETAIL JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Transaction Processing to Demand Intelligence"
          description="A progressive 3-stage journey turning transactional retail data into predictive merchandising, pricing power, and commercial growth."
        />
        <FmcgOpportunityJourney />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your FMCG & Retail GCC plans?"
          description="Share your retail footprint, data infrastructure goals, and commercial analytics roadmap. A partner will map fit, timeline, and next steps."
          primaryHref="#enquire"
          primaryLabel="Talk through your case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 5. WHAT THIS SECTOR NEEDS — 3-POINT RETAIL ARCHITECTURE */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Real-Time Ingestion, SKU-Level Precision & Zero-Trust Governance"
          description="Explore the streaming data architectures, store-level analytics pipelines, and strict consumer privacy frameworks required for modern retail enterprises."
        />
        <FmcgSectorNeedsSelector />
      </Section>

      {/* 6. HOW VERTARA HELPS — CONNECTED BLUEPRINT */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for FMCG & Retail"
          description="A connected capability engine spanning real-time cloud data pipelines, CPG cluster intelligence, commercial finance, loyalty PII compliance, and specialist hiring."
        />
        <FmcgHowVertaraHelpsReveal />
      </Section>

      {/* 7. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Enterprises scaling global retail & commercial intelligence"
          description="Hear from consumer goods leaders and VP of Analytics who transformed their supply chain and commercial velocity with Vertara."
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
          title="Let's build your retail intelligence capability center"
          description="Share what you're building, we'll connect you with our FMCG & Retail practice lead."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-fmcg-retail"
            defaultIntent="talent"
            submitLabel="Request a Retail partner call"
          />
        </div>
      </Section>

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about FMCG & Retail GCCs"
          description="POS streaming, loyalty data compliance, talent clusters, and trade spend ROI answered upfront."
        />
        <Accordion items={fmcgFaqs} />
      </Section>
    </>
  );
}
