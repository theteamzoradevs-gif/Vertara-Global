import { CmsImage } from "@/components/ui/CmsImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import {
  getCaseStudies,
  getTestimonials,
  getClientLogos,
  getFaqs,
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
      <PageHero
        title="Case Studies"
        description="Outcomes from programmes that needed an India GCC with clear ownership and pace."
      />

      {/* 1. CASE STUDIES SECTION */}
      <Section>
        <SectionHeader
          eyebrow="Case studies"
          title="Challenge → approach → result"
          description="Programme shapes with metric callouts across diverse industries and capability areas."
        />

        {/* FEATURED CASE STUDY (HORIZONTAL LAYOUT) */}
        {displayFeatured.length > 0 && (
          <div className="space-y-10">
            {displayFeatured.map((cs: {
              title: string;
              client: string;
              industry: string;
              challenge: string;
              approach: string;
              result: string;
              metrics: { label: string; value: string }[];
              image?: string;
            }) => (
              <Reveal key={cs.title}>
                <article className="overflow-hidden rounded-2xl border border-[#cddcd1] bg-surface-elevated shadow-sm transition hover:border-[#2e3f33]/40 hover:shadow-md md:grid md:grid-cols-2">
                  <div className="relative min-h-[260px] bg-surface md:min-h-full">
                    <CmsImage
                      src={cs.image?.trim() || "/images/gcc-floor.webp"}
                      alt={cs.title || "Case study"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute left-4 top-4 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        Featured Story
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                          {cs.industry}
                        </p>
                        <p className="text-xs font-medium text-muted">{cs.client}</p>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold leading-snug text-navy">{cs.title}</h3>
                      <dl className="mt-5 space-y-3 text-sm">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-navy">Challenge</dt>
                          <dd className="mt-0.5 text-muted leading-relaxed">{cs.challenge}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-navy">Approach</dt>
                          <dd className="mt-0.5 text-muted leading-relaxed">{cs.approach}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-navy">Result</dt>
                          <dd className="mt-0.5 text-muted leading-relaxed">{cs.result}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#cddcd1]/60 pt-5">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="rounded-2xl border border-[#cddcd1]/50 bg-[#edf5ef] p-3.5 text-center sm:p-4">
                          <p className="metric-number text-lg font-bold text-accent sm:text-xl md:text-2xl">
                            {m.value}
                          </p>
                          <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* REMAINING CASE STUDIES (RESPONSIVE VERTICAL CARD GRID) */}
        {displayRegular.length > 0 && (
          <div className="mt-12 space-y-6">
            {displayFeatured.length > 0 && (
              <div className="flex items-center gap-3 pt-4">
                <span className="h-px flex-1 bg-[#cddcd1]" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted">
                  More Case Studies & Outcomes
                </span>
                <span className="h-px flex-1 bg-[#cddcd1]" />
              </div>
            )}
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
              }) => (
                <Reveal key={cs.title}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#cddcd1] bg-surface-elevated transition hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:bg-[#edf5ef]/30 hover:shadow-lg">
                    {/* Card Top Image */}
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

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-xs font-medium text-muted">{cs.client}</p>
                      <h3 className="mt-1.5 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-accent">
                        {cs.title}
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
                          className={`mt-5 grid gap-2 border-t border-[#cddcd1]/60 pt-4 text-center ${
                            cs.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"
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
                    </div>
                  </article>
                </Reveal>
              ))}
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
