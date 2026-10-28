"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  X,
  ArrowRight,
} from "lucide-react";
import {
  infrastructureStudies,
  type InfrastructureStudy,
  type InfrastructureStudyCategory,
} from "@/data/infrastructure-studies";

const categories: InfrastructureStudyCategory[] = [
  "All Studies",
  "Workplace & Real Estate",
  "Location & Cities",
  "Commercials & Cost",
  "Scale & Operating Models",
];

export function InfrastructureStudiesHub() {
  const [activeModalStudy, setActiveModalStudy] =
    useState<InfrastructureStudy | null>(null);

  const handleDownload = (study: InfrastructureStudy) => {
    // Direct link to the PDF file
    const link = document.createElement("a");
    link.href = study.pdfUrl;
    link.download = study.pdfFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 md:py-20 font-sans" style={{ fontFamily: "Calibri" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Controls: Section Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            RESEARCH LIBRARY
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#101C30]">
            12 Practitioner Studies on India GCC Infrastructure
          </h2>

        </div>

        {/* Studies Grid: 2 columns on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {infrastructureStudies.map((study) => (
            <div
              key={study.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#cddcd1] bg-[#edf5ef] p-7 sm:p-8 transition-all duration-300 hover:border-[#2F3F34] hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Existing Eyebrow */}
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
                  {study.category}
                </p>

                {/* Heading */}
                <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] leading-snug">
                  {study.hasDetailPage ? (
                    <Link
                      href={`/infrastructure-studies/${study.slug}`}
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

              {/* Actions Bottom Bar: Read Study and Download */}
              <div className="mt-8 pt-1 flex flex-wrap items-center justify-between gap-3">
                {study.hasDetailPage ? (
                  <Link
                    href={`/infrastructure-studies/${study.slug}`}
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
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
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
                className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-surface-elevated hover:text-[#101C30] transition cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#101C30]">
                  Executive Overview
                </h4>
                <p className="mt-1 text-sm text-[#526171] leading-relaxed">
                  {activeModalStudy.excerpt}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2F3F34] text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#101C30] truncate max-w-[280px] sm:max-w-[340px]">
                      {activeModalStudy.pdfFilename}
                    </p>
                    <p className="text-[11px] text-muted">Original Research Report · PDF</p>
                  </div>
                </div>

                <a
                  href={activeModalStudy.pdfUrl}
                  download={activeModalStudy.pdfFilename}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2F3F34] px-4 py-2 text-xs font-semibold text-white hover:bg-[#233027] transition shadow-xs cursor-pointer shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download the full paper</span>
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalStudy(null)}
                className="rounded-xl border border-border bg-white px-5 py-2 text-xs font-semibold text-[#101C30] hover:bg-surface-elevated transition cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
