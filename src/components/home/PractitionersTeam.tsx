"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { practitionersTeam } from "@/data/practitioners-team";

export function PractitionersTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 text-[#0b1f3a]">
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[#0b1f3a] sm:text-4xl md:text-5xl">
            Led by practitioners. Built to grow.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#526171] sm:text-lg">
            Strategy, GCC execution and shared services under one senior-led
            platform — with the bench expanding across practice areas.
          </p>
        </div>

        {/* Alternating Leaders List matching 2nd image */}
        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {practitionersTeam.map((leader, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={cn(
                  "flex flex-col items-center justify-center gap-8 md:gap-14 lg:gap-20",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Large Circular Avatar with Outer Ring Border */}
                <div className="relative shrink-0">
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#0b1f3a] bg-white p-2.5 shadow-sm transition-transform duration-300 hover:scale-105 sm:h-44 sm:w-44 md:h-48 md:w-48">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100">
                      {leader.image ? (
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className={cn("object-cover", leader.imagePosition || "object-[center_12%]")}
                          sizes="(max-width: 768px) 176px, 192px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#b49339]">
                          {leader.initials}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Content: Name, Role & Bio Paragraph */}
                <div className="w-full flex-1 max-w-lg text-left">
                  <h3 className="text-2xl font-bold tracking-tight text-[#0b1f3a] sm:text-3xl">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#b49339] sm:text-base">
                    {leader.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#475569] sm:text-base md:text-lg">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Mandate Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#3c5243] bg-[#2e3f33] px-6 py-5 sm:flex-row sm:px-8 sm:py-6 shadow-md"
        >
          <p className="text-center text-base font-bold text-white sm:text-left md:text-lg">
            Let's build the right GCC and build it to last.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#b49339] px-6 py-2.5 text-sm font-bold text-[#0b1f3a] shadow-sm transition-all hover:bg-[#c4a44b] hover:shadow-md whitespace-nowrap"
          >
            <span>Discuss your GCC mandate</span>
            <Mail className="h-4 w-4 stroke-[2.4]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

