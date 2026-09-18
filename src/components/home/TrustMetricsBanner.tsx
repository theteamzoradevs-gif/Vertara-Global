"use client";

import { CheckCircle2 } from "lucide-react";
import { MetricCounter } from "@/components/ui/MetricCounter";
import type { Metric } from "@/data/seed-content";

type Props = {
  metrics: Metric[];
};

export function TrustMetricsBanner({ metrics }: Props) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="relative z-10 w-full border-b border-[#254d3e] bg-[#2e3f33] pt-3.5 pb-4 sm:pt-4 sm:pb-4.5 md:pt-4 md:pb-5 shadow-sm text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Grid: Stacked number on top, description on bottom */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-x-8 md:grid-cols-4 md:gap-x-10">
          {metrics.slice(0, 4).map((m) => (
            <div
              key={m.label}
              className="flex items-start gap-2 sm:gap-2.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b49339] sm:h-4.5 sm:w-4.5" />
              <div className="flex flex-col">
                <MetricCounter
                  value={m.value}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight"
                />
                <span className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#d1e0d7] leading-tight">
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
