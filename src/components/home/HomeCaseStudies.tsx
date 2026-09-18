"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type CaseItem = {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  result: string;
  metrics: { label: string; value: string }[];
  image: string;
};

export function HomeCaseStudies({ cases }: { cases: CaseItem[] }) {
  if (!cases.length) return null;

  return (
    <div className="space-y-6">
      {cases.map((cs, i) => (
        <Reveal key={cs.title} delay={i * 0.06}>
          <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-navy/10 md:grid md:grid-cols-2">
            <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px]">
              <Image
                src={cs.image}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-highlight">
                  {cs.industry}
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-wide text-white/75">
                  {cs.client}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">
                  {cs.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-col p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Challenge
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{cs.challenge}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                Result
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate">{cs.result}</p>
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {cs.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-[#e5ebe6] p-3.5 sm:p-4"
                  >
                    <p className="metric-number text-lg font-bold text-accent sm:text-xl md:text-2xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/customers"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                See more outcomes
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
