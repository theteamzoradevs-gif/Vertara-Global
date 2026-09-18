"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Rocket,
  ShieldCheck,
  UserCheck,
  MapPin,
  GitBranch,
  Building2,
  Sprout,
  Maximize2,
  Handshake,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TriggerStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const strengthItems: StrengthItem[] = [
  {
    number: "01",
    title: "Integrated Execution & Senior Judgment",
    icon: Link2,
    description:
      "Direct founder/practitioner engagement, no large delivery bureaucracy • One team, not multiple vendors • decisions made by GCC professionals",
  },
  {
    number: "02",
    title: "Speed to Deliver & Agility to Scale",
    icon: Rocket,
    description:
      "Launch in weeks, not quarters • scales pilot to capability hub • no re-architecture as headcount grows • Integrated execution (Strategy, legal, HR, tech)",
  },
  {
    number: "03",
    title: "Right-Sized Governance",
    icon: ShieldCheck,
    description:
      "Compliance scoped to a lean centre • controls built in from day one, not retrofitted • capability ownership, not just cost arbitrage.",
  },
  {
    number: "04",
    title: "Leadership-First Build",
    icon: UserCheck,
    description:
      "First 5 hires before the next 50 • senior hiring before scale hiring",
  },
  {
    number: "05",
    title: "Tier-2 City Fluency, Cost Economics",
    icon: MapPin,
    description:
      "Tier-2 cities (Coimbatore, Indore, Jaipur, Kochi etc.) — evaluated on equal footing with Bengaluru, Gurgaon & Hyderabad",
  },
  {
    number: "06",
    title: "Sector-Shaped Judgment",
    icon: GitBranch,
    description:
      "Engineering • Pharma • FMCG • Financial Services — same rigor, different starting point",
  },
];

const triggerSteps: TriggerStep[] = [
  {
    step: "01",
    title: "First-time entering India",
    icon: Building2,
    description: "Building your first India GCC",
  },
  {
    step: "02",
    title: "Scaling GCCs",
    icon: Sprout,
    description: "Cost centre → capability hub → innovation centre",
  },
  {
    step: "03",
    title: "Existing GCCs going Tier-2",
    icon: Maximize2,
    description: "Second location, without duplicating governance",
  },
  {
    step: "04",
    title: "Investor-backed firms",
    icon: Handshake,
    description: "Rapid, compliant scale",
  },
  {
    step: "05",
    title: "Digital-native businesses",
    icon: Cpu,
    description: "Expanding engineering, analytics or AI",
  },
];

export function WhereWereStrongest() {
  const [activeStrength, setActiveStrength] = useState(0);

  const currentStrength = strengthItems[activeStrength];
  const CurrentIcon = currentStrength.icon;

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl text-left"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1f3a] sm:text-4xl">
            Where We're Strongest Mid-Market GCCs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#526171] sm:text-lg">
            A GCC for a mid-market company needs different judgment than one for
            a Fortune 500 different pace, different budget discipline, different
            cities. This is the work we know best.
          </p>
        </motion.div>

        {/* Interactive 6-Point Selector Layout */}
        <div className="mt-10 md:mt-12">
          {/* Mobile Horizontal Pill Selector */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none lg:hidden -mx-4 px-4 sm:-mx-6 sm:px-6">
            {strengthItems.map((item, index) => {
              const isActive = activeStrength === index;
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveStrength(index)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200",
                    isActive
                      ? "bg-[#2e3f33] text-white shadow-sm"
                      : "bg-[#e5ebe6] text-[#2e3f33] hover:bg-[#d8e2da]"
                  )}
                >
                  <ItemIcon className={cn("h-3.5 w-3.5 stroke-[2.2]", isActive ? "text-[#b49339]" : "text-[#2e3f33]")} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* 2-Column Grid for Desktop & Content Panel for Mobile */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left Column (5 cols / ~42%): Separate Rounded Cards for Each Point */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="space-y-3">
                {strengthItems.map((item, index) => {
                  const isActive = activeStrength === index;
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveStrength(index)}
                      onMouseEnter={() => setActiveStrength(index)}
                      className={cn(
                        "group flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300",
                        isActive
                          ? "border-[#2e3f33] bg-[#e5ebe6] text-[#2e3f33] shadow-md shadow-[#2e3f33]/10 translate-x-1"
                          : "border-border bg-white text-[#0b1f3a] hover:border-[#2e3f33]/40 hover:bg-[#e5ebe6]/40"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                          isActive
                            ? "bg-[#2e3f33] text-[#b49339]"
                            : "bg-[#e5ebe6] text-[#2e3f33] group-hover:bg-[#2e3f33] group-hover:text-[#b49339]"
                        )}
                      >
                        <ItemIcon className="h-4 w-4 stroke-[2.2]" />
                      </span>
                      <span className="text-sm font-bold leading-snug sm:text-base">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column (7 cols / ~58%): Active Detailed Content Card (matching image 3) */}
            <div className="lg:col-span-7">
              <div className="relative flex min-h-[300px] sm:min-h-[330px] flex-col justify-between overflow-hidden rounded-3xl border border-[#3c5243] bg-[#2e3f33] p-7 sm:p-10 lg:p-12 shadow-lg text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStrength.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative z-10 flex h-full flex-col justify-between"
                  >
                    <div>
                      {/* Icon Badge (In place of number, matching image 3) */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b49339] shadow-inner">
                        <CurrentIcon className="h-6 w-6 stroke-[2.2] text-[#b49339]" />
                      </div>

                      {/* Heading */}
                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                        {currentStrength.title}
                      </h3>

                      {/* Detailed Content */}
                      <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/85">
                        {currentStrength.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-5 border-t border-white/10">
                      <Link
                        href="/contact"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b49339] px-6 py-3 text-sm font-bold text-[#0b1f3a] shadow-md transition hover:bg-white hover:text-[#2e3f33]"
                      >
                        Discuss Your GCC
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Cards Grid: CHOOSE VERTARA IF */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339] sm:text-sm">
              CHOOSE VERTARA IF
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {triggerSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 + index * 0.05 }}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:shadow-md"
                >
                  <div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e3f33] text-[#b49339] shadow-xs transition-colors">
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </span>

                    <h4 className="mt-4 text-sm font-bold leading-snug text-navy sm:text-base">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
