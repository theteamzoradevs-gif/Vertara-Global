import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
// import { OurVision } from "@/components/home/OurVision";
// import { WhoAreWe } from "@/components/home/WhoAreWe";
import { WhereWereStrongest } from "@/components/home/WhereWereStrongest";
import { ScopeCards } from "@/components/home/ScopeCards";
import { Hero } from "@/components/home/Hero";
import { NanoGccExplainer } from "@/components/home/NanoGccExplainer";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { BuiltForMidMarket } from "@/components/home/BuiltForMidMarket";
import { ChooseVertaraIf } from "@/components/home/ChooseVertaraIf";
import { CompetitiveComparison } from "@/components/home/CompetitiveComparison";
import { ImageStoryStrip } from "@/components/home/ImageStoryStrip";
import { HoverStatCard } from "@/components/home/HoverStatCard";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { LedByPractitioners } from "@/components/home/LedByPractitioners";
import { WhyUs } from "@/components/home/WhyUs";
import { JourneySteps } from "@/components/home/JourneySteps";
import { HomeCaseStudies } from "@/components/home/HomeCaseStudies";
import { HomeInsights } from "@/components/home/HomeInsights";
import {
  getSettings,
  getServices,
  getTestimonials,
  getClientLogos,
  getFaqs,
  getEngagementModels,
  getCaseStudies,
  getInsights,
} from "@/lib/content";
import { whyGccCards } from "@/data/seed-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services, testimonials, logos, faqs, models, cases, insights] =
    await Promise.all([
      getSettings(),
      getServices(),
      getTestimonials(),
      getClientLogos(),
      getFaqs(),
      getEngagementModels(),
      getCaseStudies(),
      getInsights(),
    ]);

  const homepageCases = [
    ...cases.filter((c: { featured?: boolean }) => c.featured === true),
    ...cases.filter((c: { featured?: boolean }) => c.featured !== true),
  ].slice(0, 1);
  const homepageInsights = [
    ...insights.filter((i: { featured?: boolean }) => i.featured === true),
    ...insights.filter((i: { featured?: boolean }) => i.featured !== true),
  ].slice(0, 1);

  return (
    <>
      <Hero
        tagline={settings.tagline}
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
        metrics={settings.metrics}
        phone={settings.contactPhone}
        backgroundImage={settings.heroBackgroundImage}
        primaryCta={settings.heroPrimaryCta}
        secondaryCta={settings.heroSecondaryCta}
        formEyebrow={settings.heroFormEyebrow}
        formTitle={settings.heroFormTitle}
        formDescription={settings.heroFormDescription}
        formButton={settings.heroFormButton}
        formSuccess={settings.heroFormSuccess}
        showQuickCallForm={settings.showQuickCallForm}
      />

      <NanoGccExplainer />

      <WhatWeDo />

      <BuiltForMidMarket />

      <ChooseVertaraIf />

      {/* <WhoAreWe /> */}

      <Section
        id="who-we-serve"
        tone="none"
        threads="light"
        className="border-b border-[#cddcd1]"
        style={{ backgroundColor: "#e5ebe6" }}
      >
        <SectionHeader
          eyebrow="Who needs us"
          title="Our offerings, at a glance"
          titleClassName="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]"
          description="A six-stage build model, clear commercial principles, and deep expertise across eight sectors spanning Nano GCCs through 500-person mid-scale builds."
          className="mb-8 md:mb-10 max-w-none w-full"
        />

        {/* 4 Scope Cards (Nano, Mid-scale, Both scopes, Backed by research) placed before Industries */}
        <div className="mb-8 sm:mb-10">
          <ScopeCards />
        </div>

        {/* Text line between the cards */}
        <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-[#cddcd1]/80 mb-6 sm:mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            Sector Expertise
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
            What we build for across eight mid-market sectors
          </h3>
        </div>

        <WhoWeServe />
      </Section>

      <LedByPractitioners />

      <WhyUs />

      {/* Disabled sections per client narrative */}
      {/* <WhereWereStrongest /> */}

      {/* <Section id="how-it-connects" threads="strong">
        <SectionHeader
          eyebrow="Platform"
          title="How it all connects"
          description="Talent, workspace, operations, and advisory as integrated modules of one GCC operating system — not disconnected vendor pages."
        />
        <ConnectedModules modules={services} />
      </Section> */}

      {/* <Section tone="muted" threads="light">
        <SectionHeader
          eyebrow="On the ground"
          title="Real floors. Real teams. Real operating rhythm."
          description="Infrastructure and environments that make a GCC feel like part of the parent enterprise not a distant vendor site."
        />
        <ImageStoryStrip />
      </Section> */}

      {/* <Section id="why-gcc" tone="muted" threads="light">
        <SectionHeader
          eyebrow="Strategic case"
          title="Why enterprises build GCCs"
          description="Cost, talent, speed, and control presented as signals leadership teams already measure. Hover any card for the operating implication."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
      </Section> */}

      {/* <Section id="why-us">
        <SectionHeader
          eyebrow="Why GCC Advisor"
          title="Built to beat multi-vendor chaos"
          description="How we stack up against stitching vendors yourself or staying in a classic offshore model. Scan the table no taps required."
        />
        <CompetitiveComparison />
      </Section> */}

      {/* <JourneySteps /> */}

      {/* <Section
        tone="green"
        threads="medium"
        className="relative shadow-[inset_0_2px_30px_rgba(0,0,0,0.35)] bg-gradient-to-r from-[#233027] via-[#2F3F34] to-[#233027]"
      >
        <SectionHeader
          eyebrow="Engagement"
          title="Ways of working that match how you buy"
          description="Flexible partnership, build and transfer, or managed team compare side by side."
          light
        />
        <div className="grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <Reveal key={m.slug}>
              <Link
                href="/engagement-models"
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b49339]/70 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="relative">
                  <h3 className="text-xl font-bold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{m.summary}</p>
                  <p className="mt-3 text-sm text-white/60 opacity-0 transition duration-300 group-hover:opacity-100">
                    Best fit: {m.bestFit}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#b49339]">
                    Setup · {m.setupTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button
            href="/engagement-models"
            variant="gold"
            size="lg"
            className="shadow-lg shadow-black/25 hover:shadow-xl"
          >
            Compare models & take the selector
          </Button>
        </div>
      </Section> */}

      {/* <Section id="outcomes" threads="light">
        <SectionHeader
          eyebrow="Outcomes"
          title="Case studies from live programmes"
          description="Challenge → result with metric callouts — same storytelling language as our case studies page."
        />
        <HomeCaseStudies cases={homepageCases} />
        <div className="mt-8 flex justify-center sm:justify-start">
          <Button href="/case-studies" variant="primary">
            View all case studies
          </Button>
        </div>
      </Section> */}

      {/* Disabled per client request */}
      {/* {homepageInsights.length > 0 ? (
        <Section>
          <SectionHeader
            eyebrow="Insights"
            title="Practical reading for GCC leaders"
            description="Perspectives on strategy, talent, location, and engagement — featured from the insights library."
          />
          <HomeInsights insights={homepageInsights} />
          <div className="mt-8 flex justify-center sm:justify-start">
            <Button href="/insights" variant="primary">
              View all insights
            </Button>
          </div>
        </Section>
      ) : null} */}

      {/* <Section tone="muted">
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
      </Section> */}

      <HomeFaqSection faqs={faqs} />

      <HomeCtaBanner />
    </>
  );
}
