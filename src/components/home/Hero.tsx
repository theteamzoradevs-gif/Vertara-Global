"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { MetricCounter } from "@/components/ui/MetricCounter";
import type { Metric } from "@/data/seed-content";
import { seedSettings } from "@/data/seed-content";

type Props = {
  tagline?: string;
  headline?: string;
  subheadline?: string;
  metrics?: Metric[];
  phone?: string;
  backgroundImage?: string;
  rotatingEyebrow?: string;
  rotatingLines?: { label: string; detail: string }[];
  primaryCta?: string;
  secondaryCta?: string;
  formEyebrow?: string;
  formTitle?: string;
  formDescription?: string;
  formButton?: string;
  formSuccess?: string;
  showQuickCallForm?: boolean;
};

export function Hero({
  tagline = seedSettings.tagline,
  headline = seedSettings.heroHeadline,
  subheadline = seedSettings.heroSubheadline,
  metrics,
  phone = "+91 80 4000 1200",
  primaryCta = "Discuss Your GCC Mandate",
  secondaryCta = "See Our Offerings",
  formEyebrow = seedSettings.heroFormEyebrow,
  formTitle = seedSettings.heroFormTitle,
  formDescription = seedSettings.heroFormDescription,
  formButton = seedSettings.heroFormButton,
  formSuccess = seedSettings.heroFormSuccess,
  showQuickCallForm = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");
    const form = new FormData(formEl);
    const email = String(form.get("email") || "").trim();
    const phoneVal = String(form.get("phone") || "").trim();
    if (!email && !phoneVal) {
      setErrorMessage("Add an email or phone so we can reach you.");
      setStatus("error");
      return;
    }
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: "—",
          email: email || undefined,
          phone: phoneVal || undefined,
          intent: "quick_call",
          message: phoneVal && !email ? `Phone callback requested: ${phoneVal}` : undefined,
          source: "hero_quick_call",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok && !data?.ok) {
        throw new Error(data?.error || "Could not save lead.");
      }
      formEl.reset();
      setStatus("done");
    } catch {
      setErrorMessage("Could not send. Please try again.");
      setStatus("error");
    }
  }

  const activeMetrics = (metrics || []).filter(
    (m) => m && m.label && String(m.label).trim() !== "",
  );

  // Format eyebrow with pipe separators matching brand guidelines
  const eyebrowParts = (tagline || "GCC ADVISORY | MID-MARKET GCC SPECIALISTS | NANO TO MID-SCALE")
    .replace(/[·•]/g, "|")
    .replace(/[—–]/g, "|")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section
      className="relative flex flex-col justify-center md:justify-between overflow-hidden border-b border-[#2F3F34] py-14 sm:py-18 md:py-0 md:h-[calc(100svh-68px)] md:max-h-[850px] bg-[#2F3F34] font-sans"
      style={{ fontFamily: 'Calibri' }}
    >
      {/* Main Hero Content */}
      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-4 py-2 sm:py-4 md:my-auto md:py-6 ${
          showQuickCallForm
            ? "grid items-center gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 text-left"
            : "flex flex-col items-center justify-center max-w-4xl text-center"
        }`}
      >
        <div className={showQuickCallForm ? "w-full min-w-0" : "w-full"}>
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-xs md:text-[13px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.22em] text-[#C5A55D]">
            {eyebrowParts.map((part, index) => (
              <span key={index} className="inline-flex items-center">
                <span>{part}</span>
                {index < eyebrowParts.length - 1 && (
                  <span className="ml-2 sm:ml-3 text-[#C5A55D]/50 select-none">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Headline in Calibri matching brand guidelines */}
          <h1
            className="mt-3 sm:mt-3.5 md:mt-3.5 text-[21px] sm:text-2xl md:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.9rem] leading-[1.25] sm:leading-[1.2] md:leading-[1.14] tracking-tight font-bold text-white max-w-sm sm:max-w-xl md:max-w-none mx-auto"
          >
            {headline.includes("Building GCCs") ? (
              <>
                <span className="block text-white">
                  Building GCCs Enabling scale <span className="hidden md:inline">— from</span>
                  <span className="md:hidden">—</span>
                </span>
                <span className="block text-white mt-1 sm:mt-1.5">
                  <span className="md:hidden">from </span>Nano to mid-scale, 20 to 500 people
                </span>
              </>
            ) : (
              <span className="block text-white">{headline.replace(/\./g, "")}</span>
            )}
          </h1>

          {/* Subheadline / Description */}
          <p
            className={`mt-3.5 sm:mt-4 md:mt-5 text-[13px] sm:text-sm md:text-[14px] lg:text-[15px] leading-relaxed text-[#e2e8e4]/95 px-1 sm:px-2 md:px-0 ${
              showQuickCallForm ? "max-w-xl text-left" : "mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl text-center"
            }`}
          >
            {subheadline}
          </p>

          {/* Action Buttons */}
          <div
            className={`mt-5 sm:mt-6 md:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${
              showQuickCallForm ? "md:justify-start" : "justify-center"
            }`}
          >
            <Link
              href={showQuickCallForm ? "#hero-enquiry" : "/contact"}
              className="inline-flex items-center justify-center rounded-lg border border-[#445b4c] bg-[#1E2922]/85 px-4.5 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#152019] hover:border-[#B59439]/60 text-center"
            >
              <span>{primaryCta}</span>
            </Link>

            <Link
              href="/offerings"
              className="inline-flex items-center justify-center rounded-lg bg-[#B59439] px-4.5 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9c7e2e] hover:shadow-md text-center"
            >
              <span>{secondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* Quick Call Form - Controlled by Admin Toggle */}
        {showQuickCallForm && (
          <aside
            id="hero-enquiry"
            className="w-full min-w-0 justify-self-stretch overflow-hidden rounded-2xl border border-white/20 bg-white p-5 shadow-2xl shadow-black/30 md:justify-self-end md:w-full md:max-w-[340px] md:p-5 text-left"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F3F34]">
              {formEyebrow}
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#0b1f3a]">
              {formTitle}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
              {formDescription}
            </p>

            {status === "done" ? (
              <div className="mt-4 rounded-xl bg-[#e5ebe6] p-4 text-sm text-[#0b1f3a]">
                <p className="font-semibold">{formSuccess}</p>
                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-[#2F3F34] cursor-pointer"
                  onClick={() => setStatus("idle")}
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={onEnquiry} className="mt-3.5 grid min-w-0 gap-2.5">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="min-w-0 w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm text-[#0b1f3a] outline-none ring-[#2F3F34] focus:ring-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Work email"
                  className="min-w-0 w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm text-[#0b1f3a] outline-none ring-[#2F3F34] focus:ring-2"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="min-w-0 w-full rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm text-[#0b1f3a] outline-none ring-[#2F3F34] focus:ring-2"
                />
                {status === "error" ? (
                  <p className="text-xs text-[#b91c1c]">
                    {errorMessage || "Add an email or phone so we can reach you."}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-[#2F3F34] hover:bg-[#1a241e] text-white py-2.5 text-sm font-semibold shadow-md shadow-black/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    formButton
                  )}
                </button>
                <p className="text-center text-[11px] text-[#64748b]">
                  Or{" "}
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-semibold text-[#2F3F34] hover:underline"
                  >
                    call {phone}
                  </a>
                </p>
              </form>
            )}
          </aside>
        )}
      </div>

      {/* Docked Trust Metrics Banner on First Fold */}
      {activeMetrics.length > 0 && (
        <div className="relative z-10 w-full shrink-0 border-t border-white/10 bg-[#2F3F34] py-2 sm:py-2.5 shadow-sm text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid gap-x-4 gap-y-1.5 sm:gap-x-6 md:gap-x-8 ${
                activeMetrics.length === 1
                  ? "grid-cols-1 justify-items-center text-center"
                  : activeMetrics.length === 2
                  ? "grid-cols-2"
                  : activeMetrics.length === 3
                  ? "grid-cols-2 sm:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {activeMetrics.slice(0, 4).map((m, idx) => (
                <div key={m.label || idx} className="flex items-center gap-2 min-w-0">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B59439]" />
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <MetricCounter
                      value={m.value}
                      suffix={m.suffix}
                      prefix={m.prefix}
                      className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white leading-none"
                    />
                    <span className="text-[11px] sm:text-xs font-medium text-[#d1e0d7] leading-none truncate">
                      {m.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
