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
  TechAiOpportunityJourney,
  TechAiSectorNeedsSelector,
  TechAiHowVertaraHelpsReveal,
} from "@/components/industries/TechAiInteractiveSections";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Technology & AI GCC Setup in India | Vertara Global",
  description:
    "From IT support to AI-grade infrastructure. Build a dedicated Indian Technology & AI capability center — GenAI/LLM engineering, high-density GPU clusters, MLOps pipelines, and Cloud FinOps governance.",
};

const techAiFaqs = [
  {
    id: "faq-1",
    title: "How do you protect proprietary LLM weights, fine-tuning datasets, and AI algorithms?",
    content:
      "We design an air-gapped development perimeter with strict zero-trust network access (ZTNA), disabled local export privileges, and encrypted data-at-rest volumes. Legally, all training pipelines, model weights, and custom architectures are 100% directly assigned to your global parent entity.",
  },
  {
    id: "faq-2",
    title: "How do you help mid-market AI startups manage GPU availability and cloud compute costs?",
    content:
      "We engineer hybrid compute architectures combining reserved on-demand GPU nodes with bare-metal colocation and spot orchestrators. Our FinOps frameworks eliminate idle GPU burn and excessive data egress fees, reducing overall compute spend by up to 50%.",
  },
  {
    id: "faq-3",
    title: "Which Indian cities have the strongest concentration of GenAI & MLOps talent?",
    content:
      "Bengaluru and Hyderabad host India's deepest concentration of transformer architecture researchers, PyTorch/TensorFlow core engineers, and distributed systems architects; NCR/Gurugram and Pune provide strong enterprise SaaS and full-stack AI application talent.",
  },
  {
    id: "faq-4",
    title: "Can we start with a small, focused 5–10 person AI research or data engineering pod?",
    content:
      "Yes. You do not need a 100-person build. We help high-growth AI and SaaS companies launch agile pods dedicated to prompt engineering evaluation harnesses, dataset curation, or fine-tuning infrastructure, scaling compute as production API volume grows.",
  },
  {
    id: "faq-5",
    title: "How quickly can a dedicated AI/ML engineering center become operational?",
    content:
      "Under our Assisted Captive or EOR delivery models, a vetted team of senior AI/ML practitioners and MLOps engineers with configured GPU access and secure workspace can be operational in 60 to 90 days from project kickoff.",
  },
];

export default async function TechnologyAiPage() {
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
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
            alt="Technology & AI GCC in India"
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
            <span>Technology & AI</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            From IT Support to AI-Grade Infrastructure
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            AI infrastructure built to scale with usage not provisioned for a
            headcount you don't have yet. Own GenAI/LLM engineering, MLOps,
            applied research, and high-density compute in India.
          </p>

          {/* Domain Scope Tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-white/80">
            {[
              "GenAI/LLM Engineering",
              "MLOps & Model Lifecycle",
              "Applied AI Research",
              "Data Platforms & Pipelines",
              "GPU & Bare-Metal Compute",
              "Cloud FinOps Governance",
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
              Book an AI consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="#the-opportunity"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              Explore AI model
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
              <p className="mt-1 text-xs sm:text-sm text-slate">GPU utilization & MLOps sync</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">50%+</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Lower GPU & compute burn</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">GenAI</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">LLM fine-tuning & quantization</p>
            </div>
            <div className="border-l-2 border-[#b49339] pl-4">
              <p className="text-2xl sm:text-3xl font-bold text-navy">Zero-Trust</p>
              <p className="mt-1 text-xs sm:text-sm text-slate">Sovereign weights & training IP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE OPPORTUNITY — 3-STAGE TECH & AI JOURNEY */}
      <Section id="the-opportunity" tone="muted">
        <SectionHeader
          eyebrow="The Opportunity"
          title="From IT Support to AI-Grade Infrastructure"
          description="A progressive 3-stage journey turning legacy engineering tickets into production-grade GenAI models, custom MLOps pipelines, and scalable data platforms."
        />
        <TechAiOpportunityJourney />
      </Section>

      {/* 4. CTA BANNER */}
      <Section>
        <CTABand
          title="Ready to talk through your Tech & AI GCC plans?"
          description="Share your model architecture, compute requirements, and ML engineering headcount targets. A partner will map fit, timeline, and next steps."
          primaryHref="#enquire"
          primaryLabel="Talk through your case"
          secondaryHref="/engagement-models"
          secondaryLabel="Compare engagement models"
        />
      </Section>

      {/* 5. WHAT THIS SECTOR NEEDS — 3-POINT AI INFRASTRUCTURE */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="What This Sector Needs"
          title="Engineered for Right-Sized Compute, MLOps Rigor & Cloud FinOps"
          description="Explore the high-density GPU orchestration, automated model registry loops, and hybrid multi-cloud cost controls required for high-velocity AI enterprises."
        />
        <TechAiSectorNeedsSelector />
      </Section>

      {/* 6. HOW VERTARA HELPS — CONNECTED BLUEPRINT */}
      <Section>
        <SectionHeader
          eyebrow="How Vertara Helps"
          title="One Accountable Operating System for Tech & AI"
          description="A connected capability engine spanning high-density GPU ops, GenAI applied research, AI/ML practitioner hiring, deep tech clusters, and model governance."
        />
        <TechAiHowVertaraHelpsReveal />
      </Section>

      {/* 7. CLIENT VOICES & TESTIMONIALS */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="AI and SaaS enterprises scaling production intelligence"
          description="Hear from CTOs, Heads of AI Research, and VP Engineering who accelerated their model deployment velocity with Vertara."
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
          title="Let's build your AI-grade capability center"
          description="Share your product and compute roadmap, we'll connect you with our Technology & AI practice lead."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm
            source="industries-technology-ai"
            defaultIntent="talent"
            submitLabel="Request a Tech & AI partner call"
          />
        </div>
      </Section>

      {/* 9. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Tech & AI GCCs"
          description="GPU compute sizing, model weight IP protection, Indian AI talent clusters, and launch timelines answered upfront."
        />
        <Accordion items={techAiFaqs} />
      </Section>
    </>
  );
}
