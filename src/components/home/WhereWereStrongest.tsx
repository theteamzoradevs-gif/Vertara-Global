"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Link2,
  Rocket,
  ShieldCheck,
  UserCheck,
  MapPin,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthItem {
  number: string;
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
      "Direct founder/practitioner engagement, no large delivery bureaucracy â€¢ One team, not multiple vendors â€¢ decisions made by GCC professionals",
  },
  {
    number: "02",
    title: "Speed to Deliver & Agility to Scale",
    icon: Rocket,
    description:
      "Launch in weeks, not quarters â€¢ scales pilot to capability hub â€¢ no re-architecture as headcount grows â€¢ Integrated execution (Strategy, legal, HR, tech)",
  },
  {
    number: "03",
    title: "Right-Sized Governance",
    icon: ShieldCheck,
    description:
      "Compliance scoped to a lean centre â€¢ controls built in from day one, not retrofitted â€¢ capability ownership, not just cost arbitrage.",
  },
  {
    number: "04",
    title: "Leadership-First Build",
    icon: UserCheck,
    description:
      "First 5 hires before the next 50 â€¢ senior hiring before scale hiring",
  },
  {
    number: "05",
    title: "Tier-2 City Fluency, Cost Economics",
    icon: MapPin,
    description:
      "Tier-2 cities (Coimbatore, Indore, Jaipur, Kochi etc.) â€” evaluated on equal footing with Bengaluru, Gurgaon & Hyderabad",
  },
  {
    number: "06",
    title: "Sector-Shaped Judgment",
    icon: GitBranch,
    description:
      "Engineering â€¢ Pharma â€¢ FMCG â€¢ Financial Services â€” same rigor, different starting point",
  },
];

export function WhereWereStrongest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [activeStrength, setActiveStrength] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Automatic slide after 1 second when visible and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;

    const timer = setInterval(() => {
      setActiveStrength((prev) => (prev + 1) % strengthItems.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [isInView, isHovered]);

  // Keep active pill centered in horizontal scroll on mobile without affecting window scroll
  useEffect(() => {
    if (pillsRef.current) {
      const container = pillsRef.current;
      const activeBtn = container.children[activeStrength] as HTMLElement;
      if (activeBtn) {
        const targetLeft =
          activeBtn.offsetLeft - (container.clientWidth - activeBtn.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeStrength]);

  const currentStrength = strengthItems[activeStrength];
  const CurrentIcon = currentStrength.icon;

  return (
    <section
      id="where-were-strongest"
      ref={containerRef}
      className="relative overflow-hidden border-t border-border bg-surface-elevated py-16 md:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Eyebrow + Title + Subtitle */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339] sm:text-sm">
            WHERE WE&apos;RE STRONGEST
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
            Where Vertara wins on execution
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            How we compare against generic consulting firms and offshore agencies
          </p>
        </div>
        {/* Interactive 6-Point Selector Layout */}
        <div className="mt-8 md:mt-10">
          {/* Mobile Horizontal Pill Selector */}
          <div className="w-full overflow-hidden mb-4 lg:hidden">
            <div
              ref={pillsRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
            >
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
                        ? "bg-[#2F3F34] text-white shadow-sm"
                        : "bg-[#e5ebe6] text-[#2F3F34] hover:bg-[#d8e2da]"
                    )}
                  >
                    <ItemIcon className={cn("h-3.5 w-3.5 stroke-[2.2]", isActive ? "text-[#b49339]" : "text-[#2F3F34]")} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Grid for Desktop & Content Panel for Mobile */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* Left Column (5 cols / ~42%): Separate Rounded Cards for Each Point */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-2.5">
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
                        ? "border-[#2F3F34] bg-[#e5ebe6] text-[#2F3F34] shadow-md shadow-[#2F3F34]/10 translate-x-1"
                        : "border-border bg-white text-[#0b1f3a] hover:border-[#2F3F34]/40 hover:bg-[#e5ebe6]/40"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isActive
                          ? "bg-[#2F3F34] text-[#b49339]"
                          : "bg-[#e5ebe6] text-[#2F3F34] group-hover:bg-[#2F3F34] group-hover:text-[#b49339]"
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

            {/* Right Column (7 cols / ~58%): Active Detailed Content Card with Auto-Slide Horizontal Animation */}
            <div className="lg:col-span-7">
              <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-[#3c5243] bg-[#2F3F34] p-6 sm:p-8 lg:p-10 shadow-lg text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStrength.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex h-full flex-col justify-between"
                  >
                    <div>
                      {/* Icon Badge */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b49339] shadow-inner">
                        <CurrentIcon className="h-6 w-6 stroke-[2.2] text-[#b49339]" />
                      </div>

                      {/* Heading */}
                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {currentStrength.title}
                      </h3>

                      {/* Detailed Content */}
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85">
                        {currentStrength.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-5 border-t border-white/10">
                      <Link
                        href="/contact"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b49339] px-6 py-3 text-sm font-bold text-[#0b1f3a] shadow-md transition hover:bg-white hover:text-[#2F3F34]"
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
      </div>
    </section>
  );
}
