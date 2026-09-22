"use client";

import { Target, Receipt, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommercialPrinciple {
  icon: React.ElementType;
  text: string;
}

const principles: CommercialPrinciple[] = [
  {
    icon: Target,
    text: "Milestone-linked, not upfront-loaded — you pay as value is delivered",
  },
  {
    icon: Receipt,
    text: "Advisory fees itemized separately from third-party costs",
  },
  {
    icon: Eye,
    text: "Transparent scope-change process — no silent creep",
  },
  {
    icon: Sparkles,
    text: "Every model sized to the client, not discounted from an enterprise rate card",
  },
];

export function CommercialPrinciples({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mt-8 rounded-3xl border border-[#cddcd1] bg-white p-6 sm:p-8 shadow-lg shadow-navy/5",
        className
      )}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-[#b49339]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
          Commercial Principles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-2xl border border-transparent p-2 transition-all duration-200 hover:border-[#cddcd1]/50 hover:bg-[#f0f4f1]/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cddcd1] bg-[#edf5ef] text-[#2e3f33] shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#e2ede4]">
                <Icon className="h-5 w-5 text-[#2e3f33]" />
              </div>
              <p className="pt-1 text-xs sm:text-sm font-medium leading-relaxed text-navy">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
