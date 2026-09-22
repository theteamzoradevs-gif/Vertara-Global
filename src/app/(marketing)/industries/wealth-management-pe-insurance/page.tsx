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
  WealthOpportunityJourney,
  WealthSectorNeedsSelector,
  WealthHowVertaraHelpsReveal,
} from "@/components/industries/WealthInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Wealth Management, PE & Insurance GCC Setup in India | Vertara Global",
  description:
    "From back-office reconciliation to investment-grade operations. Build a dedicated Indian Wealth Management, PE & Insurance capability center — fund accounting, shadow NAV, actuarial support, and IFRS 17 regulatory reporting.",
};

const wealthFaqs = [
  {
    id: "faq-1",
    title: "How do you protect LP confidentiality and enforce strict Chinese walls?",
    content:
      "We design an institutional-grade security perimeter before your first analyst is onboarded: air-gapped Virtual Desktop Infrastructure (VDI), role-based LP access permissions, disabled local print/export controls, and isolated networks for competing fund strategies. Legally, 100% of financial models and data covenants are directly assigned to your global parent entity.",
  },
  {
    id: "faq-2",
    title: "How do you handle real-time integration with custodians, PMS, and fund admin systems?",
    content:
      "We establish secure API and SFTP pipelines directly connecting with Bloomberg AIM, BlackRock Aladdin, Charles River, eFront, and Guidewire. This ensures daily shadow NAV reconciliation, automated cash break matching, and instant position updates without manual spreadsheet rekeying.",
  },
  {
    id: "faq-3",
    title: "Which Indian hubs offer the strongest Private Equity and Actuarial talent pools?",
    content:
      "Mumbai and NCR/Gurugram have India's densest concentration of chartered accountants, CFA charterholders, PE valuation modelers, and IFRS 17 actuarial specialists; Bengaluru and Hyderabad lead in quantitative finance, portfolio risk modeling algorithms, and FinTech data engineering.",
  },
  {
    id: "faq-4",
    title: "Can a mid-market fund start with a small, focused 5–15 person operations pod?",
    content:
      "Yes. You do not need a multi-million-dollar initial build. We help mid-market GPs and insurers launch focused pods for shadow NAV accounting, quarterly LP reporting, or actuarial reserve modeling, expanding seamlessly as AUM or policy count expands.",
  },
  {
    id: "faq-5",
    title: "How quickly can an institutional-grade financial operations pod go live?",
    content:
      "Under our Assisted Captive or EOR delivery models, a dedicated pod of vetted fund accountants and investment analysts with configured Bloomberg terminals and secure network architecture can be operational in 60 to 90 days.",
  },
];

export default async function WealthManagementPeInsurancePage() {
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Wealth Management, PE & Insurance GCC in India"
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
            <span>Wealth Management, PE & Insurance</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From Back-Office Reconciliation to Investment-Grade Operations
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            Institutional-grade fund and policy operations sized for a
            mid-market AUM not a bulge-bracket one. Own fund accounting, shadow
            NAV, actuarial modeling, and client reporting in India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "Fund & Portfolio Operations",
              "Actuarial Support",
              "Client Reporting & Compliance",
              "Investment & Equity Research",
              "Shadow NAV Accounting",
              "IFRS 17 & SEC Filings",
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
              Book an Investment consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore operations model
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
              <p className="mt-1 text-xs sm:text-sm text-slate">IFRS 17, SEC & SOX readiness</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">45–60%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Lower middle & back office cost</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Daily/Monthly</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Shadow NAV & liquidity sync</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Strict LP & policyholder Chinese walls</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — 3-STAGE WEALTH & PE JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Back-Office Support to Investment-Grade Ownership"
          description="A progressive 3-stage journey turning manual reconciliations into high-precision fund accounting, actuarial modeling, and investment research."
        />
        <WealthOpportunityJourney />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your Wealth, PE or Insurance GCC plans?"
          description="Share your fund structure, regulatory reporting requirements, and middle-office headcount targets. A partner will map fit, timeline, and next steps."
          primaryHref="#enquire"
          primaryLabel="Talk through your case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 5. WHAT THIS SECTOR NEEDS — 3-POINT INSTITUTIONAL ARCHITECTURE */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Multi-Regulatory Rigor, Chinese Walls & Live Sync"
          description="Explore the automated statutory reporting pipelines, zero-trust data segregation, and real-time portfolio interconnects required for institutional financial operations."
        />
        <WealthSectorNeedsSelector />
      </Section>

      {/* 6. HOW VERTARA HELPS — CONNECTED BLUEPRINT */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for Wealth, PE & Insurance"
          description="A connected capability engine spanning regulatory risk, fund accounting, LP covenants, specialized actuarial recruitment, and equity research."
        />
        <WealthHowVertaraHelpsReveal />
      </Section>

      {/* 7. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Asset managers and insurers scaling institutional capability"
          description="Hear from General Partners, CFOs, and Chief Risk Officers who streamlined their fund and policy velocity with Vertara."
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
          title="Let's build your investment-grade capability center"
          description="Share your fund or insurance footprint, we'll connect you with our Wealth Management & PE practice lead."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-wealth-management-pe-insurance"
            defaultIntent="talent"
            submitLabel="Request a Wealth & PE partner call"
          />
        </div>
      </Section>

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Wealth, PE & Insurance GCCs"
          description="Regulatory disclosures, LP data protection, talent clusters, and fund admin integrations answered upfront."
        />
        <Accordion items={wealthFaqs} />
      </Section>
    </>
  );
}
