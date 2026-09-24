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
  HospitalityOpportunityJourney,
  HospitalitySectorNeedsSelector,
  HospitalityHowVertaraHelpsReveal,
} from "@/components/industries/HospitalityInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Travel, Leisure & Hospitality GCC Setup in India | Vertara Global",
  description:
    "From reservations processing to revenue intelligence. Build a dedicated Indian Travel, Leisure & Hospitality capability center — dynamic RevPAR yield management, channel distribution, guest personalization, and loyalty platform operations.",
};

const hospitalityFaqs = [
  {
    id: "faq-1",
    title: "How do you connect disparate PMS, channel managers, and global OTAs in real time?",
    content:
      "We build bi-directional API pipelines linking Oracle Opera, SiteMinder, Sabre/Amadeus GDS, Expedia, and Booking.com. This ensures sub-second updates to availability, rates, and inventory (ARI), eliminating overbooking and price disparity across channels.",
  },
  {
    id: "faq-2",
    title: "How is guest PII and payment card data protected across international jurisdictions?",
    content:
      "We design a PCI-DSS Level 1 compliant architecture with tokenized payment vaults where reservation agents never see raw credit card details. Guest profiles strictly respect multi-regional GDPR and CCPA privacy standards, backed by 100% direct parent-entity IP and data ownership.",
  },
  {
    id: "faq-3",
    title: "Which Indian hubs have the deepest Hospitality Revenue & Travel Tech talent?",
    content:
      "NCR/Gurugram and Mumbai host India's premier concentration of global hotel chain revenue directors, OTA distribution specialists, and commercial finance managers; Bengaluru and Hyderabad lead in travel technology engineering, dynamic pricing algorithms, and guest AI models.",
  },
  {
    id: "faq-4",
    title: "Can a boutique hotel group with 5–25 properties start with a lean pod?",
    content:
      "Yes. You do not need thousands of rooms to benefit from centralized intelligence. We help boutique hotel groups and luxury resort collections deploy lean pods of 6–12 specialists focused on yield management, direct booking engine optimization, and guest personalization.",
  },
  {
    id: "faq-5",
    title: "How quickly can a hospitality revenue intelligence center become operational?",
    content:
      "Under our Assisted Captive or EOR delivery models, a dedicated pod of certified revenue managers, channel distribution analysts, and guest support specialists can be operational in enterprise-grade facilities within 60 to 90 days.",
  },
];

export default async function TravelLeisureHospitalityPage() {
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
            src="/images/travel.png"
            alt="Travel & Hospitality Experience Architecture"
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
          title="From Reservations Processing to Revenue Intelligence"
          description="A progressive 3-stage journey turning standard reservation handling into algorithmic yield management, guest loyalty, and direct booking capture."
        />
        <HospitalityOpportunityJourney />
      </Section>

      {/* 3. WHAT THIS SECTOR NEEDS — 3-POINT HOSPITALITY ARCHITECTURE */}
      <Section>
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Multi-Channel Sync, Demand Yield & Guest Data Security"
          description="Explore the sub-second PMS/OTA interconnects, dynamic pricing engines, and PCI-DSS tokenized payment vaults required for agile hospitality portfolios."
        />
        <HospitalitySectorNeedsSelector />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your Hospitality GCC plans?"
          description="Share your hotel portfolio footprint, channel distribution stack, and revenue management headcount targets. A partner will map fit, timeline, and next steps."
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
          title="One Accountable Operating System for Travel & Hospitality"
          description="A connected capability engine spanning unified hospitality cloud data layers, guest personalization AI, multi-property staffing, channel reconciliation, and revenue talent clusters."
        />
        <HospitalityHowVertaraHelpsReveal />
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
          title="Let's build your hospitality intelligence capability center"
          description="Share your property footprint, we'll connect you with our Travel & Hospitality practice lead."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="industries-travel-leisure-hospitality"
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
          title="Frequently asked questions about Hospitality GCCs"
          description="PMS/OTA real-time synchronization, guest PII & PCI compliance, revenue talent clusters, and launch timelines answered upfront."
        />
        <Accordion items={hospitalityFaqs} />
      </Section>
    </>
  );
}
