"use client";

import { cn } from "@/lib/utils";

type HoverStatCardProps = {
  stat: string;
  title: string;
  detail: string;
  hint?: string;
  className?: string;
};

/** Soft fill + border shift on hover — used for Why-GCC and similar signal cards */
export function HoverStatCard({
  stat,
  title,
  detail,
  hint = "We model this into your business case — not as a slogan, as a decision input.",
  className,
}: HoverStatCardProps) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-white p-5 transition-all duration-350 sm:p-6",
        "hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-accent-soft via-accent-soft/70 to-white transition-transform duration-500 ease-out group-hover:scale-y-100"
      />
      <div className="relative">
        <p className="metric-number text-3xl font-bold text-accent transition duration-300 group-hover:scale-[1.03] group-hover:text-accent-hover sm:text-4xl">
          {stat}
        </p>
        <h3 className="mt-3 text-base font-bold text-navy sm:text-lg">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>
        <p className="mt-3 max-h-0 overflow-hidden text-sm text-slate opacity-0 transition-all duration-400 group-hover:max-h-28 group-hover:opacity-100">
          {hint}
        </p>
      </div>
    </div>
  );
}
