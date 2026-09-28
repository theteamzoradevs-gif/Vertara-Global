"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MetricCounter } from "@/components/ui/MetricCounter";
import type { Metric } from "@/data/seed-content";
import { seedSettings } from "@/data/seed-content";

type Props = {
  tagline: string;
  headline: string;
  subheadline: string;
  metrics: Metric[];
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
};

export function Hero({
  tagline,
  headline,
  subheadline,
  metrics,
  phone = "+91 80 4000 1200",
  primaryCta = seedSettings.heroPrimaryCta,
  secondaryCta = seedSettings.heroSecondaryCta,
  formEyebrow = seedSettings.heroFormEyebrow,
  formTitle = seedSettings.heroFormTitle,
  formDescription = seedSettings.heroFormDescription,
  formButton = seedSettings.heroFormButton,
  formSuccess = seedSettings.heroFormSuccess,
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
          company: "â€”",
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

  return (
    <section className="relative flex flex-col justify-between overflow-hidden border-b border-border min-h-[calc(100svh-68px)] bg-[#061526]">

      <div className="relative mx-auto my-auto grid w-full max-w-6xl items-center gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.75fr)] md:gap-10 md:py-6 lg:gap-14 lg:px-8 lg:py-6">
        <div className="w-full min-w-0 md:pr-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            {tagline}
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.14]">
            {headline}
          </h1>
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-3.5 md:text-base">
            {subheadline}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              {primaryCta}
            </Button>
            <Button
              href="/services"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
            >
              {secondaryCta}
            </Button>
          </div>
        </div>

        <aside
          id="hero-enquiry"
          className="w-full min-w-0 justify-self-stretch overflow-hidden rounded-2xl border border-white/20 bg-white p-5 shadow-2xl shadow-black/30 md:justify-self-end md:w-full md:max-w-[340px] md:p-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            {formEyebrow}
          </p>
          <h2 className="mt-1 text-lg font-bold text-navy">
            {formTitle}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {formDescription}
          </p>

          {status === "done" ? (
            <div className="mt-4 rounded-xl bg-accent-soft p-4 text-sm text-navy">
              <p className="font-semibold">{formSuccess}</p>
              <button
                type="button"
                className="mt-3 text-sm font-semibold text-accent"
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
                className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              />
              <input
                name="email"
                type="email"
                placeholder="Work email"
                className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              />
              {status === "error" ? (
                <p className="text-xs text-danger">
                  {errorMessage || "Add an email or phone so we can reach you."}
                </p>
              ) : null}
              <Button
                type="submit"
                size="lg"
                className="w-full !bg-[#2F3F34] hover:!bg-[#1a241e] text-white shadow-md shadow-black/20 hover:shadow-lg transition-all"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sendingâ€¦
                  </>
                ) : (
                  formButton
                )}
              </Button>
              <p className="text-center text-[11px] text-muted">
                Or{" "}
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="font-semibold text-accent hover:underline"
                >
                  call {phone}
                </a>
              </p>
            </form>
          )}
        </aside>
      </div>

      {/* Docked Trust Metrics Banner on First Fold */}
      {metrics && metrics.length > 0 && (
        <div className="relative z-10 w-full border-t border-[#2F3F34] bg-[#2F3F34] pt-3 pb-3.5 shadow-sm text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-x-8 md:grid-cols-4 md:gap-x-10">
              {metrics.slice(0, 4).map((m) => (
                <div key={m.label} className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b49339] sm:h-4.5 sm:w-4.5" />
                  <div className="flex flex-col">
                    <MetricCounter
                      value={m.value}
                      suffix={m.suffix}
                      prefix={m.prefix}
                      className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight"
                    />
                    <span className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#d1e0d7] leading-tight">
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
