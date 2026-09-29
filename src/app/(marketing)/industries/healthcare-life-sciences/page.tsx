import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import {
  HealthcareOpportunityJourney,
  HealthcareSectorNeedsSelector,
  HealthcareHowVertaraHelpsReveal,
} from "@/components/industries/HealthcareInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Healthcare & Life Sciences GCC Setup in India | Vertara Global",
  description:
    "From back office support to regulatory grade capability. Build a dedicated Indian Healthcare & Life Sciences capability center â€” biostatistics, pharmacovigilance, GxP systems validation, and clinical data management.",
};

const healthcareFaqs = [
  {
    id: "faq-1",
    title: "How do you ensure 21 CFR Part 11 and GxP compliance in an Indian GCC?",
    content:
      "We implement automated audit trails, strict electronic signature validation, and pre-validated computerized system validation (CSV / GAMP 5) packages before your first pod starts. All workflows maintain continuous inspection readiness for FDA, EMA, MHRA, and PMDA audits with zero deviation drift.",
  },
  {
    id: "faq-2",
    title: "How is patient PHI and trial data protected across international borders?",
    content:
      "All clinical trial and patient data resides in air-gapped Virtual Desktop Infrastructure (VDI) with disabled local peripherals and print controls. Data encryption is enforced at rest (AES-256) and in transit (TLS 1.3), conforming strictly with HIPAA, GDPR, and India's DPDP Act, backed by direct parent-company IP assignment.",
  },
  {
    id: "faq-3",
    title: "Which Indian hubs offer the highest concentration of Life Sciences & Biostatistics talent?",
    content:
      "Hyderabad is India's leading life sciences and pharma capital, offering dense talent pools in pharmacovigilance, regulatory affairs, and wet-lab R&D; Bengaluru leads in clinical bioinformatics, SAS modeling, and computational genomics; Mumbai/Pune provides deep medical writing, protocol authoring, and clinical operations leadership.",
  },
  {
    id: "faq-4",
    title: "Can we start with a small, specialized pharmacovigilance or biostatistics pod?",
    content:
      "Yes. You don't need a 500-person build. We help mid-market biopharma and MedTech innovators launch agile 10â€“25 person specialized pods for PV triage, CDISC SDTM/ADaM dataset creation, or CSR medical writing, expanding as trial milestones are reached.",
  },
  {
    id: "faq-5",
    title: "How quickly can an audit-ready life sciences center become operational?",
    content:
      "Under our Assisted Captive or EOR delivery models, a fully vetted team of certified clinical practitioners with configured, validated IT infrastructure can be fully operational in 60 to 90 days from project kickoff.",
  },
];

export default async function HealthcareLifeSciencesPage() {
  const [settings, testimonials, logos] = await Promise.all([
    getSettings(),
    getTestimonials(),
    getClientLogos(),
  ]);

  return (
    <>
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

      {/* 2. THE OPPORTUNITY â€” 3-STAGE LIFE SCIENCES JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Support Pod to Regulated Clinical Ownership"
          description="A progressive 3-stage journey turning offshore clinical seats into inspection-ready biostatistics, medical writing, and pharmacovigilance hubs."
        />
        <HealthcareOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS â€” 3-POINT REGULATORY ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for GxP Rigor, CSV Protocols & Zero-Drift Compliance"
          description="Explore the computerized system validation, 21 CFR Part 11 audit trails, and strict PHI access perimeters required for regulated life sciences operations."
        />
        <HealthcareSectorNeedsSelector />
      </Section>


      {/* 6. HOW VERTARA HELPS â€” CONNECTED BLUEPRINT */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for Healthcare & Life Sciences"
          description="A connected capability engine spanning GxP compliance, clinical IP covenants, life sciences cluster mapping, validated cloud ops, and specialist hiring."
        />
        <HealthcareHowVertaraHelpsReveal />
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
              className="flex min-h-[64px] items-center justify-center rounded-xl border border-[#cddcd1] bg-[#e5ebe6] px-2 py-2 text-center text-xs font-semibold text-navy transition hover:-translate-y-0.5 hover:border-[#2F3F34]/40 hover:shadow-md sm:min-h-[80px] sm:rounded-2xl sm:px-3 sm:text-sm"
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
          title="Let's build your regulatory-grade capability center"
          description="Share your clinical trial pipeline, we'll connect you with our Healthcare & Life Sciences practice lead."
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

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Life Sciences GCCs"
          description="21 CFR Part 11 validation, ePHI protection, talent clusters, and inspection readiness answered upfront."
        />
        <Accordion items={healthcareFaqs} />
      </Section>

      {/* Gold Mandate Banner */}
      <HomeCtaBanner />
    </>
  );
}
