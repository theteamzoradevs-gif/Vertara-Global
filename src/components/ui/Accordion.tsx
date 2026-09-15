"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border bg-surface-elevated", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="text-base font-semibold text-navy md:text-lg">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                  open && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:text-base">
                    {item.content}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
