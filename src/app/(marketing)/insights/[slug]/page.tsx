import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getInsightBySlug, getInsights } from "@/lib/content";
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i: { slug: string }) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: "Insight | Vertara Global" };
  return {
    title: `${insight.title} | Vertara Global Insights`,
    description: insight.excerpt,
  };
}

function renderBody(body: string) {
  if (!body) return null;

  return body.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] border-l-4 border-[#B59439] pl-3.5"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      return (
        <div key={i} className="my-2.5 flex items-start gap-3">
          <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2" />
          <p className="text-base sm:text-lg leading-relaxed text-[#101C30]/85">
            {trimmed.replace("- ", "")}
          </p>
        </div>
      );
    }
    if (!trimmed) {
      return <div key={i} className="h-4" />;
    }
    return (
      <p key={i} className="text-base sm:text-lg leading-relaxed text-[#101C30]/85 my-3 font-normal">
        {trimmed}
      </p>
    );
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [insight, allInsights] = await Promise.all([
    getInsightBySlug(slug),
    getInsights(),
  ]);

  if (!insight) notFound();

  const relatedInsights = allInsights
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 2);

  return (
    <div className="w-full font-sans bg-white" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION (Near-black ink #101C30) */}
      <section className="relative overflow-hidden bg-[#101C30] text-white py-14 sm:py-18 md:py-20 border-b border-[#B59439]/20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back to Insights Navigation */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B59439] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Insights</span>
          </Link>

          {/* Eyebrow & Category */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#B59439] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
              {insight.category || "Perspective"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Clock className="h-3.5 w-3.5 text-[#B59439]" />
              <span>4 min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            {insight.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-white/85 font-normal">
            {insight.excerpt}
          </p>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT SECTION */}
      <section className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Reveal>
          <article className="prose max-w-none text-[#101C30]">
            {renderBody(insight.body)}
          </article>
        </Reveal>

        {/* 3. PRACTITIONER NOTE / CTA CARD */}
        <div className="mt-14 rounded-2xl border border-[#D8D2C0] bg-[#F5F2EA] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2F3F34] text-[#B59439]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#101C30]">
                Applying this framework to your GCC mandate
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#101C30]/85">
                Vertara designs, builds, and operationalizes India GCCs led by practitioners who have run ten GCC builds firsthand. Request a free assessment or speak directly with our advisory team.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Button
                  href="/contact?intent=assessment"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto font-bold bg-[#2F3F34] hover:bg-[#233027] text-white"
                >
                  Request GCC Assessment <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto font-bold border-[#2F3F34] text-[#2F3F34] hover:bg-[#2F3F34] hover:text-white"
                >
                  Discuss Your Mandate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. RELATED INSIGHTS */}
        {relatedInsights.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#D8D2C0]">
            <h3 className="text-xl sm:text-2xl font-bold text-[#101C30] tracking-tight">
              Related Insights
            </h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedInsights.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/insights/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#cddcd1] bg-[#edf5ef]/40 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#2F3F34] hover:bg-white hover:shadow-md"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B59439]">
                      {rel.category}
                    </span>
                    <h4 className="mt-2 text-base sm:text-lg font-bold text-[#101C30] group-hover:text-[#2F3F34] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#101C30]/75 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2F3F34]">
                    Read article <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
