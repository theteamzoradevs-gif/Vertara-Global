import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { CTABand } from "@/components/ui/CTABand";
import { ContactForm } from "@/components/leads/ContactForm";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Accordion } from "@/components/ui/Accordion";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
  getFaqs,
} from "@/lib/content";
import {
  Cpu,
  FlaskConical,
  Coins,
  Sparkles,
  ShoppingBag,
  Factory,
  Pickaxe,
  Hotel,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Industry Verticals & Sector Specializations | Vertara Global",
  description:
    "Explore Vertara's specialized GCC capability models across Engineering & ER&D, Healthcare & Life Sciences, Wealth Management, Tech & AI, FMCG & Retail, Manufacturing, Mining & Metals, and Travel & Hospitality.",
};

const industryList = [
  {
    id: "engineering-erd",
    title: "Engineering & ER&D",
    tagline: "From CAD Seats to Real Product Ownership",
    description:
      "Specialized engineering and R&D pipelines, software simulation capabilities (FEA/CFD), hardware-in-the-loop (HIL) testing, and embedded firmware CoEs.",
    icon: Cpu,
  },
  {
    id: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    tagline: "From Back-Office Support to Regulatory-Grade Capability",
    description:
      "Compliant life sciences hubs with regulatory data handling (eCTD), biostatistics (CDISC/SAS), clinical data management, and pharmacovigilance with zero compliance drift.",
    icon: FlaskConical,
  },
  {
    id: "wealth-management-pe-insurance",
    title: "Wealth Management, PE & Insurance",
    tagline: "From Back-Office Reconciliation to Investment-Grade Operations",
    description:
      "Institutional-grade fund accounting, shadow NAV computation, actuarial modeling, and client reporting sized for mid-market AUM not a bulge-bracket build.",
    icon: Coins,
  },
  {
    id: "technology-ai",
    title: "Technology & AI",
    tagline: "From IT Support to AI-Grade Infrastructure",
    description:
      "Right-sized GPU/compute infrastructure, custom GenAI/LLM engineering, automated MLOps pipelines, and Cloud FinOps governance for high-velocity software companies.",
    icon: Sparkles,
  },
  {
    id: "fmcg-retail",
    title: "FMCG & Retail",
    tagline: "From Merchandising Support to Omnichannel Velocity",
    description:
      "Demand forecasting algorithms, digital shelf analytics, unified supply chain visibility CoEs, and localized multi-region master data governance.",
    icon: ShoppingBag,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    tagline: "From Shop Floor Telemetry to Smart Factory Operations",
    description:
      "Industrial IoT (IIoT) telemetry pipelines, predictive maintenance models, supply-chain twin architecture, and PLM systems engineering.",
    icon: Factory,
  },
  {
    id: "mining-metals",
    title: "Mining & Metals",
    tagline: "From Asset Reporting to Autonomous Resource Intelligence",
    description:
      "Geological modeling, mine-to-port dispatch optimization, ESG compliance automation, and real-time operational telemetry monitoring.",
    icon: Pickaxe,
  },
  {
    id: "travel-leisure-hospitality",
    title: "Travel, Leisure & Hospitality",
    tagline: "From Reservation Support to Next-Gen Experience Systems",
    description:
      "Dynamic pricing engines, loyalty intelligence platforms, property management APIs, and high-availability guest experience architectures.",
    icon: Hotel,
  },
];

export default async function IndustriesHubPage() {
  const [settings, testimonials, logos, faqs] = await Promise.all([
    getSettings(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-navy">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
          <FlowThreads intensity="medium" onDark className="opacity-35" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b49339]">
            <span>Industries</span>
            <span>/</span>
            <span>Sector Specialization</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            Dedicated GCC Setups for Specialized Industry Verticals
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            One size does not fit all. We build dedicated Indian capability
            centres engineered around your sector&apos;s exact regulatory compliance,
            data infrastructure, and practitioner talent depth.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#sectors" variant="gold" size="lg">
              Explore industry models <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Book an industry consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRY DIRECTORY CARDS GRID (4 IN A ROW, 2 ROWS TOTAL) */}
      <Section id="sectors" tone="muted">
        <SectionHeader
          eyebrow="INDUSTRIES WE SERVE"
          title="Sector expertise shaped around your GCC ambition."
          description="Dedicated capability architectures, regulatory rigor, and connected operating systems tailored for each domain."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industryList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#cddcd1] bg-[#edf5ef] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2e3f33] hover:bg-white hover:shadow-xl hover:shadow-[#2e3f33]/10 cursor-default"
              >
                <div>
                  <div className="flex items-start justify-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2e3f33] text-[#b49339] shadow-md ring-4 ring-white group-hover:scale-110 group-hover:bg-[#0b1f3a] transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-navy group-hover:text-[#2e3f33] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[11px] font-bold text-[#b49339] uppercase tracking-wider leading-snug">
                    {item.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 3. CTA BANNER */}
      <Section>
        <CTABand
          title="Don't see your exact industry listed?"
          description="We design custom GCC capability architectures across financial services, digital commerce, logistics, and emerging deep-tech."
          primaryHref="/contact"
          primaryLabel="Discuss your sector case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 4. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Enterprises scaling capability across industries"
          description="Hear from business leaders who built domain-specialized Centers of Excellence with Vertara."
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

      {/* 5. ENQUIRY / CONTACT FORM */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Enquire"
          title="Let's build your industry capability center"
          description="Share what you're building, we'll connect you with the appropriate industry practice partner."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-hub"
            defaultIntent="talent"
            submitLabel="Request an industry partner call"
          />
        </div>
      </Section>

      {/* 6. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about industry GCCs"
          description="Regulatory compliance, air-gapped security perimeters, talent availability, and setup timelines across industries."
        />
        <Accordion
          items={faqs.slice(0, 5).map((f) => ({
            id: f.question,
            title: f.question,
            content: f.answer,
          }))}
        />
        <div className="mt-6 flex justify-center sm:justify-start">
          <Button href="/faq" variant="primary">
            View full FAQ
          </Button>
        </div>
      </Section>
    </>
  );
}
