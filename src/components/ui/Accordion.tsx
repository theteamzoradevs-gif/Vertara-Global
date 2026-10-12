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
  allowMultiple = true,
  defaultOpenId,
}: {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpenId?: string | null;
}) {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId === null) return [];
    if (typeof defaultOpenId === "string") return [defaultOpenId];
    return items[0]?.id ? [items[0].id] : [];
  });
  const reduce = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border bg-surface-elevated", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
              onClick={() => toggleItem(item.id)}
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
