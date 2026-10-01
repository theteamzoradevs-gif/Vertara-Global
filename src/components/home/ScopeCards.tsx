"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";
import { cn } from "@/lib/utils";

type ScopeItem = {
  number: string;
  tag: string;
  title: string;
  frontText: string;
  backTitle: string;
  backDetail: string;
  ctaText: string;
  ctaHref: string;
};

const scopeItems: ScopeItem[] = [
  {
    number: "01",
    tag: "NANO GCC",
    title: "Nano GCC (20–100 people)",
    frontText:
      "Launched fast, governed properly from day one, modeled to break even in 12–18 months.",
    backTitle: "Nano GCC (20–100 people)",
    backDetail:
      "The right entry point when the priority is proving the model before scaling. Governed properly from day one, modeled to break even in 12–18 months.",
    ctaText: "Explore",
    ctaHref: "/offerings#nano-gcc",
  },
  {
    number: "02",
    tag: "MID-SCALE GCC",
    title: "Mid-scale GCC (100–500 people)",
    frontText:
      "A full capability hub built with the same leadership-first, right-sized-governance discipline.",
    backTitle: "Mid-scale GCC (100–500 people)",
    backDetail:
      "A full capability hub built with leadership-first discipline, for companies ready to commit to scale from the start.",
    ctaText: "Explore",
    ctaHref: "/offerings#mid-scale-gcc",
  },
  {
    number: "03",
    tag: "BOTH SCOPES",
    title: "Both scopes",
    frontText:
      "One to several functions proven and expanded, with a clear path to grow headcount.",
    backTitle: "Both scopes",
    backDetail:
      "One to several functions proven and expanded, with a clear path to grow headcount without re-architecting the entity, governance or systems.",
    ctaText: "Explore",
    ctaHref: "/offerings#build-model",
  },
  {
    number: "04",
    tag: "PROPRIETARY RESEARCH",
    title: "Backed by our own research",
    frontText:
      "Empirical playbooks and benchmark data across mid-market GCC builds in India.",
    backTitle: "Backed by our own research",
    backDetail:
      "Backed by our own research: see the Nano GCC paper series on Insights for frameworks and benchmarks.",
    ctaText: "Explore",
    ctaHref: "/insights",
  },
];

function ScopeCardItem({ item }: { item: ScopeItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-[280px] [perspective:1200px] sm:h-[295px] w-full"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front — White card on light green section */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#cddcd1] bg-white p-5 sm:p-6 shadow-sm [backface-visibility:hidden]">
          <div>
            {/* Top Bar: Number & Tag */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#B59439]">
                {item.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B59439] bg-[#F9F8F5] px-2 py-0.5 rounded border border-[#E8E4D9]">
                {item.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-3.5 text-base sm:text-lg font-bold tracking-tight text-[#101C30] leading-snug">
              {item.title}
            </h3>

            {/* Front Description */}
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#101C30]/80">
              {item.frontText}
            </p>
          </div>

          {/* Bottom Area: Hover To Explore */}
          <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#2F3F34]">
            <span className="hidden sm:inline">Hover To Explore</span>
            <button
              type="button"
              className="sm:hidden underline underline-offset-2"
              onClick={() => setFlipped(true)}
            >
              Tap To Explore
            </button>
            <span className="text-sm font-bold leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>

        {/* Back — Forest Green #2F3F34 card when hovered */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2F3F34] bg-[#2F3F34] p-5 sm:p-6 text-white shadow-xl shadow-black/25 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#C5A55D]">
                {item.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5A55D] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                {item.tag}
              </span>
            </div>

            <h3 className="mt-3 text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {item.backTitle}
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/85">
              {item.backDetail}
            </p>
          </div>

          <div className="pt-3 flex items-center gap-2">
            <Link
              href={item.ctaHref}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#B59439] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9c7e2d]"
            >
              <span>{item.ctaText}</span>
              <span className="text-sm leading-none">→</span>
            </Link>
            <button
              type="button"
              className="sm:hidden rounded-lg border border-white/25 px-2.5 py-2 text-xs text-white/80"
              onClick={() => setFlipped(false)}
            >
              ←
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScopeCards() {
  return (
    <MobileAutoSlider
      autoSlideInterval={3500}
      desktopClassName="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
      itemClassName="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col h-full"
      dotTone="gold"
    >
      {scopeItems.map((item) => (
        <ScopeCardItem key={item.number} item={item} />
      ))}
    </MobileAutoSlider>
  );
}
