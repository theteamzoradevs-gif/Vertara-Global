"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Layers, Wrench, LayoutGrid, Compass } from "lucide-react";

const credibilityPoints = [
  {
    number: "01",
    title: "Founded by GCC builders",
    description:
      "Ex-KPMG, Rio Tinto leaders who built GCC from the ground up; 6 sectors, 10 GCC builds",
  },
  {
    number: "02",
    title: "50+ years of GCC experience",
    description:
      "From business strategy, feasibility to steady state operations",
  },
  {
    number: "03",
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
        {/* Section Header: Eyebrow + Title + Subtitle */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
              Our Foundation
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
              Who are we
            </h2>

            <p className="mt-2 text-sm font-medium text-slate sm:text-base md:text-lg">
              Practitioner led GCC advisory, built by operators, not consultants
            </p>
          </div>
        </Reveal>

        {/* Content Grid: 01/02/03 Editorial on Left, Office Photo on Right */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left Column (7 cols on desktop): Editorial Numbered Layout */}
          <div className="lg:col-span-7">
            <div className="space-y-6 sm:space-y-7">
              {credibilityPoints.map((item, i) => (
                <div key={item.number} className="cursor-default">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Number 01 / 02 / 03 - Constant Golden */}
                    <motion.span
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.12 + i * 0.12,
                        ease: "easeOut",
                      }}
                      className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#b49339] shrink-0 w-8 sm:w-10 select-none pt-0.5"
                    >
                      {item.number}
                    </motion.span>

                    {/* Text block */}
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: 0.16 + i * 0.12,
                          ease: "easeOut",
                        }}
                        className="text-base sm:text-lg font-bold text-navy tracking-tight"
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: 0.2 + i * 0.12,
                          ease: "easeOut",
                        }}
                        className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols on desktop): Office Photo */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <Image
                  src={image}
                  alt="Vertara Global practitioner team in modern capability centre office"
                  width={562}
                  height={360}
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 45vw, 480px"
                  className="h-auto w-full rounded-2xl object-cover"
                  priority={false}
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Value Proposition Pine Green Banner */}
        <Reveal delay={0.18}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#3c5243] bg-[#2e3f33] px-6 py-4.5 text-center text-white shadow-md sm:px-8 sm:py-5">
            <p className="text-sm font-semibold leading-relaxed tracking-wide sm:text-base md:text-lg">
              Our Value Proposition, A partner who owns the whole journey from business case to operating GCC.
            </p>
          </div>
        </Reveal>

        {/* Bottom 4 Pillar Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={0.15 + i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:shadow-md">
                  {/* Circular Dark Green Icon Container */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2e3f33] text-white shadow-xs">
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
