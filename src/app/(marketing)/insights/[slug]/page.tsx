import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getInsightBySlug, getInsights } from "@/lib/content";

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
  if (!insight) return {};
  return { title: insight.title, description: insight.excerpt };
}

function renderBody(body: string) {
  return body.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 text-2xl font-bold text-navy">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-5 list-disc text-slate">
          {line.replace("- ", "")}
        </li>
      );
    }
    if (!line.trim()) return <div key={i} className="h-3" />;
    return (
      <p key={i} className="text-base leading-relaxed text-slate">
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
  if (!insight) notFound();

  return (
    <>
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0 opacity-25">
          <Image src={insight.coverImage} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <Link href="/insights" className="text-sm text-highlight hover:underline">
            ← Insights
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-highlight">
            {insight.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-4 text-lg text-white/75">{insight.excerpt}</p>
        </div>
      </section>
      <Section>
        <article className="prose-insight mx-auto max-w-3xl">
          {renderBody(insight.body)}
        </article>
      </Section>
    </>
  );
}
