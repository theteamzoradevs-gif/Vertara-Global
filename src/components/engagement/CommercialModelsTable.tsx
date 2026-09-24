"use client";

import { CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Layers, Award, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommercialModel {
  name: string;
  covers: string;
  deliveryOwner: string;
  ownerType: "client" | "vertara" | "scoped" | "bot";
  bestFit: string;
}

const commercialModels: CommercialModel[] = [
  {
    name: "Advisory Retainer",
    covers: "Senior access, strategic guidance, business-case development",
    deliveryOwner: "Client",
    ownerType: "client",
    bestFit: "Early-stage exploration, feasibility, location strategy, market intelligence",
  },
  {
    name: "Staff Augmentation",
    covers: "Specific specialists or surge capacity on demand",
    deliveryOwner: "Client",
    ownerType: "client",
    bestFit: "Filling capability gaps without handing over a workstream",
  },
  {
    name: "Project-Based / Managed Workstream",
    covers: "A defined deliverable, or one functional pillar run end-to-end",
    deliveryOwner: "Vertara (scoped)",
    ownerType: "scoped",
    bestFit: "Discrete builds — entity setup, location study, org design",
  },
  {
    name: "Milestone-Based Build",
    covers: "Full end-to-end build, released against lifecycle gates",
    deliveryOwner: "Vertara",
    ownerType: "vertara",
    bestFit: "Complete GCC build from strategy through launch",
  },
  {
    name: "Long-Term / BOT Partner",
    covers: "Sustained operating support, or build-operate-transfer to full client ownership",
    deliveryOwner: "Vertara → Client",
    ownerType: "bot",
    bestFit: "Post-launch scaling, staged ownership handover",
  },
];

export function CommercialModelsTable() {
  const getOwnerBadge = (owner: string, type: CommercialModel["ownerType"]) => {
    switch (type) {
      case "client":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#cddcd1] bg-[#f0f4f1] px-2.5 py-1 text-xs font-semibold text-[#2e3f33]">
            <UserCheck className="h-3.5 w-3.5 text-slate" />
            <span>{owner}</span>
          </span>
        );
      case "scoped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#143056]/20 bg-[#0b1f3a]/10 px-2.5 py-1 text-xs font-semibold text-[#0b1f3a]">
            <Layers className="h-3.5 w-3.5 text-[#0b1f3a]" />
            <span>{owner}</span>
          </span>
        );
      case "vertara":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#2e3f33] bg-[#2e3f33] px-2.5 py-1 text-xs font-bold text-[#b49339] shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#b49339]" />
            <span>{owner}</span>
          </span>
        );
      case "bot":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#b49339]/40 bg-[#b49339]/15 px-2.5 py-1 text-xs font-bold text-[#2e3f33] shadow-xs">
            <RefreshCw className="h-3.5 w-3.5 text-[#b49339]" />
            <span>{owner}</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* DESKTOP & TABLET TABULAR VIEW */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-[#cddcd1] bg-white shadow-xl shadow-navy/5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#2e3f33]/30 bg-[#2e3f33] text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#b49339] w-[22%]">
                  Model
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white w-[30%]">
                  What it covers
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white w-[18%]">
                  Who owns delivery
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#b49339] w-[30%]">
                  Best fit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cddcd1]/60">
              {commercialModels.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={item.name}
                    className={cn(
                      "transition-colors duration-200 hover:bg-[#e5ebe6]/60 cursor-default",
                      isEven ? "bg-white" : "bg-[#f0f4f1]/50"
                    )}
                  >
                    <td className="px-6 py-5 align-top">
                      <p className="font-bold text-sm text-navy leading-snug">
                        {item.name}
                      </p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="text-xs sm:text-sm text-slate leading-relaxed">
                        {item.covers}
                      </p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      {getOwnerBadge(item.deliveryOwner, item.ownerType)}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="text-xs sm:text-sm text-navy/90 font-medium leading-relaxed">
                        {item.bestFit}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE STACKED CARDS VIEW */}
      <div className="space-y-4 md:hidden">
        {commercialModels.map((item, index) => (
          <div
            key={item.name}
            className="rounded-2xl border border-[#cddcd1] bg-white p-5 shadow-md shadow-navy/5 space-y-3.5"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#cddcd1]/50 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b49339]">
                  Model {index + 1}
                </span>
                <h4 className="text-base font-bold text-navy mt-0.5">
                  {item.name}
                </h4>
              </div>
              {getOwnerBadge(item.deliveryOwner, item.ownerType)}
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate">
                What it covers
              </p>
              <p className="mt-1 text-xs text-navy/85 leading-relaxed">
                {item.covers}
              </p>
            </div>

            <div className="pt-2 border-t border-[#cddcd1]/30">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#b49339]">
                Best fit
              </p>
              <p className="mt-1 text-xs font-medium text-navy leading-relaxed">
                {item.bestFit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
