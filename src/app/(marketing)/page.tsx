import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { Accordion } from "@/components/ui/Accordion";
import { ConnectedModules } from "@/components/home/ConnectedModules";
import { ServiceCard } from "@/components/home/ServiceCard";
import { Hero } from "@/components/home/Hero";
import { CompetitiveComparison } from "@/components/home/CompetitiveComparison";
import { ImageStoryStrip } from "@/components/home/ImageStoryStrip";
import { HoverStatCard } from "@/components/home/HoverStatCard";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { JourneySteps } from "@/components/home/JourneySteps";
import { HomeCaseStudies } from "@/components/home/HomeCaseStudies";
import {
  getSettings,
  getServices,
  getTestimonials,
  getClientLogos,
  getFaqs,
  getEngagementModels,
  getCaseStudies,
} from "@/lib/content";
import { whyGccCards } from "@/data/seed-content";

export default async function HomePage() {
  const [settings, services, testimonials, logos, faqs, models, cases] =
    await Promise.all([
      getSettings(),
      getServices(),
      getTestimonials(),
      getClientLogos(),
      getFaqs(),
      getEngagementModels(),
      getCaseStudies(),
    ]);

  const featuredCases = cases.filter((c: { featured?: boolean }) => c.featured).slice(0, 2);

  return (
    <>
      <Hero
        tagline={settings.tagline}
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
        metrics={settings.metrics}
        phone={settings.contactPhone}
        backgroundImage="/images/gcc-floor.webp"
      />

      <Section id="how-it-connects" threads="strong">
        <SectionHeader
          eyebrow="Platform"
          title="How it all connects"
          description="Talent, workspace, operations, and advisory as integrated modules of one GCC operating system — not disconnected vendor pages."
        />
        <ConnectedModules modules={services} />
      </Section>

      <Section tone="muted" threads="light">
        <SectionHeader
          eyebrow="On the ground"
          title="Real floors. Real teams. Real operating rhythm."
          description="Infrastructure and environments that make a GCC feel like part of the parent enterprise — not a distant vendor site."
        />
        <ImageStoryStrip />
      </Section>

      <Section id="who-we-serve" threads="light">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Who needs us"
            title="Built around how enterprise teams actually buy"
            description="Match your pattern — then explore the detail in the panel. Original framing for GCC buyers, not a generic industry grid."
          />
        </div>
        <WhoWeServe />
      </Section>

      <Section id="why-gcc" tone="muted" threads="light">
        <SectionHeader
          eyebrow="Strategic case"
          title="Why enterprises build GCCs"
          description="Cost, talent, speed, and control — presented as signals leadership teams already measure. Hover any card for the operating implication."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyGccCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <HoverStatCard
                stat={card.stat}
                title={card.title}
                detail={card.detail}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="why-us">
        <SectionHeader
          eyebrow="Why GCC Advisor"
          title="Built to beat multi-vendor chaos"
          description="How we stack up against stitching vendors yourself — or staying in a classic offshore model. Scan the table — no taps required."
        />
        <CompetitiveComparison />
      </Section>

      <Section tone="muted" threads="light">
        <SectionHeader
          eyebrow="Services"
          title="Four modules. One accountable plan."
          description="Hover or tap a card to flip — description and CTAs on the back, without pushing the page layout down."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard
              key={s.slug}
              slug={s.slug}
              name={s.name}
              shortDescription={s.shortDescription}
              valueProposition={s.valueProposition}
              icon={s.icon}
              image={s.image}
            />
          ))}
        </div>
        <div className="mt-12">
          <CTABand
            title="Not sure which modules to start with?"
            description="Most programmes begin with a short discovery call — timeline, ownership, and the first 90 days."
            primaryLabel="Start a conversation"
            primaryHref="/contact"
          />
        </div>
      </Section>

      <JourneySteps />

      <Section tone="navy">
        <SectionHeader
          eyebrow="Engagement"
          title="Ways of working that match how you buy"
          description="Flexible partnership, build-and-transfer, or managed team — compare side by side."
          light
        />
        <div className="grid gap-4 md:grid-cols-3">
          {models.map((m) => (
            <Reveal key={m.slug}>
              <Link
                href="/engagement-models"
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-highlight/50"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="relative">
                  <h3 className="text-lg font-bold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{m.summary}</p>
                  <p className="mt-3 text-sm text-white/55 opacity-0 transition group-hover:opacity-100">
                    Best fit: {m.bestFit}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-highlight">
                    Setup · {m.setupTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/engagement-models" size="lg">
            Compare models & take the selector
          </Button>
        </div>
      </Section>

      <Section id="outcomes" threads="light">
        <SectionHeader
          eyebrow="Outcomes"
          title="Case studies from live programmes"
          description="Challenge → result with metric callouts — same storytelling language as our customers page."
        />
        <HomeCaseStudies cases={featuredCases.length ? featuredCases : cases.slice(0, 2)} />
        <div className="mt-8">
          <Button href="/customers" variant="outline">
            View all customer stories
          </Button>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust"
          title="Enterprises building lasting India capability"
          description="Capability areas we support — and voices from operators who needed clarity, not decks. Hover a testimonial row to pause."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-surface-elevated px-3 text-center text-sm font-semibold text-navy/70 transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/40 hover:text-navy hover:shadow-md"
            >
              {logo.logoText}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TestimonialMarquee items={testimonials} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions enterprise buyers ask before the first call"
          description="Timelines, ownership, cost, cities, and roles — answered without the runaround."
        />
        <Accordion
          items={faqs.slice(0, 5).map((f) => ({
            id: f.question,
            title: f.question,
            content: f.answer,
          }))}
        />
        <div className="mt-6">
          <Button href="/faq" variant="outline">
            View full FAQ
          </Button>
        </div>
        <div className="mt-12">
          <CTABand />
        </div>
      </Section>
    </>
  );
}
