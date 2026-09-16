"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Metric } from "@/data/seed-content";

type Props = {
  metrics: Metric[];
  headline: string;
  image: string;
  phone?: string;
};

const STEPS = [
  { id: "goal", label: "What are you solving?" },
  { id: "scale", label: "Rough headcount & city?" },
  { id: "contact", label: "Where should we reply?" },
];

export function TrustPop({
  metrics,
  headline,
  phone = "+91 80 4000 1200",
}: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({
    intent: "",
    scale: "",
    name: "",
    company: "",
    email: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("trust-pop-dismissed") === "1") return;

    let triggered = false;
    const show = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const path = window.location.pathname;
    // Home: 10–15s · services & other pages: a bit longer
    const isHome = path === "/";
    const isService = path.startsWith("/services/");
    const delayMs = isHome
      ? 12000
      : isService
        ? 22000
        : 18000;

    const onScroll = () => {
      const depth =
        window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (depth > 0.45) show();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const timer = window.setTimeout(show, delayMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem("trust-pop-dismissed", "1");
  };

  async function finish() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          company: draft.company,
          email: draft.email,
          intent: draft.intent || "exploring",
          message: draft.scale,
          source: "trust_pop_brief",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
      sessionStorage.setItem("trust-pop-dismissed", "1");
    } catch {
      setError("Something went wrong. Try the contact page.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-3 pb-4 backdrop-blur-[4px] sm:items-center sm:p-8 sm:backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trust-pop-title"
        className="relative mb-1 w-full max-w-[min(100%,21rem)] overflow-hidden rounded-2xl bg-navy text-white shadow-2xl sm:mb-0 sm:max-w-md"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2.5 top-2.5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-white/10 px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
            Quick brief · 3 steps
          </p>
          <h2 id="trust-pop-title" className="mt-1 pr-8 text-base font-bold leading-snug sm:text-lg">
            {headline}
          </h2>
          <div className="mt-3 flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full ${
                  i <= step ? "bg-highlight" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-white/60">{STEPS[step]?.label}</p>
        </div>

        <div className="bg-white px-4 py-4 text-navy sm:px-5 sm:py-5">
          {done ? (
            <div className="rounded-xl bg-accent-soft p-4 text-sm">
              <p className="font-semibold">Brief locked in.</p>
              <p className="mt-1 text-muted">
                A partner will reply within one business day.
              </p>
              <Button type="button" onClick={dismiss} variant="secondary" size="sm" className="mt-3">
                Keep browsing
              </Button>
            </div>
          ) : (
            <>
              {step === 0 ? (
                <div className="grid gap-2">
                  {[
                    { value: "full_gcc", label: "Full GCC setup" },
                    { value: "talent", label: "Talent / hiring" },
                    { value: "workspace", label: "Workspace" },
                    { value: "operations", label: "Operations" },
                    { value: "advisory", label: "Advisory / business case" },
                    { value: "exploring", label: "Still exploring options" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setDraft((d) => ({ ...d, intent: opt.value }));
                        setStep(1);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                        draft.intent === opt.value
                          ? "border-accent bg-accent-soft text-navy"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-3">
                  <textarea
                    value={draft.scale}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, scale: e.target.value }))
                    }
                    rows={3}
                    placeholder="e.g. ~80 roles in Bangalore, Q3 start"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <p className="text-xs text-muted">
                    Optional — helps us prep before the call.
                  </p>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setStep(0)}>
                      Back
                    </Button>
                    <Button type="button" size="sm" className="flex-1" onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <form
                  className="grid min-w-0 gap-2.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void finish();
                  }}
                >
                  <input
                    required
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Your name"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <input
                    required
                    value={draft.company}
                    onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))}
                    placeholder="Company"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <input
                    required
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    placeholder="Work email"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                  />
                  {error ? <p className="text-sm text-danger">{error}</p> : null}
                  <div className="flex gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" size="sm" className="flex-1" disabled={submitting}>
                      {submitting ? "Sending…" : (
                        <>
                          Send brief <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : null}

              <ul className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11px] text-muted">
                {metrics.slice(0, 3).map((m) => (
                  <li key={m.label} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                    <span>
                      {m.prefix}
                      {m.value}
                      {m.suffix} {m.label.toLowerCase()}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                  Call back line {phone}
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
