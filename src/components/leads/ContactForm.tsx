"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm({
  source = "contact",
  defaultIntent = "",
  submitLabel = "Send message",
  commitmentText = "We'll reply within one business day",
  title,
  description,
  buttonVariant = "primary",
  buttonClassName,
  className,
}: {
  source?: string;
  defaultIntent?: string;
  submitLabel?: string;
  commitmentText?: string;
  title?: string;
  description?: string;
  buttonVariant?: "primary" | "secondary" | "ghost" | "outline" | "gold";
  buttonClassName?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaSvg, setCaptchaSvg] = useState<string>("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);

  const fetchCaptcha = useCallback(async () => {
    try {
      setCaptchaLoading(true);
      const res = await fetch("/api/captcha", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCaptchaId(data.challengeId);
        setCaptchaSvg(data.svg);
        setCaptchaInput("");
      }
    } catch (err) {
      console.error("Failed to load CAPTCHA:", err);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");
    const form = new FormData(formEl);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone") || "",
          intent: form.get("journey") || form.get("intent") || "",
          message: form.get("message") || "",
          source,
          captchaId,
          captchaAnswer: captchaInput,
          metadata: {
            sector: form.get("sector") || "",
            journeyStage: form.get("journey") || "",
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Could not send. Please check your fields and try again.");
        fetchCaptcha();
        throw new Error(data.error || "fail");
      }

      formEl.reset();
      setCaptchaInput("");
      setStatus("done");
      fetchCaptcha();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className="w-full max-w-[500px] rounded-[28px] border border-[#B59439]/40 bg-[#101C30] p-8 text-white shadow-2xl font-sans"
        style={{ fontFamily: 'Calibri' }}
      >
        <p className="font-semibold text-xl text-white">Thank you — we received your enquiry.</p>
        <p className="mt-2 text-sm text-[#D8D2C0]">
          A partner will respond within one business day.
        </p>
        <Button
          type="button"
          className="mt-5 bg-[#B59439] hover:bg-[#9c7e2e] text-white font-sans rounded-xl px-6 py-2.5"
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
      style={{ fontFamily: 'Calibri' }}
      className={cn(
        "w-full max-w-[500px] space-y-4 rounded-[28px] border border-[#B59439]/20 bg-[#101C30] p-7 sm:p-8 shadow-2xl shadow-[#101C30]/30 font-sans",
        className,
      )}
    >
      {title || description ? (
        <div className="mb-4">
          {title ? (
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{title}</h3>
          ) : null}
          {description ? (
            <p className="mt-1 text-xs text-[#D8D2C0]">{description}</p>
          ) : null}
        </div>
      ) : null}

      {/* Row 1: Name & Work Email */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your Name" required />
        <Field label="Work Email" name="email" type="email" placeholder="name@company.com" required />
      </div>

      {/* Row 2: Company & Sector */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field label="Company" name="company" placeholder="Company Name" required />
        <Field label="Sector" name="sector" placeholder="e.g. Tech, Finance, Healthcare" />
      </div>

      {/* Row 3: Where are you in the GCC journey? */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white">
          Where are you in the GCC journey?
        </label>
        <select
          name="journey"
          defaultValue={defaultIntent || ""}
          className="w-full rounded-xl border border-transparent bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101C30] outline-none transition-colors focus:border-[#B59439] focus:ring-2 focus:ring-[#B59439]"
        >
          <option value="">Select your current stage</option>
          <option value="Exploring">Exploring</option>
          <option value="Nano GCC pilot">Nano GCC pilot</option>
          <option value="Business case">Business case</option>
          <option value="Ready to build">Ready to build</option>
          <option value="Scaling an existing centre">Scaling an existing centre</option>
        </select>
      </div>

      {/* Row 4: What would you like help with? */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white">
          What would you like help with?
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Tell us about your requirements..."
          className="w-full rounded-xl border border-transparent bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101C30] placeholder:text-[#526171]/70 outline-none transition-colors focus:border-[#B59439] focus:ring-2 focus:ring-[#B59439] resize-none"
        />
      </div>

      {/* Row 5: CAPTCHA Section matching Manager Reference UI */}
      <div className="space-y-3 pt-1">
        {/* Label 1: Human verification */}
        <div>

          {/* Dark rectangular CAPTCHA display area */}
          <div className="relative flex items-center justify-between rounded-xl border border-[#3E5245] bg-[#162235] px-4 py-2 shadow-inner">
            <div
              className="flex-1 flex items-center justify-center min-h-[48px]"
              aria-label="CAPTCHA image display"
            >
              {captchaLoading && !captchaSvg ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#B59439] border-t-transparent" />
              ) : captchaSvg ? (
                <div
                  className="w-full flex justify-center items-center select-none overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: captchaSvg }}
                />
              ) : (
                <span className="text-xs text-[#D8D2C0]">Failed to load challenge</span>
              )}
            </div>

            {/* Refresh challenge icon button */}
            <button
              type="button"
              onClick={fetchCaptcha}
              disabled={captchaLoading}
              className="ml-3 shrink-0 rounded-lg p-2 text-[#B59439] hover:bg-white/10 hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Generate new CAPTCHA"
              title="Get a new challenge"
            >
              <RotateCw className={cn("h-4 w-4", captchaLoading && "animate-spin")} />
            </button>
          </div>
        </div>

        {/* Label 2: Enter the characters shown above */}
        <div>

          <input
            id="captcha-input"
            type="text"
            name="captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter CAPTCHA"
            maxLength={6}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            required
            className="w-full rounded-xl border border-transparent bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-[#101C30] placeholder:text-[#526171]/70 placeholder:font-normal placeholder:tracking-normal outline-none transition-colors focus:border-[#B59439] focus:ring-2 focus:ring-[#B59439]"
          />
        </div>
      </div>

      {status === "error" ? (
        <p className="text-xs text-red-400 text-center font-medium">
          {errorMessage || "Could not send. Please check your fields and try again."}
        </p>
      ) : null}

      <div className="flex flex-col items-center justify-center pt-2">
        <Button
          type="submit"
          variant="gold"
          size="md"
          className={cn("w-full sm:w-auto px-8 py-3 text-sm sm:text-base font-bold bg-[#B59439] hover:bg-[#9c7e2e] text-white rounded-xl shadow-lg shadow-[#B59439]/30 hover:shadow-xl hover:shadow-[#B59439]/40 transition-all", buttonClassName)}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            "Sending..."
          ) : (
            <>
              {submitLabel} <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
        {commitmentText ? (
          <p className="mt-2.5 text-xs text-[#D8D2C0]/90 text-center font-normal">
            {commitmentText}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white">
        {label}
        {required ? <span className="ml-0.5 text-[#B59439] font-bold">*</span> : null}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-transparent bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#101C30] placeholder:text-[#526171]/70 outline-none transition-colors focus:border-[#B59439] focus:ring-2 focus:ring-[#B59439]"
      />
    </div>
  );
}
