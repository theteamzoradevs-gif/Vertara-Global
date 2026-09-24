import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/ui/CTABand";
import { ModelSelector } from "@/components/engagement/ModelSelector";
import { CommercialModelsTable } from "@/components/engagement/CommercialModelsTable";
import { CommercialPrinciples } from "@/components/engagement/CommercialPrinciples";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/leads/ContactForm";
import { EngagementFormSideContent } from "@/components/engagement/EngagementFormSideContent";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { ArrowRight } from "lucide-react";
import {
  getEngagementModels,
  getTestimonials,
  getClientLogos,
  getFaqs,
} from "@/lib/content";

export const metadata = {
  title: "Engagement Models",
  description:
    "Compare Flexible Partnership, Build & Transfer, and Managed Team — plus an interactive fit selector and 5 commercial models.",
};

export default async function EngagementModelsPage() {
  const [models, testimonials, logos, faqs] = await Promise.all([
    getEngagementModels(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#0e3621]">
        {/* Right-aligned Realistic Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"
            alt="Engagement and Commercial Models"
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
            <span>Engagement</span>
            <span>/</span>
            <span>Commercial Models</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            Choose how we work together
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Proven commercial structures and operational models compared on
            length, ownership, setup time, fit, and cost.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#models" variant="gold" size="lg">
              Explore engagement models <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. FIVE COMMERCIAL MODELS TABULAR SECTION */}
      <Section id="models">
        <SectionHeader
          eyebrow="Commercial Structures"
          title="Five commercial models to work with us"
          description="The right commercial structure depends on where you are in the GCC journey not a fixed package applied regardless of stage. One Accountable partner."
        />
        <CommercialModelsTable />
        <CommercialPrinciples />
      </Section>

      {/* 2. SIDE-BY-SIDE MODEL SELECTOR */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Compare"
          title="Side-by-side engagement models"
          description="Hover or tap the selector answers to highlight the best-fit column."
        />
        <ModelSelector models={models} />
      </Section>

      {/* 3. WHAT EACH MODEL LOOKS LIKE DAY TO DAY */}
      <Section>
        <SectionHeader
          eyebrow="In practice"
          title="What each model looks like day to day"
        />
        <div className="space-y-8">
          {models.map((m) => (
            <Reveal key={m.slug}>
              <article
                id={`model-${m.slug}`}
                className="scroll-mt-24 rounded-2xl border border-border bg-surface-elevated p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold text-navy">{m.name}</h3>
                <p className="mt-2 text-muted">{m.summary}</p>
                <ol className="mt-6 space-y-4">
                  {m.practiceSteps.map(
                    (step: { title: string; detail: string }, i: number) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="metric-number text-xl font-bold text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-semibold text-navy">{step.title}</p>
                          <p className="mt-1 text-sm text-muted">{step.detail}</p>
                        </div>
                      </li>
                    ),
                  )}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <CTABand title="Unsure which model fits? Let’s decide together." />
        </div>
      </Section>

      {/* 4. TESTIMONIALS & TRUST SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
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

      {/* 5. ENQUIRY / NEXT STEP */}
      <Section id="enquire">
        <SectionHeader
          eyebrow="Next step"
          title="Talk through the right model"
          description="Share your headcount, city, and ownership preference — a partner will map the fit."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm
              source="engagement_models"
              submitLabel="Book a model discussion"
              className="h-full flex flex-col justify-between"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <EngagementFormSideContent />
          </div>
        </div>
      </Section>

      {/* 6. FAQ SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about engagement models"
          description="Ownership transfers, milestone delivery, itemized pricing, and staffing flexibility answered."
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
