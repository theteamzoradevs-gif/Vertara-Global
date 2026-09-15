"use client";

import { cn } from "@/lib/utils";

type Item = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const palette = [
  "from-[#0b1f3a] to-[#143056]",
  "from-[#0f766e] to-[#0d9488]",
  "from-[#115e59] to-[#0b1f3a]",
  "from-[#134e4a] to-[#0f766e]",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Row({
  items,
  direction,
}: {
  items: Item[];
  direction: "left" | "right";
}) {
  const loop = [...items, ...items];

  return (
    <div className="group/row relative overflow-hidden py-1">
      <div
        className={cn(
          "flex w-max gap-4",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          "group-hover/row:[animation-play-state:paused]",
        )}
      >
        {loop.map((t, i) => {
          const tone = palette[i % palette.length];
          return (
            <blockquote
              key={`${t.name}-${i}`}
              className="group/card w-[min(85vw,340px)] shrink-0 overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg sm:w-[360px]"
            >
              <div className={cn("relative h-16 bg-gradient-to-br", tone)}>
                <div className="absolute -bottom-6 left-5">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br text-sm font-bold text-white shadow-md",
                      tone,
                    )}
                  >
                    {initials(t.name)}
                  </span>
                </div>
                <span className="absolute right-4 top-3 text-3xl font-serif leading-none text-white/25">
                  “
                </span>
              </div>
              <div className="px-5 pb-5 pt-8">
                <p className="line-clamp-4 text-sm leading-relaxed text-slate transition group-hover/card:text-navy">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-accent/90">
                    {t.company}
                  </p>
                </footer>
              </div>
            </blockquote>
          );
        })}
      </div>
    </div>
  );
}

export function TestimonialMarquee({ items }: { items: Item[] }) {
  if (!items.length) return null;

  const mid = Math.ceil(items.length / 2);
  const rowA = items.length > 2 ? items.slice(0, mid) : items;
  const rowB = items.length > 2 ? items.slice(mid) : [...items].reverse();
  const pad = (row: Item[]) =>
    row.length >= 3 ? row : [...row, ...row, ...row].slice(0, 4);

  return (
    <div className="space-y-4">
      <Row items={pad(rowA)} direction="right" />
      <Row items={pad(rowB)} direction="left" />
      <p className="text-center text-xs text-muted">
        Hover a row to pause and read
      </p>
    </div>
  );
}
