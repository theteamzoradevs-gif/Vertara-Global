"use client";

import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type Cell = boolean | string;

const rows: {
  criterion: string;
  us: Cell;
  multiVendor: Cell;
  pureVendor: Cell;
}[] = [
    {
      criterion: "Connected talent + workspace + ops",
      us: true,
      multiVendor: false,
      pureVendor: false,
    },
    {
      criterion: "Captive ownership path",
      us: true,
      multiVendor: "Varies",
      pureVendor: false,
    },
    {
      criterion: "EOR bridge while entity forms",
      us: true,
      multiVendor: "Sometimes",
      pureVendor: false,
    },
    {
      criterion: "Single accountable partner",
      us: true,
      multiVendor: false,
      pureVendor: true,
    },
    {
      criterion: "Board-ready advisory included",
      us: true,
      multiVendor: "Extra fee",
      pureVendor: false,
    },
    {
      criterion: "Typical time to seed team",
      us: "2–8 weeks",
      multiVendor: "3–6 months",
      pureVendor: "2–6 weeks",
    },
    {
      criterion: "IP & culture control",
      us: "High",
      multiVendor: "Medium",
      pureVendor: "Low–Med",
    },
  ];

const columns = [
  { key: "us" as const, label: "GCC Advisor", short: "Us", ours: true },
  {
    key: "multiVendor" as const,
    label: "Multi-vendor stack",
    short: "Multi-vendor",
    ours: false,
  },
  {
    key: "pureVendor" as const,
    label: "Classic offshore vendor",
    short: "Offshore",
    ours: false,
  },
];

function CellView({
  value,
  ours,
  compact,
}: {
  value: Cell;
  ours?: boolean;
  compact?: boolean;
}) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          compact ? "h-5 w-5" : "h-7 w-7",
          ours ? "bg-accent text-white" : "bg-slate-100 text-slate-600",
        )}
      >
        <Check className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-400",
          compact ? "h-5 w-5" : "h-7 w-7",
        )}
      >
        <X className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-0.5 font-medium leading-tight",
        compact ? "text-[10px]" : "gap-1 text-sm",
        ours ? "text-navy" : "text-slate-600",
      )}
    >
      {!compact ? <Minus className="h-3 w-3 shrink-0 text-slate-300" /> : null}
      {value}
    </span>
  );
}

export function CompetitiveComparison() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {/* Mobile: compact full table — all columns visible, no picking / sliding */}
        <div className="md:hidden">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[36%]" />
              <col className="w-[21.5%]" />
              <col className="w-[21.5%]" />
              <col className="w-[21%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border">
                <th className="bg-surface px-2 py-2.5 text-[9px] font-semibold uppercase leading-tight tracking-wide text-muted">
                  Compare
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-1 py-2.5 text-center text-[10px] font-semibold leading-tight",
                      col.ours ? "bg-navy text-white" : "bg-surface text-navy",
                    )}
                  >
                    {col.short}
                    {col.ours ? (
                      <span className="mt-0.5 block text-[8px] font-medium uppercase tracking-wider text-highlight">
                        Rec.
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.criterion}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    i % 2 === 0 ? "bg-white" : "bg-surface/60",
                  )}
                >
                  <th className="px-2 py-2 text-left text-[10px] font-medium leading-snug text-navy">
                    {row.criterion}
                  </th>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-0.5 py-2 text-center align-middle",
                        col.ours && "bg-accent-soft/35",
                      )}
                    >
                      <div className="flex justify-center">
                        <CellView
                          value={row[col.key]}
                          ours={col.ours}
                          compact
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Desktop: full labels */}
        <div className="hidden md:block">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[34%]" />
              <col className="w-[22%]" />
              <col className="w-[22%]" />
              <col className="w-[22%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border">
                <th className="bg-surface px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  What buyers compare
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-4 text-center text-sm font-semibold",
                      col.ours
                        ? "bg-navy text-white"
                        : "bg-surface text-navy",
                    )}
                  >
                    {col.label}
                    {col.ours ? (
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-highlight">
                        Recommended
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.criterion}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    i % 2 === 0 ? "bg-white" : "bg-surface/60",
                  )}
                >
                  <th className="px-5 py-3.5 text-left text-sm font-medium text-navy">
                    {row.criterion}
                  </th>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3.5 text-center align-middle",
                        col.ours && "bg-accent-soft/35",
                      )}
                    >
                      <div className="flex justify-center">
                        <CellView value={row[col.key]} ours={col.ours} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="/contact" size="md">
          Talk through your fit
        </Button>
      </div>
    </Reveal>
  );
}
