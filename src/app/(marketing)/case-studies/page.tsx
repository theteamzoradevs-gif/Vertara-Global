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

  const orderedCases = [
    ...cases.filter((c: { featured?: boolean }) => c.featured === true),
    ...cases.filter((c: { featured?: boolean }) => c.featured !== true),
  ];

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
        <div className="space-y-10">
          {orderedCases.map((cs: {
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
              <article className="overflow-hidden rounded-2xl border border-border bg-surface-elevated md:grid md:grid-cols-2">
                <div className="relative min-h-[240px] bg-surface">
                  <CmsImage
                    src={cs.image?.trim() || "/images/gcc-floor.webp"}
                    alt={cs.title || "Case study"}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {cs.industry}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted">{cs.client}</p>
                  <h3 className="mt-2 text-2xl font-bold text-navy">{cs.title}</h3>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-navy">Challenge</dt>
                      <dd className="text-muted">{cs.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy">Approach</dt>
                      <dd className="text-muted">{cs.approach}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy">Result</dt>
                      <dd className="text-muted">{cs.result}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl bg-[#e5ebe6] p-3.5 sm:p-4">
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
