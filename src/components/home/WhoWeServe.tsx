"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Brain,
  Globe2,
  Landmark,
  Rocket,
  UsersRound,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const audiences = [
  {
    id: "enterprise",
    title: "Global enterprises",
    blurb: "Standing up or scaling a captive India centre with clear ownership.",
    detail:
      "You need one accountable partner across talent, floors, and ops — not a patchwork of vendors that drift after the kickoff deck.",
    icon: Building2,
  },
  {
    id: "bfsi",
    title: "BFSI & regulated firms",
    blurb: "Controls, audit trails, and leadership that survive scrutiny.",
    detail:
      "We sequence compliance, EOR bridges, and process design so your hub is productive without compromising parent-bank or insurer standards.",
    icon: Landmark,
  },
  {
    id: "product",
    title: "Product & digital orgs",
    blurb: "Engineering and product GCCs that stay culturally close to HQ.",
    detail:
      "Leadership-first hiring, workspace timed to waves, and delivery rhythm that feels like an extension of your core product org.",
    icon: Rocket,
  },
  {
    id: "ai",
    title: "AI / data-heavy teams",
    blurb: "Specialist pipelines in India’s deep tech talent markets.",
    detail:
      "City mix, role architecture, and employer brand shaped for scarce skills — so you don’t lose six months hiring the wrong profiles.",
    icon: Brain,
  },
  {
    id: "scaleup",
    title: "Scaling mid-market firms",
    blurb: "First India capability without overbuilding entity too early.",
    detail:
      "Flexible and build-transfer paths let you prove the model, then move to captive ownership when headcount and confidence justify it.",
    icon: UsersRound,
  },
  {
    id: "global-ops",
    title: "Global operations leaders",
    blurb: "CHROs, COOs, and centre heads who own the outcome.",
    detail:
      "Board-ready cases, milestone calendars, and a single operating rhythm — so India capability is a programme, not a side project.",
    icon: Globe2,
  },
];

export function WhoWeServe() {
  const [active, setActive] = useState(audiences[0].id);
  const current = audiences.find((a) => a.id === active) ?? audiences[0];
  const Icon = current.icon;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
      <div className="grid gap-3 sm:grid-cols-2">
        {audiences.map((a) => {
          const I = a.icon;
          const isOn = active === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onMouseEnter={() => setActive(a.id)}
              onFocus={() => setActive(a.id)}
              onClick={() => setActive(a.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-all duration-300",
                isOn
                  ? "border-accent bg-accent-soft shadow-md shadow-accent/10"
                  : "border-border bg-white hover:border-accent/40",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg transition",
                  isOn ? "bg-navy text-highlight" : "bg-accent-soft text-accent",
                )}
              >
                <I className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-bold text-navy">{a.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{a.blurb}</p>
            </button>
          );
        })}
      </div>

      <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-highlight/15 blur-2xl" />
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-highlight">
          <Icon className="h-6 w-6" />
        </span>
        <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
          Who this is for
        </p>
        <h3 className="relative mt-2 text-2xl font-bold">{current.title}</h3>
        <p className="relative mt-4 flex-1 text-sm leading-relaxed text-white/80 md:text-base">
          {current.detail}
        </p>
        <Link
          href="/contact"
          className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-highlight px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white"
        >
          Talk through your case
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
