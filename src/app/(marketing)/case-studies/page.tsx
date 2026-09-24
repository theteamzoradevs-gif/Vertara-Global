import Image from "next/image";
import { CmsImage } from "@/components/ui/CmsImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import Link from "next/link";
import { ArrowRight, Users, Clock, BarChart3 } from "lucide-react";
import {
  getCaseStudies,
  getTestimonials,
  getClientLogos,
  getFaqs,
  slugifyCaseStudy,
} from "@/lib/content";

export const metadata = {
  title: "Case Studies",
  description: "Outcomes, capability areas, and operator voices from GCC programmes.",
};

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const [cases, testimonials, logos, faqs] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);

  const featuredCases = cases.filter((c: { featured?: boolean }) => c.featured === true);
  const regularCases = cases.filter((c: { featured?: boolean }) => c.featured !== true);

  // If no case is explicitly marked featured, treat the first one as featured
  const displayFeatured =
    featuredCases.length > 0 ? featuredCases : cases.length > 0 ? [cases[0]] : [];
  const displayRegular =
    featuredCases.length > 0 ? regularCases : cases.slice(1);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#0e3621]">
        {/* Right-aligned Realistic Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/case studies.png"
            alt="Client Success & Transformation Case Studies"
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
            <span>Proven Track Record</span>
            <span>/</span>
            <span>Client Transformations</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            Client Success & Transformation Case Studies
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Outcomes from programmes that needed an India GCC with clear ownership, accelerated velocity, and zero compliance compromise.
          </p>

          {/* Hero CTAs */}

        </div>
      </section>

      {/* 2. CASE STUDIES SECTION */}
      <Section id="case-studies">
        <SectionHeader
          eyebrow="Case studies"
          title="Challenge → approach → result"
          description="Programme shapes with metric callouts across diverse industries and capability areas."
        />

        {/* FEATURED CASE STUDY (FULL BLEED HERO CARD) */}
        {displayFeatured.length > 0 && (
          <div className="space-y-12">
            {displayFeatured.map((cs: {
              title: string;
              client: string;
              industry: string;
              challenge: string;
              approach: string;
              result: string;
              metrics: { label: string; value: string }[];
              image?: string;
              slug?: string;
            }) => {
              const caseSlug = cs.slug || slugifyCaseStudy(cs.title);
              return (
                <Reveal key={cs.title}>
                  <article className="relative overflow-hidden rounded-3xl border border-[#b49339]/35 bg-[#0e3621] text-white shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
                    {/* Right-aligned Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={cs.image?.trim() || "/images/gcc-floor.webp"}
                        alt={cs.title || "Featured Case Study"}
                        fill
                        className="object-cover object-right"
                        sizes="100vw"
                      />
                      {/* Soft Emerald Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320] via-[#0d3320]/92 via-40% md:via-48% lg:via-52% to-[#0d3320]/15 lg:to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/60 via-transparent to-[#0d3320]/25" />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 max-w-2xl">
                      {/* Featured Pill Badge */}
                      <div>
                        <span className="inline-flex items-center rounded-full bg-[#c89d3c] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0e3621] shadow-md">
                          Featured Story
                        </span>
                      </div>

                      {/* Industry Eyebrow */}
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                        {cs.industry || "RETAIL / DIGITAL"}
                      </p>

                      {/* Title */}
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] leading-tight">
                        <Link href={`/case-studies/${caseSlug}`} className="hover:underline">
                          {cs.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base font-normal">
                        {cs.result || cs.challenge || "From zero to a fully operational engineering centre in 10 months, enabling faster innovation and scalable product delivery."}
                      </p>

                      {/* Read full case study CTA */}
                      <div className="mt-6 sm:mt-7">
                        <Button href={`/case-studies/${caseSlug}`} variant="gold" size="lg" className="font-semibold shadow-md">
                          Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>

                      {/* Metrics Bar */}
                      {cs.metrics && cs.metrics.length > 0 && (
                        <div className="mt-8 rounded-2xl border border-white/20 bg-[#0d3320]/75 backdrop-blur-md p-4 sm:p-5 sm:mt-10 shadow-lg">
                          <div className="grid grid-cols-1 gap-4 divide-y divide-white/20 sm:grid-cols-3 sm:gap-0 sm:divide-y-0 sm:divide-x">
                            {cs.metrics.map((m, idx) => {
                              let Icon = Users;
                              const labelLower = (m.label || "").toLowerCase();
                              if (
                                idx === 0 ||
                                labelLower.includes("headcount") ||
                                labelLower.includes("team") ||
                                labelLower.includes("specialist")
                              ) {
                                Icon = Users;
                              } else if (
                                idx === 1 ||
                                labelLower.includes("time") ||
                                labelLower.includes("launch") ||
                                labelLower.includes("cohort")
                              ) {
                                Icon = Clock;
                              } else {
                                Icon = BarChart3;
                              }

                              return (
                                <div
                                  key={m.label}
                                  className="flex items-center gap-3.5 px-3 pt-3 sm:pt-0 first:pt-0 first:pl-2 last:pr-2"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b49339]/50 bg-[#b49339]/20 text-[#c89d3c] shadow-xs">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="text-xl font-bold tracking-tight text-white sm:text-2xl leading-none">
                                      {m.value}
                                    </p>
                                    <p className="mt-1 text-xs font-medium text-white/80 leading-snug">
                                      {m.label}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* REMAINING CASE STUDIES (RESPONSIVE VERTICAL CARD GRID) */}
        {displayRegular.length > 0 && (
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayRegular.map((cs: {
                title: string;
                client: string;
                industry: string;
                challenge: string;
                approach: string;
                result: string;
                metrics: { label: string; value: string }[];
                image?: string;
                slug?: string;
              }) => {
                const caseSlug = cs.slug || slugifyCaseStudy(cs.title);
                return (
                  <Reveal key={cs.title}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#cddcd1] bg-surface-elevated transition hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:bg-[#edf5ef]/30 hover:shadow-lg">
                      {/* Card Top Image */}
                      <Link href={`/case-studies/${caseSlug}`} className="block">
                        <div className="relative h-48 w-full overflow-hidden bg-surface sm:h-52">
                          <CmsImage
                            src={cs.image?.trim() || "/images/gcc-floor.webp"}
                            alt={cs.title || "Case study"}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute left-3 top-3 z-10">
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0b1f3a]/85 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                              {cs.industry}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Card Body */}
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <p className="text-xs font-medium text-muted">{cs.client}</p>
                        <h3 className="mt-1.5 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-accent">
                          <Link href={`/case-studies/${caseSlug}`} className="hover:underline">
                            {cs.title}
                          </Link>
                        </h3>

                        <dl className="mt-4 flex-1 space-y-2.5 text-xs sm:text-sm">
                          {cs.challenge && (
                            <div>
                              <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy">Challenge</dt>
                              <dd className="mt-0.5 text-muted line-clamp-2 leading-relaxed">{cs.challenge}</dd>
                            </div>
                          )}
                          {cs.approach && (
                            <div>
                              <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy">Approach</dt>
                              <dd className="mt-0.5 text-muted line-clamp-2 leading-relaxed">{cs.approach}</dd>
                            </div>
                          )}
                          {cs.result && (
                            <div>
                              <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy">Result</dt>
                              <dd className="mt-0.5 text-muted line-clamp-2 leading-relaxed">{cs.result}</dd>
                            </div>
                          )}
                        </dl>

                        {/* Card Metrics */}
                        {cs.metrics && cs.metrics.length > 0 && (
                          <div
                            className={`mt-5 grid gap-2 border-t border-[#cddcd1]/60 pt-4 text-center ${cs.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"
                              }`}
                          >
                            {cs.metrics.map((m) => (
                              <div key={m.label} className="rounded-xl border border-[#cddcd1]/40 bg-[#edf5ef] p-2.5">
                                <p className="text-base font-bold text-accent sm:text-lg">{m.value}</p>
                                <p className="mt-0.5 text-[10px] leading-tight text-muted line-clamp-1">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 pt-3 border-t border-[#cddcd1]/40 flex items-center justify-between">
                          <Link
                            href={`/case-studies/${caseSlug}`}
                            className="text-xs font-bold text-[#2e3f33] group-hover:text-accent transition-colors inline-flex items-center gap-1"
                          >
                            <span>Read case study</span>
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </Section>

      {/* 2. TESTIMONIALS & TRUST SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Enterprises building lasting India capability"
          description="The capabilities we deliver, backed by the experiences of leaders building and scaling in India."
        />
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {logos.map((logo: { name: string; logoText: string }) => (
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

      {/* 3. FAQ SECTION */}
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about GCC programmes"
          description="Timelines, commercials, ownership models, and capability scaling answered upfront."
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
        <div className="mt-12">
          <CTABand />
        </div>
      </Section>
    </>
  );
}
