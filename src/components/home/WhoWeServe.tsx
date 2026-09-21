"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Cpu,
  ShoppingBag,
  FlaskConical,
  Bed,
  ShieldCheck,
  Factory,
  Building2,
  Landmark,
  Mountain,
  Brain,
  UsersRound,
  Globe2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const allCards = [
  // Page 1: Sector Verticals (Cards 1–6)
  {
    id: "engineering",
    category: "sector",
    title: "Engineering & ER&D",
    blurb: "Product engineering, R&D, software simulation, AI, Architectural Design",
    detail:
      "Specialized engineering and R&D pipelines, software simulation capabilities, and architectural design CoEs built for high-precision global engineering mandates.",
    icon: Cpu,
  },
  {
    id: "fmcg",
    category: "sector",
    title: "FMCG & Retail",
    blurb: "Consumer analytics, merchandising, supply chain, marketing, e-commerce",
    detail:
      "Data-driven retail and FMCG operations, consumer analytics hubs, end-to-end supply chain optimization, merchandising systems, and omnichannel digital commerce.",
    icon: ShoppingBag,
  },
  {
    id: "healthcare",
    category: "sector",
    title: "Healthcare & Life Sciences",
    blurb: "R&D, regulatory, clinical, medical affairs, patient analytics AI, cyber",
    detail:
      "Compliant life sciences hubs with rigorous regulatory data handling, clinical trials support, medical affairs operations, and patient analytics AI with zero compliance drift.",
    icon: FlaskConical,
  },
  {
    id: "hospitality",
    category: "sector",
    title: "Travel, Leisure, Hospitality",
    blurb: "Reservations, loyalty platforms, guest analytics, revenue reporting",
    detail:
      "High-availability guest reservation engines, multi-tier loyalty platforms, predictive customer analytics, and real-time revenue management operations.",
    icon: Bed,
  },
  {
    id: "wealth",
    category: "sector",
    title: "Wealth Management, PE, Insurance",
    blurb: "Fund, portfolio ops, actuarial, client reporting, compliance, research, ops",
    detail:
      "Institutional-grade fund and portfolio accounting, actuarial modeling, investor reporting, statutory audit compliance, and equity research support.",
    icon: ShieldCheck,
  },
  {
    id: "manufacturing",
    category: "sector",
    title: "Manufacturing",
    blurb: "Supply chain & procurement, plant ops analytics, industrial IoT, quality",
    detail:
      "Global procurement towers, smart factory and plant operations analytics, industrial IoT integration, quality engineering, and supply chain visibility.",
    icon: Factory,
  },

  // Page 2: Buyer Archetypes (Cards 7–12)
  {
    id: "enterprise",
    category: "buyer",
    title: "Global enterprises",
    blurb: "Standing up or scaling a captive India centre with clear ownership.",
    detail:
      "You need one accountable partner across talent, floors, and ops — not a patchwork of vendors that drift after the kickoff deck.",
    icon: Building2,
  },
  {
    id: "bfsi",
    category: "buyer",
    title: "BFSI & regulated firms",
    blurb: "Controls, audit trails, and leadership that survive scrutiny.",
    detail:
      "We sequence compliance, EOR bridges, and process design so your hub is productive without compromising parent-bank or insurer standards.",
    icon: Landmark,
  },
  {
    id: "mining-metals",
    category: "buyer",
    title: "Mining & Metals",
    blurb: "Asset analytics • engineering • procurement • ESG/HSE data",
    detail:
      "Asset performance analytics, engineering & operational design CoEs, strategic global procurement hubs, and ESG/HSE compliance data systems.",
    icon: Mountain,
  },
  {
    id: "ai",
    category: "buyer",
    title: "AI / data-heavy teams",
    blurb: "Specialist pipelines in India’s deep tech talent markets.",
    detail:
      "City mix, role architecture, and employer brand shaped for scarce skills — so you don’t lose six months hiring the wrong profiles.",
    icon: Brain,
  },
  {
    id: "scaleup",
    category: "buyer",
    title: "Scaling mid-market firms",
    blurb: "First India capability without overbuilding entity too early.",
    detail:
      "Flexible and build-transfer paths let you prove the model, then move to captive ownership when headcount and confidence justify it.",
    icon: UsersRound,
  },
  {
    id: "global-ops",
    category: "buyer",
    title: "Global operations leaders",
    blurb: "CHROs, COOs, and centre heads who own the outcome.",
    detail:
      "Board-ready cases, milestone calendars, and a single operating rhythm — so India capability is a programme, not a side project.",
    icon: Globe2,
  },
];

