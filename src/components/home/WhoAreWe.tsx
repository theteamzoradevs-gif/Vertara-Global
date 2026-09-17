"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Layers, Wrench, LayoutGrid, Compass } from "lucide-react";

const credibilityCards = [
  {
    title: "Founded by GCC builders",
    description:
      "ex-KPMG, Rio Tinto leaders who built GCC from the ground up; 6 sectors, 10 GCC builds",
  },
  {
    title: "50+ years of GCC experience",
    description:
      "from business strategy, feasibility to steady-state operations",
  },
  {
    title: "Practitioner DNA",
    description:
      "Lived the GCC journey, solved practical problems not just advised on it",
  },
];

const pillars = [
  {
    icon: Layers,
    title: "Operator mindset",
    description:
      "Focused on driving decision, implementation, and delivering results; not just recommendations.",
  },
  {
    icon: Wrench,
    title: "Sector-led, function-driven approach",
    description:
      "Tailored solutions for sectors and functions; we bring expertise specific to requirements",
  },
  {
    icon: LayoutGrid,
    title: "India execution experts",
    description:
      "Our proprietary model brings location advantage - tier-1, tier 2 cities, expert talent, cost, scale, legal framework and future proofing delivery centres",
  },
  {
    icon: Compass,
    title: "Integrated delivery",
    description:
      "One team across strategy, legal, hiring, technology transformation and operational readiness.",
  },
];

export function WhoAreWe({
  image = "/images/who we are.jpeg",
}: {
  image?: string;
}) {
  return (
    <section id="who-are-we" className="relative overflow-hidden bg-surface-elevated py-16 md:py-20 border-t border-border">
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Section: Title & Small Cards on Left, Office Photo on Right */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          {/* Left Column (7 cols on desktop) */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <Reveal>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy">
                    VERTARA <span className="text-[#c8923a]">global</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    GCC Advisory
                  </span>
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
                  Who are we
                </h2>

                <p className="mt-2 text-sm font-medium text-slate sm:text-base md:text-lg">
                  Practitioner-led GCC advisory — built by operators, not consultants
                </p>
              </div>
            </Reveal>

            {/* Small Compact Credibility Cards Row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {credibilityCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-xl border border-[#ded8cb] bg-[#ece8de] p-3.5 sm:p-4 text-navy shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ba8e2d]/60 hover:bg-[#edeae0] hover:shadow-xs">
                    <h3 className="text-xs font-bold leading-snug text-navy sm:text-sm">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols on desktop): Office Photo */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12} className="h-full">
              <div className="relative h-64 min-h-[250px] w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:h-72 lg:h-full lg:min-h-[260px]">
                <Image
                  src={image}
                  alt="Vertara Global practitioner team in modern capability centre office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-left"
                  priority={false}
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Value Proposition Dark Banner */}
        <Reveal delay={0.18}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1b3d32] bg-[#162f27] px-6 py-4.5 text-center text-white shadow-lg sm:px-8 sm:py-5">
            <p className="text-sm font-semibold leading-relaxed tracking-wide sm:text-base md:text-lg">
              Our Value Proposition, A partner who owns the whole journey—from business case to operating GCC.
            </p>
          </div>
        </Reveal>

        {/* Bottom 4 Pillar Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={0.15 + i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#c8923a]/50 hover:shadow-md">
                  {/* Circular Golden/Ochre Icon Container */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ba8e2d] text-white shadow-xs">
                    <Icon className="h-5 w-5 text-white stroke-[2.2]" />
                  </div>

                  <h4 className="mt-4 text-base font-bold text-navy">
                    {pillar.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
