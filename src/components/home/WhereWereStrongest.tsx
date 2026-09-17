"use client";

import { motion } from "framer-motion";
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

interface StrengthCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TriggerCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const strengthCards: StrengthCard[] = [
  {
    title: "Integrated Execution & Senior Judgment",
    icon: Link2,
    description:
      "Direct founder/practitioner engagement, no large delivery bureaucracy • One team, not multiple vendors • decisions made by GCC professionals",
  },
  {
    title: "Speed to Deliver & Agility to Scale",
    icon: Rocket,
    description:
      "Launch in weeks, not quarters • scales pilot to capability hub • no re-architecture as headcount grows • Integrated execution (Strategy, legal, HR, tech)",
  },
  {
    title: "Right-Sized Governance",
    icon: ShieldCheck,
    description:
      "Compliance scoped to a lean centre • controls built in from day one, not retrofitted • capability ownership, not just cost arbitrage.",
  },
  {
    title: "Leadership-First Build",
    icon: UserCheck,
    description:
      "First 5 hires before the next 50 • senior hiring before scale hiring",
  },
  {
    title: "Tier-2 City Fluency, cost economics",
    icon: MapPin,
    description:
      "Tier-2 cities (Coimbatore, Indore, Jaipur, Kochi etc.) — evaluated on equal footing with Bengaluru, Gurgaon & Hyderabad",
  },
  {
    title: "Sector-Shaped Judgment",
    icon: GitBranch,
    description:
      "Engineering • Pharma • FMCG • Financial Services — same rigor, different starting point",
  },
];

const triggerCards: TriggerCard[] = [
  {
    title: "First-time entering India",
    icon: Building2,
    description: "Building your first India GCC",
  },
  {
    title: "Scaling GCCs",
    icon: Sprout,
    description: "Cost centre → capability hub → innovation centre",
  },
  {
    title: "Existing GCCs going Tier-2",
    icon: Maximize2,
    description: "Second location, without duplicating governance",
  },
  {
    title: "Investor-backed firms",
    icon: Handshake,
    description: "Rapid, compliant scale",
  },
  {
    title: "Digital-native businesses",
    icon: Cpu,
    description: "Expanding engineering, analytics or AI",
  },
];

export function WhereWereStrongest() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1f3a] sm:text-4xl">
            Where We're Strongest — Mid-Market GCCs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#526171] sm:text-lg">
            A GCC for a mid-market company needs different judgment than one for
            a Fortune 500 — different pace, different budget discipline, different
            cities. This is the work we know best.
          </p>
        </div>

        {/* 6 Strength Cards (2 rows of 3 columns) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {strengthCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#ded8cb] bg-[#ece8de] p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8923a]/50 hover:shadow-md"
              >
                <div>
                  {/* Card Title & Dark Icon Badge */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f3a] shadow-inner">
                      <Icon className="h-5 w-5 text-white stroke-[2.2]" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-[#0b1f3a] md:text-base">
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="mt-4 text-xs font-normal leading-relaxed text-[#4b5563] sm:text-sm">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section: CHOOSE VERTARA IF */}
        <div className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba8e2d] sm:text-sm">
            CHOOSE VERTARA IF
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {triggerCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#1f4337] bg-[#162f27] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ba8e2d]/60 hover:shadow-lg hover:shadow-[#162f27]/20"
                >
                  <div>
                    {/* Top Row: Icon & Title */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-[#c8923a]">
                        <Icon className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      <h4 className="text-sm font-bold leading-snug text-white">
                        {card.title}
                      </h4>
                    </div>

                    {/* Subtext */}
                    <p className="mt-3 text-xs leading-relaxed text-[#b4cec3]">
                      {card.description}
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
