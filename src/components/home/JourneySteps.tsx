"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowThreads } from "@/components/ui/FlowThreads";

const steps = [
  {
    number: "01",
    title: "Discovery & fit",
    summary: "Intent, city, ownership preference, and first constraints.",
    detail:
      "A short working session maps headcount bands, timeline pressure, and whether you need advisory-only, a bridge model, or a full connected plan.",
  },
  {
    number: "02",
    title: "Business case & design",
    summary: "Location, org shape, and a board-ready narrative.",
    detail:
      "We pressure-test city mix, leadership roles, and cost/ownership scenarios so sponsors can decide with evidence — not generic market slides.",
  },
  {
    number: "03",
    title: "Foundation tracks",
    summary: "Entity, workspace, and hiring start in parallel.",
    detail:
      "Legal/entity, floor readiness, and leadership pipelines run together so nothing waits on a single vendor handoff.",
  },
  {
    number: "04",
    title: "Operational launch",
    summary: "First cohorts productive with HR, IT, and delivery rhythm.",
    detail:
      "Onboarding, facilities, and ops controls go live with the first wave — so the centre feels like part of the enterprise from day one.",
  },
  {
    number: "05",
    title: "Scale with quality",
    summary: "Waves of hiring timed to space and process capacity.",
    detail:
      "We expand role pipelines and floors only as retention and delivery hold — protecting culture while you grow past the first hundred.",
  },
  {
    number: "06",
    title: "Steady state & options",
    summary: "Transfer, partnership, or ongoing module support.",
    detail:
      "Captive transfer when ready, or continued managed modules for talent, workspace, or ops — your ownership model, not ours.",
  },
];

const HEADER = 68;

/**
 * Scroll-locked journey: UI stays pinned; scrolling advances steps 01→06.
 * Only after step 06 does the page move to the next section.
 */
export function JourneySteps() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }

      // How far we've scrolled into this track (0 = just pinned, 1 = finished)
      const into = Math.min(total, Math.max(0, -rect.top));
      const progress = into / total;

      // Equal scroll distance per step
      let idx = Math.floor(progress * steps.length);
      if (idx >= steps.length) idx = steps.length - 1;
      if (idx < 0) idx = 0;
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const step = steps[active];

  return (
    <section id="journey" className="relative bg-surface">
      <FlowThreads intensity="light" className="opacity-25" />

      {/* Tall scroll runway: 1 viewport of scroll per step */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        {/* Pinned UI — stays on screen while user scrolls the runway */}
        <div
          className="sticky z-[1] flex flex-col justify-center"
          style={{
            top: HEADER,
            height: `calc(100vh - ${HEADER}px)`,
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 max-w-3xl md:mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                How it unfolds
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
                From first conversation to a live India centre
              </h2>
              <p className="mt-3 text-sm text-muted md:text-base">
                Keep scrolling — steps advance automatically. After step 06, you
                move to the next section.
              </p>
            </div>

            {/* Track */}
            <div className="relative mb-6 hidden md:block">
              <div
                className="absolute left-[8%] right-[8%] top-7 h-0.5 bg-border"
                aria-hidden
              />
              <div
                className="absolute left-[8%] top-7 h-0.5 bg-accent transition-all duration-300 ease-out"
                style={{
                  width: `${(active / Math.max(1, steps.length - 1)) * 84}%`,
                }}
                aria-hidden
              />
              <ol className="relative grid grid-cols-6 gap-2">
                {steps.map((s, i) => {
                  const isActive = active === i;
                  const isDone = i < active;
                  return (
                    <li
                      key={s.number}
                      className="flex flex-col items-center text-center"
                    >
                      <span
                        className={cn(
                          "relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 lg:h-14 lg:w-14",
                          isActive
                            ? "scale-110 border-navy bg-navy text-highlight shadow-lg shadow-navy/20"
                            : isDone
                              ? "border-accent bg-accent text-white"
                              : "border-border bg-white text-navy",
                        )}
                        aria-current={isActive ? "step" : undefined}
                      >
                        {s.number}
                      </span>
                      <p
                        className={cn(
                          "mt-2 text-xs font-bold leading-snug lg:text-sm",
                          isActive ? "text-navy" : "text-slate",
                        )}
                      >
                        {s.title}
                      </p>
                      <p className="mt-1 hidden text-[11px] leading-relaxed text-muted xl:block">
                        {s.summary}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Mobile nodes */}
            <div className="mb-5 flex justify-between md:hidden">
              {steps.map((s, i) => (
                <span
                  key={s.number}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold transition",
                    i === active
                      ? "border-navy bg-navy text-highlight"
                      : i < active
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-white text-navy",
                  )}
                >
                  {s.number}
                </span>
              ))}
            </div>

            {/* Detail — updates with scroll, CTA centered */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-border bg-white px-5 py-7 text-center shadow-sm sm:px-10 sm:py-9"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Step {step.number} of 06
                </p>
                <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
                  {step.detail}
                </p>
                <div className="mt-7 flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft"
                  >
                    {active === steps.length - 1 ? "Contact us" : "Begin here"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
