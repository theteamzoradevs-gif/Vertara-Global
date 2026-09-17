"use client";

import { Reveal } from "@/components/ui/Reveal";
import { FlowThreads } from "@/components/ui/FlowThreads";
import {
  Search,
  PenTool,
  Flag,
  Wrench,
  TrendingUp,
  LineChart,
  Compass,
  Shield,
  Users,
  Zap,
  Monitor,
  Layers,
} from "lucide-react";

const stages = [
  { number: "01", name: "Discover", icon: Search },
  { number: "02", name: "Design", icon: PenTool },
  { number: "03", name: "Build", icon: Flag },
  { number: "04", name: "Operate / Scale", icon: Wrench },
  { number: "05", name: "Transfer", icon: TrendingUp },
  { number: "06", name: "Monitor", icon: LineChart },
];

const capabilityCards = [
  {
    icon: Compass,
    title: "GCC Strategy & Design",
    deliverables:
      "Business case • mandate & scope • location strategy • operating model • service catalogue • transition roadmap",
  },
  {
    icon: Shield,
    title: "Legal & Entity Setup",
    deliverables:
      "Entity / structure coordination • statutory setup • contracts • compliance framework • governance model",
  },
  {
    icon: Users,
    title: "HR & Staffing",
    deliverables:
      "Org design • leadership hiring • talent strategy • workforce planning • recruitment support • onboarding",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    deliverables:
      "Process redesign • automation • data & analytics • digital operating model • transformation roadmap",
  },
  {
    icon: Monitor,
    title: "IT & Technology",
    deliverables:
      "Technology strategy • IT operating model • architecture • workplace technology • cybersecurity & support",
  },
  {
    icon: Layers,
    title: "CoE / Shared Services Build",
    deliverables:
      "Functional CoE design • transition • SOPs • SLAs / KPIs • vendor ecosystem • continuous improvement",
  },
];

export function JourneySteps() {
  return (
    <section id="journey" className="relative overflow-hidden bg-surface py-16 md:py-24 border-t border-border">
      <FlowThreads intensity="light" className="opacity-20" />

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl">
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
                The Vertara GCC build model
              </h2>

              <p className="mt-2 text-sm font-medium text-slate sm:text-base md:text-lg">
                One integrated journey with clear ownership at every stage.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Governance Callout Box */}
        <Reveal delay={0.08}>
          <div className="mt-8 rounded-2xl border border-[#ded8cb] bg-[#ece8de] px-6 py-4 text-center shadow-xs sm:px-8 sm:py-4.5">
            <p className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
              Each stage has a named owner, defined deliverables and a clear handover into the next — nothing moves forward until the gate is met.
            </p>
          </div>
        </Reveal>

        {/* 6-Stage Timeline Stepper */}
        <Reveal delay={0.14}>
          <div className="mt-12">
            {/* Desktop / Tablet Connected Stepper */}
            <div className="relative hidden md:block">
              {/* Connecting Line */}
              <div
                className="absolute left-[8%] right-[8%] top-[3.35rem] h-0.5 bg-[#c8923a]/50"
                aria-hidden
              />

              <div className="relative grid grid-cols-6 gap-3">
                {stages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.number}
                      className="group flex flex-col items-center text-center"
                    >
                      {/* Number Above Circle */}
                      <span className="mb-2 text-xs font-bold tracking-wider text-[#b45309]">
                        {stage.number}
                      </span>

                      {/* Circle Icon Badge */}
                      <div className="relative z-[1] flex h-[4.25rem] w-[4.25rem] lg:h-[4.6rem] lg:w-[4.6rem] items-center justify-center rounded-full bg-[#1e2f27] text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-7 w-7 lg:h-8 lg:w-8 text-white stroke-[2.2]" />
                      </div>

                      {/* Stage Name */}
                      <p className="mt-3 text-sm font-bold text-navy sm:text-base">
                        {stage.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Responsive Grid Stepper */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
              {stages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.number}
                    className="flex flex-col items-center rounded-2xl border border-border bg-white p-4 text-center shadow-xs"
                  >
                    <span className="text-xs font-bold text-[#b45309]">
                      {stage.number}
                    </span>
                    <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e2f27] text-white shadow-xs">
                      <Icon className="h-5 w-5 text-white stroke-[2.2]" />
                    </div>
                    <p className="mt-2 text-xs font-bold text-navy">
                      {stage.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Bottom 6 Functional Capability Domain Cards (2x3 Grid) */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={0.18 + i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-[#ded8cb] bg-[#ece8de] p-5 sm:p-6 text-navy shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#ba8e2d]/60 hover:bg-[#edeae0] hover:shadow-md">
                  {/* Icon & Title Header */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ba8e2d] text-white shadow-xs">
                      <Icon className="h-5 w-5 text-white stroke-[2.2]" />
                    </div>
                    <h3 className="text-sm font-bold text-navy sm:text-base">
                      {card.title}
                    </h3>
                  </div>

                  {/* Bullet / Scope Description */}
                  <p className="mt-3.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                    {card.deliverables}
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
