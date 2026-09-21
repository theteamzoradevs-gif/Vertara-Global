import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { getInsights } from "@/lib/content";

export const metadata = {
  title: "Insights",
  description: "Perspectives on GCC strategy, talent, location, and engagement models.",
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await getInsights();
  const orderedInsights = [
    ...insights.filter((i: { featured?: boolean }) => i.featured === true),
    ...insights.filter((i: { featured?: boolean }) => i.featured !== true),
  ];

  return (
    <>
      <PageHero
        title="Insights"
        description="Practical reading for CHROs, COOs, and global operations leaders."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {orderedInsights.map((insight: {
            slug: string;
            title: string;
            excerpt: string;
            coverImage: string;
            category: string;
          }) => (
            <Reveal key={insight.slug}>
              <Link
                href={`/insights/${insight.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 bg-surface">
                  <CmsImage
                    src={insight.coverImage}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {insight.category}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-navy">{insight.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{insight.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-accent">Read →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
