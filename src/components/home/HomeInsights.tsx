"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CmsImage } from "@/components/ui/CmsImage";

type InsightCard = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
};

export function HomeInsights({ insights }: { insights: InsightCard[] }) {
  if (!insights.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {insights.map((insight, i) => (
        <Reveal key={insight.slug} delay={i * 0.05}>
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
              <h3 className="mt-2 text-lg font-bold text-navy">{insight.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{insight.excerpt}</p>
              <span className="mt-4 text-sm font-semibold text-accent">Read →</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
