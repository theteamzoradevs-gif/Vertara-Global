import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/ui/CmsImage";
import { CTABand } from "@/components/ui/CTABand";
import { ArrowLeft } from "lucide-react";
import { getInsightBySlug, getInsights } from "@/lib/content";

export const dynamic = "force-dynamic";

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
    title: `${insight.title} | Insights | Vertara Global`,
    description: insight.excerpt || "Practical GCC insights and perspectives by Vertara Global.",
  };
}

function renderBody(body: string) {
  return body.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 mb-3 text-xl sm:text-2xl font-bold text-navy">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-5 list-disc text-slate text-base sm:text-lg leading-relaxed">
          {line.replace("- ", "")}
        </li>
      );
    }
    if (!line.trim()) return <div key={i} className="h-3" />;
    return (
      <p key={i} className="text-base sm:text-lg leading-relaxed text-slate">
        {line}
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
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14 lg:px-8">
        {/* Top Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#b49339]">
          {insight.category || "Insight"}
        </p>

        {/* Main Heading */}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] leading-[1.15]">
          {insight.title}
        </h1>

        {/* Excerpt / Subtitle */}
        {insight.excerpt && (
          <p className="mt-3 text-sm sm:text-base font-medium text-slate max-w-4xl leading-relaxed">
            {insight.excerpt}
          </p>
        )}

        {/* Large Horizontal Hero Image */}
        <div className="relative mt-7 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#cddcd1] bg-surface-elevated shadow-md aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.35/1] min-h-[280px] sm:min-h-[420px] md:min-h-[480px]">
          <CmsImage
            src={insight.coverImage?.trim() || "/images/gcc-ops.png"}
            alt={insight.title || "Insight"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1400px) 100vw, 1360px"
          />
        </div>

        {/* Article Body Content */}
        <div className="mt-10 sm:mt-12">
          <article className="prose-insight space-y-4">
            {renderBody(insight.body)}
          </article>
        </div>

        {/* Bottom Navigation: Back to Insights */}
        <div className="mt-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2e3f33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#212e25] hover:shadow-md active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 text-[#b49339]" />
            <span>Back to Insights</span>
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
