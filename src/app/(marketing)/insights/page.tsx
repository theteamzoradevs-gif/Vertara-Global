import Link from "next/link";
import Image from "next/image";
import { CmsImage } from "@/components/ui/CmsImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getInsights } from "@/lib/content";

export const metadata = {
  title: "Insights",
  description: "Perspectives on GCC strategy, talent, location, and engagement models.",
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await getInsights();

  const featuredInsights = insights.filter((i: { featured?: boolean }) => i.featured === true);
  const regularInsights = insights.filter((i: { featured?: boolean }) => i.featured !== true);

  const displayFeatured =
    featuredInsights.length > 0 ? featuredInsights : insights.length > 0 ? [insights[0]] : [];
  const displayRegular =
    featuredInsights.length > 0 ? regularInsights : insights.slice(1);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#0e3621]">
        {/* Soft Emerald Gradient & Threads */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320] via-[#0d3320]/95 to-[#0d3320]" />
        <FlowThreads intensity="medium" onDark className="opacity-40" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
            <span>Knowledge</span>
            <span>/</span>
            <span>Perspectives</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            Insights
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Practical reading for CHROs, COOs, and global operations leaders.
          </p>
        </div>
      </section>

      {/* 2. INSIGHTS ARTICLES SECTION */}
      <Section id="articles">
        {/* FEATURED INSIGHT (HERO CARD) */}
        {displayFeatured.length > 0 && (
          <div className="space-y-12">
            {displayFeatured.map((insight: {
              slug: string;
              title: string;
              excerpt: string;
              coverImage: string;
              category: string;
            }) => (
              <Reveal key={insight.slug}>
                <article className="relative overflow-hidden rounded-3xl border border-[#b49339]/35 bg-[#0e3621] text-white shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
                  {/* Right-aligned Background Image */}
                  <div className="absolute inset-0">
                    <CmsImage
                      src={insight.coverImage?.trim() || "/images/gcc-ops.png"}
                      alt={insight.title || "Featured Insight"}
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
                        Featured Article
                      </span>
                    </div>

                    {/* Category Eyebrow */}
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                      {insight.category || "TALENT"}
                    </p>

                    {/* Title */}
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] leading-tight">
                      <Link href={`/insights/${insight.slug}`} className="hover:underline">
                        {insight.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base font-normal">
                      {insight.excerpt}
                    </p>

                    {/* Read CTA */}
                    <div className="mt-6 sm:mt-7">
                      <Button href={`/insights/${insight.slug}`} variant="gold" size="lg" className="font-semibold shadow-md">
                        Read full article <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* REMAINING INSIGHTS (RESPONSIVE CARD GRID) */}
        {displayRegular.length > 0 && (
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayRegular.map((insight: {
                slug: string;
                title: string;
                excerpt: string;
                coverImage: string;
                category: string;
              }) => (
                <Reveal key={insight.slug}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#cddcd1] bg-surface-elevated transition hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:bg-[#edf5ef]/30 hover:shadow-lg">
                    {/* Card Top Image */}
                    <Link href={`/insights/${insight.slug}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden bg-surface sm:h-52">
                        <CmsImage
                          src={insight.coverImage?.trim() || "/images/gcc-ops.png"}
                          alt={insight.title || "Insight cover"}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute left-3 top-3 z-10">
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0b1f3a]/85 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                            {insight.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-bold leading-snug text-navy transition-colors group-hover:text-accent">
                        <Link href={`/insights/${insight.slug}`} className="hover:underline">
                          {insight.title}
                        </Link>
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                        {insight.excerpt}
                      </p>

                      <div className="mt-5 pt-4 border-t border-[#cddcd1]/60 flex items-center justify-between">
                        <Link
                          href={`/insights/${insight.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent transition hover:text-accent-hover"
                        >
                          Read article
                          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
