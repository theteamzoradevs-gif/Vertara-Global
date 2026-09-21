import { CmsImage } from "@/components/ui/CmsImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import {
  getCaseStudies,
  getTestimonials,
  getClientLogos,
} from "@/lib/content";

export const metadata = {
  title: "Case Studies",
  description: "Outcomes, capability areas, and operator voices from GCC programmes.",
};

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const [cases, testimonials, logos] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
    getClientLogos(),
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

      <Section>
        <SectionHeader
          eyebrow="Capability"
          title="Industries & services we deliver"
          description="Placeholder labels until named client logos are ready to publish."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo: { name: string; logoText: string }) => (
            <div
              key={logo.name}
              className="flex h-24 items-center justify-center rounded-xl border border-border bg-surface-elevated px-3 text-center text-sm font-semibold text-navy/70 transition hover:border-accent hover:text-navy hover:shadow-md"
            >
              {logo.logoText}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow="Voices" title="What operators say" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t: {
            name: string;
            quote: string;
            role: string;
            company: string;
          }) => (
            <Reveal key={t.name}>
              <blockquote className="h-full rounded-2xl border border-border bg-surface-elevated p-6">
                <p className="text-sm leading-relaxed text-slate">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-navy">
                  {t.name}
                  <span className="block text-xs font-normal text-muted">{t.role}</span>
                  <span className="mt-0.5 block text-[11px] font-normal text-accent">
                    {t.company}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Case studies"
          title="Challenge → approach → result"
          description="Programme shapes with metric callouts — industry and service type only."
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
                  <CmsImage src={cs.image} alt="" fill className="object-cover" sizes="50vw" />
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
                      <div key={m.label} className="rounded-xl bg-surface p-3">
                        <p className="metric-number text-xl font-bold text-accent">
                          {m.value}
                        </p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <CTABand />
        </div>
      </Section>
    </>
  );
}
