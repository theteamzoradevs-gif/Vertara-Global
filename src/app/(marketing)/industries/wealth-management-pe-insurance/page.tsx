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
      <section className="relative overflow-hidden text-white bg-[#0e3621]">
        {/* Right-aligned Realistic Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/wealth-management.png"
            alt="Wealth Management & PE Investment Infrastructure"
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
            <span>Wealth Management, PE & Insurance</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Back-Office Reconciliation to Investment-Grade Operations
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Institutional-grade fund and policy operations sized for a
            mid-market AUM not a bulge-bracket one. Own fund accounting, shadow
            NAV, actuarial modeling, and client reporting in India.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#enquire" variant="gold" size="lg">
              Book a Wealth consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE WEALTH & PE JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Back Office Support to Investment Grade Ownership"
          description="A progressive 3-stage journey turning manual reconciliations into high precision fund accounting, actuarial modeling, and investment research."
        />
        <WealthOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT INSTITUTIONAL ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Multi-Regulatory Rigor, Chinese Walls & Live Sync"
          description="Explore the automated statutory reporting pipelines, zero-trust data segregation, and real-time portfolio interconnects required for institutional financial operations."
        />
        <WealthSectorNeedsSelector />
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
          title="Let's build your investment-grade capability center"
          description="Share your fund or insurance footprint, we'll connect you with our Wealth Management & PE practice lead."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-wealth-management-pe-insurance"
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
          title="Frequently asked questions about Wealth, PE & Insurance GCCs"
          description="Regulatory disclosures, LP data protection, talent clusters, and fund admin integrations answered upfront."
        />
        <Accordion items={wealthFaqs} />
      </Section>
    </>
  );
}
