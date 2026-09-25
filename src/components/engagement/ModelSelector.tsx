"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Model = {
  slug: string;
  name: string;
  summary: string;
  engagementLength: string;
  ownership: string;
  setupTime: string;
  bestFit: string;
  costProfile: string;
  practiceSteps: { title: string; detail: string }[];
  selectorTags: {
    teamSize: string[];
    timeline: string[];
    ownership: string[];
  };
};

const questions = [
  {
    key: "teamSize" as const,
    label: "Approximate India team size in year one?",
    options: [
      { value: "1-50", label: "1–50" },
      { value: "50-200", label: "50–200" },
      { value: "200+", label: "200+" },
    ],
  },
  {
    key: "timeline" as const,
    label: "When do you need a productive team?",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "3-6", label: "3–6 months" },
      { value: "6-12", label: "6–12 months" },
      { value: "flexible", label: "Flexible / exploring" },
    ],
  },
  {
    key: "ownership" as const,
    label: "Preferred ownership posture?",
    options: [
      { value: "captive", label: "Wholly-owned captive" },
      { value: "managed", label: "Managed team for now" },
      { value: "shared", label: "Flexible / hybrid" },
    ],
  },
];

export function ModelSelector({ models }: { models: Model[] }) {
  const [answers, setAnswers] = useState({
    teamSize: "",
    timeline: "",
    ownership: "",
  });
  const [submittedLead, setSubmittedLead] = useState(false);

  const ranked = useMemo(() => {
    return models
      .map((m) => {
        let score = 0;
        (Object.keys(answers) as (keyof typeof answers)[]).forEach((key) => {
          const val = answers[key];
          if (val && m.selectorTags[key]?.includes(val)) score += 1;
        });
        return { model: m, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [answers, models]);

  const best = ranked[0]?.score
    ? ranked[0].model
    : answers.teamSize || answers.timeline || answers.ownership
      ? ranked[0]?.model
      : null;

  const complete = Boolean(
    answers.teamSize && answers.timeline && answers.ownership,
  );

  async function captureSoftLead() {
    if (!best || submittedLead) return;
    const name = window.prompt("Optional: your name so we can follow up?");
    if (!name) return;
    const email = window.prompt("Work email?");
    if (!email) return;
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        intent: best.slug,
        source: "engagement_selector",
        metadata: { answers, recommended: best.slug },
      }),
    });
    setSubmittedLead(true);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
        <h3 className="text-xl font-bold text-navy">Find your fit</h3>
        <p className="mt-2 text-sm text-muted">
          Answer three questions — we&apos;ll highlight the model that usually fits.
        </p>
        <div className="mt-6 space-y-6">
          {questions.map((q) => (
            <div key={q.key}>
              <p className="text-sm font-semibold text-navy">{q.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.key]: opt.value }))
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      answers[q.key] === opt.value
                        ? "border-accent bg-accent-soft text-navy"
                        : "border-border text-slate hover:border-accent/50",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {complete && best ? (
          <div className="mt-6 rounded-xl bg-accent-soft p-4">
            <p className="text-sm font-semibold text-navy">
              Recommended: {best.name}
            </p>
            <p className="mt-1 text-sm text-muted">{best.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button href={`#model-${best.slug}`} size="sm">
                See how it works
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={captureSoftLead}
              >
                {submittedLead ? "Saved — thank you" : "Share details for follow-up"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#cddcd1] bg-surface-elevated">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-[#2e3f33] text-white">
            <tr>
              <th className="sticky left-0 bg-[#2e3f33] px-4 py-3 font-semibold">Criteria</th>
              {models.map((m) => (
                <th
                  key={m.slug}
                  className={cn(
                    "px-4 py-3 font-semibold transition-colors",
                    best?.slug === m.slug && "bg-[#b49339] text-white",
                  )}
                >
                  {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["Engagement length", "engagementLength"],
                ["Ownership", "ownership"],
                ["Setup time", "setupTime"],
                ["Best fit", "bestFit"],
                ["Cost profile", "costProfile"],
              ] as const
            ).map(([label, key]) => (
              <tr key={key} className="border-t border-border">
                <th className="sticky left-0 bg-surface-elevated px-4 py-3 font-semibold text-navy">
                  {label}
                </th>
                {models.map((m) => (
                  <td
                    key={m.slug}
                    className={cn(
                      "px-4 py-3 text-muted transition-colors",
                      best?.slug === m.slug && "bg-accent-soft/60 text-navy",
                    )}
                  >
                    {m[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6 md:hidden">
        {models.map((m) => (
          <div
            key={m.slug}
            className={cn(
              "rounded-2xl border p-5",
              best?.slug === m.slug
                ? "border-accent bg-accent-soft/40"
                : "border-border bg-surface-elevated",
            )}
          >
            <h4 className="font-bold text-navy">{m.name}</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="font-semibold text-navy">Setup time</dt>
                <dd className="text-muted">{m.setupTime}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Ownership</dt>
                <dd className="text-muted">{m.ownership}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Best fit</dt>
                <dd className="text-muted">{m.bestFit}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
