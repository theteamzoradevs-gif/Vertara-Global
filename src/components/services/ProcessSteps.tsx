"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
};

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState<string | null>(steps[0]?.number ?? null);

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isOpen = open === step.number;
        return (
          <div
            key={step.number}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              isOpen ? "border-accent bg-surface-elevated" : "border-border bg-white",
            )}
          >
            <button
              type="button"
              className="flex w-full items-start gap-4 px-5 py-4 text-left md:items-center"
              onClick={() => setOpen(isOpen ? null : step.number)}
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover)").matches) {
                  setOpen(step.number);
                }
              }}
            >
              <span className="metric-number text-2xl font-bold text-accent md:text-3xl">
                {step.number}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.summary}</p>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-4 border-t border-border px-5 py-5 md:grid-cols-2">
                    <p className="text-sm leading-relaxed text-slate md:text-base">
                      {step.detail}
                    </p>
                    <div className="relative h-44 overflow-hidden rounded-xl md:h-52">
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
