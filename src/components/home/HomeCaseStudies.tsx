"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Clock, BarChart3 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

function slugifyCaseStudy(title: string): string {
  return (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type CaseItem = {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  approach?: string;
  result: string;
  metrics: { label: string; value: string }[];
  image?: string;
  slug?: string;
};

export function HomeCaseStudies({ cases }: { cases: CaseItem[] }) {
  if (!cases.length) return null;

  return (
    <div className="space-y-8">
      {cases.map((cs, i) => {
        const caseSlug = cs.slug || slugifyCaseStudy(cs.title);
        return (
          <Reveal key={cs.title} delay={i * 0.06}>
            <article className="relative overflow-hidden rounded-3xl border border-[#b49339]/35 bg-[#0e3621] text-white shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Right-aligned Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={cs.image?.trim() || "/images/gcc-floor.webp"}
                  alt={cs.title || "Featured Case Study"}
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
                    Featured Story
                  </span>
                </div>

                {/* Industry Eyebrow */}
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                  {cs.industry || "RETAIL / DIGITAL"}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] leading-tight">
                  <Link href={`/case-studies/${caseSlug}`} className="hover:underline">
                    {cs.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base font-normal">
                  {cs.result || cs.challenge || "From zero to a fully operational engineering centre in 10 months, enabling faster innovation and scalable product delivery."}
                </p>

                {/* Read full case study CTA */}
                <div className="mt-6 sm:mt-7">
                  <Button href={`/case-studies/${caseSlug}`} variant="gold" size="lg" className="font-semibold shadow-md">
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {/* Metrics Bar */}
                {cs.metrics && cs.metrics.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-white/20 bg-[#0d3320]/75 backdrop-blur-md p-4 sm:p-5 sm:mt-10 shadow-lg">
                    <div className="grid grid-cols-1 gap-4 divide-y divide-white/20 sm:grid-cols-3 sm:gap-0 sm:divide-y-0 sm:divide-x">
                      {cs.metrics.map((m, idx) => {
                        let Icon = Users;
                        const labelLower = (m.label || "").toLowerCase();
                        if (
                          idx === 0 ||
                          labelLower.includes("headcount") ||
                          labelLower.includes("team") ||
                          labelLower.includes("specialist")
                        ) {
                          Icon = Users;
                        } else if (
                          idx === 1 ||
                          labelLower.includes("time") ||
                          labelLower.includes("launch") ||
                          labelLower.includes("cohort")
                        ) {
                          Icon = Clock;
                        } else {
                          Icon = BarChart3;
                        }

                        return (
                          <div
                            key={m.label}
                            className="flex items-center gap-3.5 px-3 pt-3 sm:pt-0 first:pt-0 first:pl-2 last:pr-2"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b49339]/50 bg-[#b49339]/20 text-[#c89d3c] shadow-xs">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xl font-bold tracking-tight text-white sm:text-2xl leading-none">
                                {m.value}
                              </p>
                              <p className="mt-1 text-xs font-medium text-white/80 leading-snug">
                                {m.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
