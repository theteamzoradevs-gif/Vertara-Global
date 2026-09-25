"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CmsImage } from "@/components/ui/CmsImage";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

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
    <div className="space-y-8">
      {insights.map((insight, i) => (
        <Reveal key={insight.slug} delay={i * 0.05}>
          <article className="relative overflow-hidden rounded-3xl border border-[#b49339]/35 bg-[#0e3621] text-white shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Right-aligned Background Image */}
            <div className="absolute inset-0">
              <CmsImage
                src={insight.coverImage?.trim() || "/images/gcc-ops.png"}
                alt={insight.title || "Featured Insight"}
                fill
                className="object-cover object-right"
                sizes="(max-width: 1200px) 100vw, 1200px"
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
                {insight.category || "PERSPECTIVE"}
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
  );
}
