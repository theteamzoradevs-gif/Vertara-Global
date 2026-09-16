"use client";

import { cn } from "@/lib/utils";

type Props = {
  intensity?: "light" | "medium" | "strong";
  className?: string;
  onDark?: boolean;
};

/**
 * Soft left→right flowing thread ribbons (theme teal/navy).
 * Solid strokes only — no SVG gradient ids (avoids hydration mismatch).
 */
export function FlowThreads({
  intensity = "light",
  className,
  onDark = false,
}: Props) {
  const opacity =
    intensity === "strong"
      ? "opacity-[0.48]"
      : intensity === "medium"
        ? "opacity-[0.32]"
        : "opacity-[0.2]";

  const c1 = onDark ? "#5eead4" : "#0d9488";
  const c2 = onDark ? "#14b8a6" : "#14b8a6";
  const c3 = onDark ? "#99f6e4" : "#0f766e";
  const c4 = onDark ? "#2dd4bf" : "#115e59";
  const colors = [c1, c2, c3, c4];

  const bases = [
    "M-80 140 C 200 80, 360 200, 560 150 S 880 90, 1280 160",
    "M-80 200 C 220 140, 400 260, 600 200 S 920 140, 1280 210",
    "M-80 260 C 240 200, 420 320, 640 250 S 960 190, 1280 270",
    "M-80 320 C 260 260, 440 380, 680 310 S 1000 250, 1280 330",
    "M-80 380 C 280 320, 480 420, 720 370 S 1040 310, 1280 390",
  ];

  const strandCount =
    intensity === "strong" ? 6 : intensity === "medium" ? 4 : 3;
  const step = intensity === "strong" ? 5 : 4;

  const ribbons = bases.flatMap((base, bi) =>
    Array.from({ length: strandCount }, (_, i) => {
      const dy = (i - Math.floor(strandCount / 2)) * step;
      return {
        d: offsetPathY(base, dy),
        color: colors[(bi + i) % colors.length],
        w: intensity === "strong" ? 1.05 : 0.85,
        o: 0.18 + (i % 3) * 0.06,
      };
    }),
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        opacity,
        className,
      )}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {ribbons.map((r, i) => (
          <path
            key={i}
            d={r.d}
            stroke={r.color}
            strokeWidth={r.w}
            strokeLinecap="round"
            opacity={r.o}
          />
        ))}
      </svg>
    </div>
  );
}

function offsetPathY(d: string, dy: number): string {
  const parts = d.match(/[MCS]|-?\d+(\.\d+)?/g);
  if (!parts) return d;

  let out = "";
  let pair = 0;

  for (const p of parts) {
    if (p === "M" || p === "C" || p === "S") {
      pair = 0;
      out += `${p} `;
      continue;
    }
    const n = Number(p);
    out += pair === 1 ? `${n + dy} ` : `${n} `;
    pair = pair === 0 ? 1 : 0;
  }
  return out.trim();
}
