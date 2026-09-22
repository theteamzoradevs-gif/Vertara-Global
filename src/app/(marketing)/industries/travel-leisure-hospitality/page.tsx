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
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Travel, Leisure & Hospitality GCC in India"
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
            <span>Travel, Leisure, Hospitality</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From Reservations Processing to Revenue Intelligence
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            A revenue-management centre sized for a boutique portfolio not a
            5,000-property chain. Own dynamic pricing, multi-channel
            distribution, guest personalization, and loyalty operations in
            India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "Reservations & Channel Managers",
              "Loyalty Platforms & CRM",
              "Guest Personalization AI",
              "RevPAR & Yield Reporting",
              "OTA Commission Reconciliation",
              "Multi-Property Operations",
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
              Book a Hospitality consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore revenue model
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
              <p className="mt-1 text-xs sm:text-sm text-slate">Sub-second PMS & OTA sync</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">15–25%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Higher RevPAR & ADR yield</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">PCI-DSS</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Tokenized guest & card vaults</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Cross-property privacy perimeter</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — 3-STAGE HOSPITALITY JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Reservations Processing to Revenue Intelligence"
          description="A progressive 3-stage journey turning standard reservation handling into algorithmic yield management, guest loyalty, and direct booking capture."
        />
        <HospitalityOpportunityJourney />
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

      {/* 5. WHAT THIS SECTOR NEEDS — 3-POINT HOSPITALITY ARCHITECTURE */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Multi-Channel Sync, Demand Yield & Guest Data Security"
          description="Explore the sub-second PMS/OTA interconnects, dynamic pricing engines, and PCI-DSS tokenized payment vaults required for agile hospitality portfolios."
        />
        <HospitalitySectorNeedsSelector />
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
          eyebrow="Trust & Track Record"
          title="Hospitality and leisure brands scaling global revenue operations"
          description="Hear from Chief Commercial Officers, VP Revenue Management, and Hotel Operations Directors who expanded their RevPAR with Vertara."
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
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-travel-leisure-hospitality"
            defaultIntent="talent"
            submitLabel="Request a Hospitality partner call"
          />
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
