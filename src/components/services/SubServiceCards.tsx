"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type Item = { title: string; summary: string; detail: string };

export function SubServiceCards({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpen(isOpen ? null : index)}
            className="rounded-2xl border border-border bg-surface-elevated p-5 text-left transition hover:border-accent/50 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.summary}</p>
              </div>
              <span className="rounded-full bg-accent-soft p-2 text-accent">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </div>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden text-sm leading-relaxed text-slate"
                >
                  <span className="mt-3 block">{item.detail}</span>
                </motion.p>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