export function WhoWeServe() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const page = Math.floor(activeIndex / 6);
  const current = allCards[activeIndex] ?? allCards[0];
  const Icon = current.icon;

  const currentBatch = page === 0 ? allCards.slice(0, 6) : allCards.slice(6, 12);
  const totalPages = Math.ceil(allCards.length / 6);

  const resetAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allCards.length);
    }, 1500);
  };

  // Continuous auto-slide timer that starts on mount and resets gracefully on manual clicks
  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goToPage = (newPage: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, newPage));
    setActiveIndex(clamped * 6);
    resetAutoSlide();
  };

  const goToCard = (index: number) => {
    const wrapped = (index + allCards.length) % allCards.length;
    setActiveIndex(wrapped);
    resetAutoSlide();
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    resetAutoSlide();
  };

  return (
    <div className="space-y-4">
      {/* ============================================================ */}
      {/* MOBILE VIEW (< lg): Top Card + Dots Nav + Bottom Detail Card  */}
      {/* ============================================================ */}
      <div className="flex flex-col space-y-4 lg:hidden">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
          SECTOR DEPTH
        </p>

        {/* Top Active Sector / Archetype Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#2e3f33] bg-[#e5ebe6] p-5 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e3f33] text-[#b49339] shadow-xs">
                <Icon className="h-5 w-5 stroke-[2.2]" />
              </span>

              <h4 className="mt-3.5 text-base font-bold text-navy">
                {current.title}
              </h4>

              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {current.blurb}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Middle Navigation Controls: Left Arrow + Indicator Dots + Right Arrow */}
        <div className="flex items-center justify-center gap-3 py-1">
          <button
            type="button"
            onClick={() => goToCard(activeIndex - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-navy shadow-xs transition hover:border-[#2e3f33] hover:bg-[#e5ebe6]"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots corresponding to the 6 items in current batch */}
          <div className="flex items-center gap-1.5">
            {currentBatch.map((card, idx) => {
              const globalIndex = page * 6 + idx;
              const isOn = activeIndex === globalIndex;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => selectCard(globalIndex)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    isOn ? "w-5 bg-[#2e3f33]" : "w-1.5 bg-[#cddcd1]"
                  )}
                  aria-label={`Go to ${card.title}`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToCard(activeIndex + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-navy shadow-xs transition hover:border-[#2e3f33] hover:bg-[#e5ebe6]"
            aria-label="Next card"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Detailed Green Card */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#2e3f33] p-6 text-white shadow-xl">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#b49339]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-[1]">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#b49339] shadow-inner">
              <Icon className="h-5 w-5 stroke-[2.2]" />
            </span>

            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b49339]">
              {current.category === "sector" ? "Sector Vertical" : "Buyer Archetype"}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white">
                  {current.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#d1e0d7] sm:text-sm">
                  {current.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-[1] mt-6 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b49339] px-6 py-3 text-sm font-bold text-[#0b1f3a] shadow-md transition hover:bg-white hover:text-[#2e3f33]"
            >
              Talk through your case
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (lg+): 2-Column Grid (Left: 6 Cards, Right: Detail) */}
      {/* ============================================================ */}
      <div className="hidden lg:grid lg:grid-cols-[1.1fr_0.95fr] lg:gap-6 lg:items-stretch">
        {/* Left Column: 6 Cards per page with smooth auto-cycle transitions across all 12 */}
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: page === 1 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: page === 1 ? -20 : 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid h-full gap-3 sm:grid-cols-2 sm:grid-rows-3"
            >
              {currentBatch.map((card, idx) => {
                const globalIndex = page * 6 + idx;
                const CardIcon = card.icon;
                const isOn = activeIndex === globalIndex;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onMouseEnter={() => selectCard(globalIndex)}
                    onFocus={() => selectCard(globalIndex)}
                    onClick={() => selectCard(globalIndex)}
                    className={cn(
                      "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                      isOn
                        ? "border-[#2e3f33] bg-[#e5ebe6] shadow-md shadow-[#2e3f33]/10"
                        : "border-border bg-white hover:border-[#2e3f33]/40",
                    )}
                  >
                    <div>
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300",
                          isOn
                            ? "bg-[#2e3f33] text-[#b49339]"
                            : "bg-[#e5ebe6] text-[#2e3f33] group-hover:bg-[#2e3f33] group-hover:text-[#b49339]",
                        )}
                      >
                        <CardIcon className="h-4 w-4 stroke-[2.2]" />
                      </span>

                      <p className="mt-3 text-sm font-bold text-navy">{card.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                        {card.blurb}
                      </p>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Active Card Detail Panel */}
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[#2e3f33] p-6 text-white shadow-xl sm:p-8">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#b49339]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-[1]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b49339] shadow-inner">
              <Icon className="h-6 w-6 stroke-[2.2]" />
            </span>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
              {current.category === "sector" ? "Sector Vertical" : "Buyer Archetype"}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#d1e0d7] sm:text-base sm:leading-relaxed">
                  {current.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-[1] mt-8 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b49339] px-6 py-3 text-sm font-bold text-[#0b1f3a] shadow-md transition hover:bg-white hover:text-[#2e3f33]"
            >
              Talk through your case
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows aligned under left column on Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1.1fr_0.95fr] lg:gap-6">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => goToPage(page - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-navy shadow-sm transition hover:border-[#2e3f33] hover:bg-[#e5ebe6] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:bg-white"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={page === totalPages - 1}
            onClick={() => goToPage(page + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-navy shadow-sm transition hover:border-[#2e3f33] hover:bg-[#e5ebe6] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:bg-white"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div />
      </div>
    </div>
  );
}
