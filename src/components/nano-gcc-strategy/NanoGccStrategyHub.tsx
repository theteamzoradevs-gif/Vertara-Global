"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, X, ArrowRight } from "lucide-react";
import {
  nanoGccStudies,
  type NanoGccStudy,
} from "@/data/nano-gcc-strategy";

export function NanoGccStrategyHub() {
  const [activeModalStudy, setActiveModalStudy] =
    useState<NanoGccStudy | null>(null);

  return (
    <section
      className="relative w-full bg-white py-12 sm:py-16 md:py-20 font-sans"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            EXECUTIVE PERSPECTIVES
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#101C30]">
            10 Strategic Perspectives on Building & Scaling Nano GCCs
          </h2>

        </div>

        {/* Studies Grid: 2 columns on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {nanoGccStudies.map((study) => (
            <div
              key={study.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#cddcd1] bg-[#edf5ef] p-7 sm:p-8 transition-all duration-300 hover:border-[#2F3F34] hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Category Eyebrow */}
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
                  {study.category}
                </p>

                {/* Heading */}
                <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] leading-snug">
                  {study.hasDetailPage ? (
                    <Link
                      href={`/nano-gcc-strategy/${study.slug}`}
                      className="hover:text-[#B59439] transition-colors"
                    >
                      {study.title}
                    </Link>
                  ) : (
                    study.title
                  )}
                </h3>

                {/* Description in Italic */}
                <p className="mt-3.5 text-base sm:text-[1.05rem] leading-relaxed text-[#101C30]/80 italic">
                  {study.excerpt}
                </p>
              </div>

              {/* Actions Bottom Bar: Read / View Summary and Download */}
              <div className="mt-8 pt-1 flex flex-wrap items-center justify-between gap-3">
                {study.hasDetailPage ? (
                  <Link
                    href={`/nano-gcc-strategy/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#101C30] hover:text-[#B59439] transition-colors cursor-pointer"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="h-4 w-4 text-[#B59439]" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveModalStudy(study)}
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#101C30] hover:text-[#B59439] transition-colors cursor-pointer"
                  >
                    <span>View Summary</span>
                    <ArrowRight className="h-4 w-4 text-[#B59439]" />
                  </button>
                )}

                <a
                  href={study.pdfUrl}
                  download={study.pdfFilename}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md active:scale-[0.98]"
                  title={`Download: ${study.pdfFilename}`}
                >
                  <Download className="h-4 w-4" />
                  <span>Download the full paper</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Modal / Briefing Drawer */}
      {activeModalStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModalStudy(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-[#cddcd1] bg-white p-6 sm:p-8 shadow-2xl space-y-5 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B59439]">
                  {activeModalStudy.category}
                </span>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] leading-snug">
                  {activeModalStudy.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalStudy(null)}
                className="rounded-lg p-1.5 text-[#526171] hover:bg-[#edf5ef] hover:text-[#101C30] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-[#101C30]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#526171]">
                  Executive Overview
                </h4>
                <p className="mt-1.5 text-base sm:text-lg leading-relaxed text-[#101C30]/90 italic">
                  {activeModalStudy.excerpt}
                </p>
              </div>

              <div className="rounded-xl border border-[#cddcd1] bg-[#edf5ef] p-4 sm:p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3F34]">
                  Key Strategic Takeaway
                </h4>
                <p className="mt-1 text-sm sm:text-base font-normal text-[#101C30]/90 leading-relaxed">
                  {activeModalStudy.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#e2e8f0] pt-4">
              <a
                href={activeModalStudy.pdfUrl}
                download={activeModalStudy.pdfFilename}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F3F34] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#233027] cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download the full paper</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveModalStudy(null)}
                className="text-center text-sm font-semibold text-[#526171] hover:text-[#101C30] py-2 px-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
