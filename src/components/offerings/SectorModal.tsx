"use client";

import React, { useEffect, useCallback } from "react";
import type { SectorItem } from "../../data/offerings-data";

interface SectorModalProps {
  sector: SectorItem | null;
  onClose: () => void;
}

export function SectorModal({ sector, onClose }: SectorModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!sector) return;
    document.addEventListener("keydown", handleKeyDown);
    // Lock body scroll while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [sector, handleKeyDown]);

  if (!sector) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans"
      style={{ fontFamily: "Calibri" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-sector-title"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#D8D2C0] bg-white p-6 sm:p-8 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        {/* Close Button — Text × (Zero icon rule) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D2C0] text-xl font-bold leading-none text-[#101C30] transition hover:bg-[#2F3F34] hover:text-white"
          aria-label="Close dialog"
        >
          ×
        </button>

        {/* Sector Eyebrow */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
          Sector Expertise
        </p>

        {/* Sector Title */}
        <h2
          id="modal-sector-title"
          className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#101C30] pr-10"
        >
          {sector.title}
        </h2>

        {/* Tagline */}
        <p className="mt-2 text-xs sm:text-sm font-semibold text-[#8C7026] leading-relaxed">
          {sector.tagline}
        </p>

        {/* Overview */}
        <div className="mt-5 border-t border-[#D8D2C0]/70 pt-5">
          <p className="text-sm sm:text-base leading-relaxed text-[#101C30]/90">
            {sector.overview}
          </p>
        </div>

        {/* How Vertara Helps */}
        <div className="mt-5 rounded-xl border-l-[3px] border-[#2F3F34] bg-[#e5ebe6]/50 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2F3F34]">
            How Vertara Helps
          </p>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#101C30]">
            {sector.howVertaraHelps}
          </p>
        </div>

        {/* Modal Footer / Close Action */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg bg-[#2F3F34] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#233027]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
