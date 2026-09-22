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
  ErdOpportunityJourney,
  ErdSectorNeedsSelector,
  ErdHowVertaraHelpsReveal,
} from "@/components/industries/ErdInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Engineering & ER&D GCC Setup in India | Vertara Global",
  description:
    "From CAD seats to real product ownership. Build a dedicated Indian ER&D center engineered around your product architecture — systems design, embedded firmware, and simulation R&D.",
};

const erdFaqs = [
  {
    id: "faq-1",
    title: "How do you protect proprietary CAD models, blueprints, and IP from day one?",
    content:
      "We build a fortress-grade security perimeter before your first engineer logs in: air-gapped Virtual Desktop Infrastructure (VDI), disabled local USB/print perimeters, DLP agents, and physical biometric access controls. Legally, all employment contracts assign 100% of inventions and IP rights directly to your global parent company with clear jurisdiction clauses.",
  },
  {
    id: "faq-2",
    title: "How are CAD/PLM licenses and heavy simulation rendering handled?",
    content:
      "We work with your IT team and software vendors (Dassault, Siemens, ANSYS, PTC) to establish multi-region license server peering, dedicated MPLS/cloud interconnects, and local high-performance compute clusters. This ensures engineers experience near-zero latency when interacting with massive assembly files and simulation runs.",
  },
  {
    id: "faq-3",
    title: "Which Indian cities are best for specific engineering disciplines?",
    content:
      "Location matters deeply in ER&D: Bengaluru leads in Aerospace, Avionics, and Embedded Software; Pune and Chennai dominate Automotive, Powertrain, and Heavy Machinery; Hyderabad excels in MedTech and Semiconductor design; NCR/Gurugram offers strong industrial automation talent. We map your exact discipline requirements to the optimal talent cluster.",
  },
  {
    id: "faq-4",
    title: "Can we set up physical hardware testing and simulation benches in India?",
    content:
      "Yes. In addition to software workstations, we design and build secure hardware-in-the-loop (HIL) testing labs, ESD-safe electronics benches, cleanroom testing rooms, and 3D printing/rapid prototyping facilities with dedicated power and ventilation.",
  },
  {
    id: "faq-5",
    title: "How quickly can we spin up an initial lighthouse engineering pod?",
    content:
      "Under our Assisted Captive or EOR delivery models, we can have a vetted 10–25 person engineering pod operational in secure space with configured compute infrastructure in 60 to 90 days from project kickoff.",
  },
];

export default async function EngineeringErdPage() {
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
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
            alt="Engineering & ER&D GCC"
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
            <span>Engineering & ER&D</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From CAD Seats to Real Product Ownership
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            An ER&D centre engineered around your product architecture — not
            someone else’s IT template. Own systems design, embedded firmware,
            and simulation-driven R&D in India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "Product Engineering",
              "R&D & Prototyping",
              "Software Simulation (FEA/CFD)",
              "Embedded AI & Firmware",
              "Architectural & PLM Design",
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
              Book an ER&D consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore engineering model
            </Button>
          </div>
        </div>
      </section>

      {/* 2. VALUE METRICS STRIP */}
      <section className="border-b border-border bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">40–60%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Faster R&D cycle times</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">100%</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Direct global IP ownership</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Tier-1</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">CAD/PLM & CAE clusters</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Day-1 air-gapped lab security</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — INTERACTIVE NUMBERED JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From Drafting Pod to Product Ownership"
          description="A progressive 3-stage journey turning offshore engineering seats into genuine systems architecture and patent-generating innovation."
        />
        <ErdOpportunityJourney />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your ER&D GCC plans?"
          description="Share your engineering disciplines, headcount goals, and compute requirements. A partner will map fit, timeline, and next steps."
          primaryHref="#enquire"
          primaryLabel="Talk through your case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 5. WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Heavy Simulation & Zero-Trust Security"
          description="Explore the technical infrastructure, high-density compute, and air-gapped security frameworks required for specialized ER&D operations."
        />
        <ErdSectorNeedsSelector />
      </Section>

      {/* 6. HOW VERTARA HELPS — INTERACTIVE CAPABILITY REVEAL */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for ER&D"
          description="A connected capability engine spanning roadmap innovation, compute sizing, discipline-led hiring, entity governance, and lab infrastructure."
        />
        <ErdHowVertaraHelpsReveal />
      </Section>

      {/* 7. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Enterprises building lasting engineering capability"
          description="Hear from engineering leaders and COOs who transformed their R&D velocity with Vertara."
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
          title="Let's build your engineering capability center"
          description="Share what you're building, we'll connect you with our engineering & ER&D practice lead."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-engineering-erd"
            defaultIntent="talent"
            submitLabel="Request an ER&D partner call"
          />
        </div>
      </Section>

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about ER&D GCCs"
          description="IP governance, software licensing, testing labs, and location strategies answered upfront."
        />
        <Accordion items={erdFaqs} />
      </Section>
    </>
  );
}
