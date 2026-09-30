import Link from "next/link";
import Image from "next/image";
import { CmsImage } from "@/components/ui/CmsImage";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getInsights } from "@/lib/content";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

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
    <div className="w-full font-sans" style={{ fontFamily: 'Calibri' }}>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#2F3F34]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            <span>Knowledge</span>
            <span>/</span>
            <span>Perspectives</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-tight text-white">
            Insights
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            The home for Vertara’s point of view written for founders and operators evaluating a GCC, not for search engines. This page is structured to launch light and grow as new pieces are published, it should not ship empty.
          </p>
        </div>
      </section>

      {/* 2. WHAT LIVES HERE SECTION (3 CARDS PER ROW, LIGHT GREEN BG, WHITE CARDS WITH GOLD ACCENTS) */}
      <section
        id="what-lives-here"
        className="w-full bg-[#edf5ef] pt-12 sm:pt-14 md:pt-16 pb-4 sm:pb-6 font-sans"
        style={{ fontFamily: 'Calibri' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Header */}
          <div className="mb-8 sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              WHAT LIVES HERE
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#101C30]">
              Vertara’s perspective on building GCCs
            </h2>

          </div>

          {/* Cards: Auto & Manual Slider on mobile (no arrows, dots only), 3-column Grid on desktop */}
          <MobileAutoSlider
            autoSlideInterval={3500}
            desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-7"
            itemClassName="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
            dotTone="gold"
          >
            {/* Card 01 */}
            <div
              id="card-assessment"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Tools & Expertise
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">01</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  Run Your GCC Assessment
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  A free feasibility assessment, delivered within 2 business days.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div
              id="market-research"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Tools & Expertise
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">02</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  Market Research
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  A standing, expert-delivered service.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div
              id="workplace-strategy"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Tools & Expertise
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">03</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  Workplace Strategy & Change Management
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  A standing, expert-delivered service.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div
              id="nano-gcc-series"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Research & Perspective
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">04</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  Nano GCC series
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  The flagship thought-leadership thread, in short 3–5 page papers.
                </p>
              </div>
            </div>

            {/* Card 05 */}
            <div
              id="white-papers"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Research & Perspective
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">05</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  White papers
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  Longer research pieces, starting with the Japan–India GCC corridor paper.
                </p>
              </div>
            </div>

            {/* Card 06 */}
            <div
              id="linkedin-digest"
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] border-t-4 border-t-[#B59439] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#B59439]/50 scroll-mt-24 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    Research & Perspective
                  </span>
                  <span className="text-sm font-bold text-[#B59439] font-mono">06</span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#101C30] leading-snug">
                  LinkedIn digest
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#101C30]/75">
                  A rolling roundup of the weekly and monthly LinkedIn updates, kept on-site so they don’t disappear into a feed.
                </p>
              </div>
            </div>
          </MobileAutoSlider>
        </div>
      </section>

      {/* 3. RUN YOUR GCC ASSESSMENT SECTION */}
      <section
        id="assessment"
        className="relative overflow-hidden w-full bg-[#edf5ef] pt-2 sm:pt-4 pb-14 sm:pb-16 md:py-20 font-sans scroll-mt-20"
        style={{ fontFamily: 'Calibri' }}
      >
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                  FREE FEASIBILITY ASSESSMENT
                </span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold tracking-tight text-[#101C30] leading-tight">
                See whether a GCC or a Nano GCC is the right move.
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-[#101C30]/85 leading-relaxed font-normal">
                Answer a short set of questions about your business — about 10 minutes. Our proprietary, AI-enabled assessment engine builds your feasibility report, and our in-house GCC experts personally review and validate every output before it’s delivered to you within 2 business days.
              </p>

              <p className="mt-3 text-xs sm:text-sm text-[#101C30]/65 leading-relaxed">
                Your answers are kept strictly confidential and are never used for marketing or sold to any third party — see the Assessment FAQ below.
              </p>

              <div className="mt-6 sm:mt-7">
                <Button
                  href="/contact?intent=assessment"
                  variant="gold"
                  size="lg"
                  className="font-bold text-sm sm:text-base px-8 py-3.5 shadow-lg shadow-[#B59439]/25 hover:shadow-xl hover:shadow-[#B59439]/35 rounded-xl inline-flex items-center"
                >
                  Request Your GCC Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Value Breakdown (Uncarded, Simple Dots) */}
            <div className="lg:col-span-5 lg:pl-4">
              <div className="space-y-4">
                <div className="border-b border-[#cddcd1] pb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                    What you receive
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-[#101C30] mt-1">
                    Confidential Feasibility Report
                  </p>
                </div>

                <ul className="space-y-3.5 text-sm sm:text-base text-[#101C30]">
                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2" />
                    <div>
                      <p className="font-bold text-[#101C30]">10 Minutes</p>
                      <p className="text-xs sm:text-sm text-[#101C30]/75">Short, structured questions about your business mandate.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2" />
                    <div>
                      <p className="font-bold text-[#101C30]">AI Engine + Expert Validated</p>
                      <p className="text-xs sm:text-sm text-[#101C30]/75">Proprietary modeling personally validated by GCC practitioners.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2" />
                    <div>
                      <p className="font-bold text-[#101C30]">Delivered in 2 Business Days</p>
                      <p className="text-xs sm:text-sm text-[#101C30]/75">Delivered directly to your inbox with a clear point of view.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2" />
                    <div>
                      <p className="font-bold text-[#101C30]">Strictly Confidential</p>
                      <p className="text-xs sm:text-sm text-[#101C30]/75">Never used for marketing or sold to any third party.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSIGHTS ARTICLES SECTION */}
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
                <article className="relative overflow-hidden rounded-3xl border border-[#b49339]/35 bg-[#2F3F34] text-white shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-[#233027] via-[#233027]/92 via-40% md:via-48% lg:via-52% to-[#233027]/15 lg:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#233027]/60 via-transparent to-[#233027]/25" />
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 max-w-2xl">
                    {/* Featured Pill Badge */}
                    <div>
                      <span className="inline-flex items-center rounded-full bg-[#c89d3c] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2F3F34] shadow-md">
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
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#cddcd1] bg-surface-elevated transition hover:-translate-y-1 hover:border-[#2F3F34]/40 hover:bg-[#edf5ef]/30 hover:shadow-lg">
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
    </div>
  );
}
