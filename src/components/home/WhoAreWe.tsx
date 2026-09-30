"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const credibilityPoints = [
  {
    number: "01",
    title: "Founded by GCC builders",
    description:
      "Leaders from a Big 4 firm and one of the world’s largest mining companies who built GCCs from the ground up; 6 sectors, 10 GCC builds",
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

export function WhoAreWe() {
  return (
    <section
      id="who-are-we"
      className="relative overflow-hidden bg-surface-elevated py-16 md:py-20 border-t border-border"
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Eyebrow + Title + Subtitle */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
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

        {/* Content Grid: Editorial 01/02/03 Layout */}
        <div className="mt-8">
          <div className="max-w-4xl">
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
                      className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#B59439] shrink-0 w-8 sm:w-10 select-none pt-0.5"
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
        </div>
      </div>
    </section>
  );
}