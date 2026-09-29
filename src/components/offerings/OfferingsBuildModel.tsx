"use client";

import { Search, Pencil, Flag, Wrench, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { offeringsData } from "../../data/offerings-data";

const STAGE_ICONS = [
  Search,      // 01 Discover
  Pencil,      // 02 Design
  Flag,        // 03 Build
  Wrench,      // 04 Operate / Scale
  TrendingUp,  // 05 Monitor
  TrendingUp,  // 06 Transfer
];

export function OfferingsBuildModel() {
  const { buildModel } = offeringsData;

  return (
    <section
      id="build-model"
      className="relative w-full overflow-hidden bg-[#F9F8F5] py-14 sm:py-16 md:py-20 border-b border-[#D8D2C0] font-sans"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="w-full text-left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
              {buildModel.eyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem] leading-tight">
              {buildModel.title}
            </h2>

            <p className="mt-4 w-full text-base sm:text-lg leading-relaxed text-[#101C30]/85">
              {buildModel.description}
            </p>
          </div>
        </Reveal>

        {/* Desktop Step-wise Stepper matching uploaded reference image */}
        <div className="mt-14 sm:mt-16 hidden lg:block">
          <div className="relative">
            {/* Continuous horizontal connecting gold line passing behind all circles */}
            <div
              className="absolute top-8 left-[8.33%] right-[8.33%] h-[3px] bg-[#B59439] z-0"
              aria-hidden="true"
            />

            {/* 6 Step Nodes */}
            <div className="relative z-10 grid grid-cols-6 gap-4 xl:gap-6">
              {buildModel.stages.map((stage, index) => {
                const IconComponent = STAGE_ICONS[index] || Search;

                return (
                  <div key={stage.number} className="flex flex-col items-center text-center">
                    {/* Circle Node with Gold Number on Top-Left */}
                    <div className="relative inline-flex items-center justify-center">
                      <span className="absolute -top-2.5 -left-3 font-mono text-sm xl:text-base font-bold text-[#B59439] select-none">
                        {stage.number}
                      </span>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2F3F34] text-white shadow-md transition-transform duration-300 hover:scale-105">
                        <IconComponent className="h-6 w-6 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="mt-4 text-base xl:text-lg font-bold text-[#101C30] leading-snug tracking-tight">
                      {stage.name}
                    </h3>

                    {/* Deliverables Text */}
                    <p className="mt-2 text-xs xl:text-[13px] leading-relaxed text-[#101C30]/80">
                      {stage.deliverables}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Step-wise Stepper (No cards, pure step nodes) */}
        <div className="mt-12 lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
          {buildModel.stages.map((stage, index) => {
            const IconComponent = STAGE_ICONS[index] || Search;

            return (
              <div
                key={stage.number}
                className="flex flex-col items-center text-center"
              >
                {/* Number & Circle */}
                <div className="relative inline-flex items-center justify-center">
                  <span className="absolute -top-2.5 -left-3 font-mono text-sm font-bold text-[#B59439]">
                    {stage.number}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2F3F34] text-white shadow-md">
                    <IconComponent className="h-5 w-5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="mt-3 text-base font-bold text-[#101C30] leading-snug">
                  {stage.name}
                </h3>

                {/* Deliverables Text */}
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#101C30]/80">
                  {stage.deliverables}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
