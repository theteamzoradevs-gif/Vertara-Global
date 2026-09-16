"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function ContactForm({
  source = "contact",
  defaultIntent = "",
  submitLabel = "Book a consultation",
}: {
  source?: string;
  defaultIntent?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
          intent: form.get("intent"),
          message: form.get("message"),
          source,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent-soft p-5 text-navy shadow-sm sm:p-6">
        <p className="font-semibold">Thank you — we received your enquiry.</p>
        <p className="mt-2 text-sm text-slate">
          A partner will respond within one business day.
        </p>
        <Button
          type="button"
          className="mt-4"
          variant="secondary"
          size="sm"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full min-w-0 max-w-full space-y-4 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="rounded-xl bg-surface px-3 py-2.5 text-xs leading-relaxed text-muted sm:text-sm">
        No ballpark rates here — tell us the brief and we&apos;ll arrange a scoped conversation.
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div className="min-w-0">
        <label className="mb-1.5 block text-sm font-medium text-navy">
          What are you looking to do?
        </label>
        <select
          name="intent"
          required
          defaultValue={defaultIntent || ""}
          className="min-w-0 w-full max-w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="full_gcc">Full GCC setup</option>
          <option value="talent">Talent</option>
          <option value="workspace">Workspace</option>
          <option value="operations">Operations</option>
          <option value="advisory">Advisory</option>
          <option value="exploring">Exploring options</option>
        </select>
      </div>
      <div className="min-w-0">
        <label className="mb-1.5 block text-sm font-medium text-navy">
          Message (optional)
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="City, headcount, timeline, or anything a partner should know…"
          className="min-w-0 w-full max-w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-danger">Could not send. Please try again.</p>
      ) : null}
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? (
          "Sending…"
        ) : (
          <>
            {submitLabel} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-sm font-medium text-navy">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="min-w-0 w-full max-w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
      />
    </div>
  );
}
