import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/ui/CmsImage";
import { CTABand } from "@/components/ui/CTABand";
import { ArrowLeft, Users, Clock, BarChart3, CheckCircle2 } from "lucide-react";
import { getCaseStudies, getCaseStudyBySlug, slugifyCaseStudy } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({
    slug: (c as { slug?: string }).slug || slugifyCaseStudy(c.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: "Case Study | Vertara Global" };
  return {
    title: `${caseStudy.title} | Case Studies | Vertara Global`,
    description: caseStudy.challenge || caseStudy.result || "GCC case study transformation by Vertara Global.",
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14 lg:px-8">
        {/* Top Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#b49339]">
          {caseStudy.industry || "Case Study"}
        </p>

        {/* Main Heading */}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] leading-[1.15]">
          {caseStudy.title}
        </h1>

        {/* Client / Track meta */}
        {caseStudy.client && (
          <p className="mt-3 text-sm font-medium text-slate">
            {caseStudy.client}
          </p>
        )}

        {/* Large Horizontal Hero Image */}
        <div className="relative mt-7 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#cddcd1] bg-surface-elevated shadow-md aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.35/1] min-h-[280px] sm:min-h-[420px] md:min-h-[480px]">
          <CmsImage
            src={caseStudy.image?.trim() || "/images/gcc-floor.webp"}
            alt={caseStudy.title || "Case study"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1400px) 100vw, 1360px"
          />
        </div>

        {/* Content Sections: Challenge, Approach, Result */}
        <div className="mt-10 sm:mt-12 space-y-8">
          {/* CHALLENGE */}
          {caseStudy.challenge && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
                Challenge
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate">
                {caseStudy.challenge}
              </p>
            </div>
          )}

          {/* APPROACH */}
          {caseStudy.approach && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
                Approach
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate">
                {caseStudy.approach}
              </p>
            </div>
          )}

          {/* RESULT */}
          {caseStudy.result && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
                Result
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate">
                {caseStudy.result}
              </p>
            </div>
          )}
        </div>

        {/* Key Metrics Callout */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="mt-10 rounded-2xl border border-[#cddcd1] bg-[#edf5ef] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b49339]">
              Key Outcomes & Metrics
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {caseStudy.metrics.map((m, idx) => {
                let Icon = Users;
                if (idx === 0) Icon = Users;
                else if (idx === 1) Icon = Clock;
                else Icon = BarChart3;

                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-3.5 rounded-xl border border-[#cddcd1]/60 bg-white p-4 shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2e3f33] text-[#b49339]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-navy leading-none">
                        {m.value}
                      </p>
                      <p className="mt-1 text-xs text-muted leading-snug">
                        {m.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Navigation: Back to Case Studies */}
        <div className="mt-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2e3f33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#212e25] hover:shadow-md active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 text-[#b49339]" />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* CTA Band */}
        <div className="mt-14">
          <CTABand
            title="Ready to build your dedicated India capability?"
            description="Discuss your domain focus, operating model, and timeline with our senior GCC advisors."
            primaryHref="/contact"
            primaryLabel="Discuss your GCC case"
          />
        </div>
      </main>
    </div>
  );
}
