import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  WealthOpportunityJourney,
  WealthSectorNeedsSelector,
  WealthHowVertaraHelpsReveal,
} from "@/components/industries/WealthInteractiveSections";

export const metadata = {
  title: "Wealth Management, PE & Insurance GCC Setup in India | Vertara Global",
  description:
    "From back-office reconciliation to investment-grade operations. Build a dedicated Indian Wealth Management, PE & Insurance capability center — fund accounting, shadow NAV, actuarial support, and IFRS 17 regulatory reporting.",
};

export default function WealthManagementPeInsurancePage() {
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
              Book a consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE FINANCIAL SERVICES JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Transactional Reconciliation to Strategic Fund Oversight"
          description="A progressive 3-stage roadmap turning offshore accounting support into autonomous shadow NAV calculations, actuarial modeling, and investor-ready reporting."
        />
        <WealthOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Chinese Walls & Real-Time Portfolio Sync"
          description="Explore the custodian integrations, air-gapped LP perimeters, and institutional financial talent required for modern asset managers and insurers."
        />
        <WealthSectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Institutional Operating Engine for Private Capital & Insurance"
          description="Connected delivery across fund accounting platforms, CFA/actuarial recruitment, regulatory structuring, and air-gapped data security."
        />
        <WealthHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your financial capability center"
          description="Share your AUM scope and operational priorities, our financial services practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-wealth-pe-insurance"
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
