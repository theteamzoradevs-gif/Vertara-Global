"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  ShoppingBag,
  FlaskConical,
  Bed,
  Mountain,
  Brain,
  ShieldCheck,
  Factory,
} from "lucide-react";

interface SectorCard {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const sectors: SectorCard[] = [
  {
    title: "Engineering & ER&D",
    icon: Cpu,
    items: [
      "Product engineering",
      "R&D",
      "software simulation",
      "AI",
      "Architectural Design",
    ],
  },
  {
    title: "FMCG & Retail",
    icon: ShoppingBag,
    items: [
      "Consumer analytics",
      "merchandising",
      "supply chain",
      "marketing",
      "e-commerce",
    ],
  },
  {
    title: "Healthcare & Life Sciences",
    icon: FlaskConical,
    items: [
      "R&D",
      "regulatory",
      "clinical",
      "medical affairs",
      "patient analytics AI",
      "cyber",
    ],
  },
  {
    title: "Travel, Leisure, Hospitality",
    icon: Bed,
    items: [
      "Reservations",
      "loyalty platforms",
      "guest analytics",
      "revenue reporting",
    ],
  },
  {
    title: "Mining & Metals",
    icon: Mountain,
    items: [
      "Asset analytics",
      "engineering",
      "procurement",
      "ESG/HSE data",
    ],
  },
  {
    title: "Tech, AI and Services",
    icon: Brain,
    items: [
      "GenAI/LLM engineering",
      "ML Ops",
      "applied research",
      "data platforms",
    ],
  },
  {
    title: "Wealth Management, PE, Insurance",
    icon: ShieldCheck,
    items: [
      "Fund, portfolio operations",
      "actuarial support",
      "client reporting, compliance",
      "investment, equity research, ops",
    ],
  },
  {
    title: "Manufacturing",
    icon: Factory,
    items: [
      "Supply chain & procurement",
      "plant operations analytics",
      "industrial IoT",
      "quality & compliance",
    ],
  },
];

export function OurExpertise() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1f3a] sm:text-4xl">
            Our Expertise
          </h2>
          <p className="mt-2 text-base text-[#526171] sm:text-lg">
            We go deep in the sectors, and we size every engagement accordingly.
          </p>
        </div>

        {/* Section Subheading */}
        <div className="my-10 text-center md:my-12">
          <h3 className="text-xl font-bold tracking-tight text-[#0b1f3a] md:text-2xl">
            Sector Depth
          </h3>
        </div>

        {/* 8-Card Grid (4 cols x 2 rows on desktop) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#ded8cb] bg-[#ece8de] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b49339]/50 hover:shadow-md"
              >
                <div>
                  {/* Top Header inside Card with dark circular icon badge */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f3a] shadow-inner">
                      <Icon className="h-5 w-5 text-white stroke-[2.2]" />
                    </div>
                    <h4 className="text-sm font-bold leading-snug text-[#0b1f3a] md:text-base">
                      {sector.title}
                    </h4>
                  </div>

                  {/* Bullet / dot separated items */}
                  <p className="mt-4 text-xs font-normal leading-relaxed text-[#4b5563] sm:text-sm">
                    {sector.items.join(" • ")}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
