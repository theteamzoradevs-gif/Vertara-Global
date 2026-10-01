import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { ContactForm } from "@/components/leads/ContactForm";
import { IndustryFormSideContent } from "@/components/industries/IndustryFormSideContent";
import {
  HospitalityOpportunityJourney,
  HospitalitySectorNeedsSelector,
  HospitalityHowVertaraHelpsReveal,
} from "@/components/industries/HospitalityInteractiveSections";

export const metadata = {
  title: "Travel, Leisure & Hospitality GCC Setup in India | Vertara Global",
  description:
    "From reservations processing to revenue intelligence. Build a dedicated Indian Travel, Leisure & Hospitality capability center — dynamic RevPAR yield management, channel distribution, guest personalization, and loyalty platform operations.",
};

export default function TravelLeisureHospitalityPage() {
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
            <span>Travel, Leisure, Hospitality</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            From Reservations Processing to Revenue Intelligence
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            A revenue-management centre sized for a boutique portfolio not a
            5,000-property chain. Own dynamic pricing, multi-channel
            distribution, guest personalization, and loyalty operations in
            India.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#enquire" variant="gold" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY — 3-STAGE HOSPITALITY JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Call Center Booking to Direct Margin Expansion"
          description="A progressive 3-stage roadmap turning offshore reservation agents into autonomous RevPAR algorithms, direct channel optimization, and personalized guest loyalty engines."
        />
        <HospitalityOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Dynamic Distribution & PCI-DSS Tokenization"
          description="Explore the real-time PMS connectors, tokenized payment vaults, and algorithmic revenue management infrastructure required for modern hospitality."
        />
        <HospitalitySectorNeedsSelector />
      </Section>

      {/* 4. HOW VERTARA HELPS — REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="An Integrated Operating Engine for Travel & Hospitality"
          description="Connected delivery across PMS integration, certified revenue management hiring, PCI-DSS security covenants, and brand identity."
        />
        <HospitalityHowVertaraHelpsReveal />
      </Section>

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your hospitality intelligence center"
          description="Share your portfolio size and commercial goals, our travel & hospitality practice lead will connect with you."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-travel-hospitality"
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
