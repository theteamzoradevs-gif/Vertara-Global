"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  ClipboardCheck,
  Search,
  ArrowRight,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface WayToStartItem {
  icon: React.ElementType;
  title: string;
  description: string;
  cta: string;
  type: "modal" | "link";
  intent?: "Talk to a Vertara Practice Leader" | "Market research";
  href?: string;
}

const waysToStart: WayToStartItem[] = [
  {
    icon: Users,
    title: "Talk to a Vertara Practice Leader",
    description:
      "A 30-minute call with our Practice Leader or Founder about your plans.",
    cta: "Request a call",
    type: "modal",
    intent: "Talk to a Vertara Practice Leader",
  },
  {
    icon: ClipboardCheck,
    title: "Run your GCC assessment",
    description:
      "10 minutes of questions; a feasibility report within 2 business days, reviewed and approved by a Vertara practice expert. The assessment is free.",
    cta: "Start GCC assessment",
    type: "link",
    href: "/assessment",
  },
  {
    icon: Search,
    title: "Market research",
    description:
      "Commissioned research on sector GCC feasibility, workforce strategy, location assessment, talent insights, infrastructure, government policies, or another topic of interest.",
    cta: "Discuss research",
    type: "modal",
    intent: "Market research",
  },
];

const journeyOptions = [
  "Just exploring",
  "Building the business case",
  "Planning a pilot",
  "Ready to build",
  "Growing an existing centre",
];

export function ThreeWaysToStart() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<
    "Talk to a Vertara Practice Leader" | "Market research"
  >("Talk to a Vertara Practice Leader");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [journeyStage, setJourneyStage] = useState("");
  const [businessContext, setBusinessContext] = useState("");

  // Validation State
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    company?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    company?: boolean;
  }>({});

  // Submission State
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  // Lock background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && modalOpen) {
        handleCloseModal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  function handleOpenModal(
    intent: "Talk to a Vertara Practice Leader" | "Market research"
  ) {
    setModalIntent(intent);
    setModalOpen(true);
    setStatus("idle");
    setServerError("");
  }

  function handleCloseModal() {
    setModalOpen(false);
    // Reset form after exit transition
    setTimeout(() => {
      setName("");
      setEmail("");
      setCompany("");
      setRole("");
      setJourneyStage("");
      setBusinessContext("");
      setErrors({});
      setTouched({});
      setStatus("idle");
      setServerError("");
    }, 200);
  }

  function validate(fields = { name, email, company }) {
    const newErrors: { name?: string; email?: string; company?: string } = {};

    if (!fields.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Please enter your work email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      newErrors.email = "Please enter a valid work email address";
    }

    if (!fields.company.trim()) {
      newErrors.company = "Please enter your company name";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({ name: true, email: true, company: true });
    const validationErrors = validate({ name, email, company });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          intent: modalIntent,
          message: businessContext.trim(),
          source: "engage_with_us",
          metadata: {
            role: role.trim() || undefined,
            journeyStage: journeyStage || undefined,
            formIntent: modalIntent,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      {/* 2. THREE WAYS TO START SECTION */}
      <section
        className="relative w-full overflow-hidden bg-[#FAF9F5] py-16 sm:py-20 md:py-24 border-b border-[#D8D2C0]/70 font-sans"
        style={{ fontFamily: "Calibri" }}
      >
        <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Where to Begin
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#101C30] leading-tight">
              Three ways to start
            </h2>
          </div>

          {/* Responsive Cards Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {waysToStart.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#D8D2C0] bg-white p-7 sm:p-8 transition-all duration-300 hover:border-[#2F3F34] hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {/* Icon Badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F3F34]/8 text-[#2F3F34] border border-[#2F3F34]/15 transition-colors duration-300 group-hover:bg-[#2F3F34] group-hover:text-white">
                      <Icon className="h-6 w-6 transition-colors" />
                    </div>

                    {/* Card Title */}
                    <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] leading-snug">
                      {item.title}
                    </h3>

                    {/* Card Description - Italic as requested */}
                    <p className="mt-3.5 text-base sm:text-[1.05rem] leading-relaxed text-[#101C30]/80 italic">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-8 pt-5 border-t border-[#D8D2C0]/70">
                    {item.type === "modal" ? (
                      <button
                        type="button"
                        onClick={() => item.intent && handleOpenModal(item.intent)}
                        className="cursor-pointer inline-flex items-center gap-2 text-base font-bold text-[#2F3F34] transition-colors duration-200 group-hover:text-[#B59439]"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <Link
                        href={item.href || "/insights#assessment"}
                        className="inline-flex items-center gap-2 text-base font-bold text-[#2F3F34] transition-colors duration-200 group-hover:text-[#B59439]"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POP-UP MODAL FORM */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#101C30]/60 backdrop-blur-xs font-sans"
          style={{ fontFamily: "Calibri" }}
        >
          {/* Centering Wrapper that prevents clipping at top/bottom */}
          <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-left">
            {/* Backdrop click area */}
            <div
              className="fixed inset-0"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <div
              role="dialog"
              aria-modal="true"
              className="relative z-10 w-full max-w-[490px] my-4 sm:my-8 rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-[#D8D2C0] transition-all"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="cursor-pointer absolute top-5 right-5 sm:top-6 sm:right-6 p-1.5 rounded-lg text-[#101C30]/50 hover:text-[#101C30] hover:bg-[#F0EEE6] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Content */}
              {status === "success" ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2F3F34]/10 text-[#2F3F34]">
                    <CheckCircle2 className="h-8 w-8 text-[#2F3F34]" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#101C30]">
                    Thank you — message received
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-[#101C30]/80">
                    We'll reply within two business days. One of our Vertara practice leaders will review your situation and get back to you personally.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="cursor-pointer mt-6 inline-flex items-center justify-center rounded-xl bg-[#2F3F34] px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#233027]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  {/* Eyebrow & Title - Exactly as Image 2 */}
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                    DIRECT CONSULTATION
                  </p>
                  <h3 className="mt-1 text-2xl sm:text-[1.75rem] font-bold tracking-tight text-[#101C30] leading-snug">
                    {modalIntent === "Market research"
                      ? "Discuss Market Research"
                      : "Talk to a Vertara Practice Leader"}
                  </h3>

                  {serverError && (
                    <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3 sm:space-y-3.5">
                    {/* Name* */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                        Name <span className="text-[#B59439]">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) {
                            setErrors(validate({ name: e.target.value, email, company }));
                          }
                        }}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, name: true }));
                          setErrors(validate({ name, email, company }));
                        }}
                        placeholder="E.g. Sarah Jenkins"
                        className={`mt-1 w-full rounded-xl border px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors ${touched.name && errors.name
                          ? "border-red-500 bg-red-50/20 focus:border-red-500"
                          : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                          }`}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-xs font-medium text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Work email* & Company* */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Work email* */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                          Work email <span className="text-[#B59439]">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (touched.email) {
                              setErrors(validate({ name, email: e.target.value, company }));
                            }
                          }}
                          onBlur={() => {
                            setTouched((prev) => ({ ...prev, email: true }));
                            setErrors(validate({ name, email, company }));
                          }}
                          placeholder="sarah@company.com"
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors ${touched.email && errors.email
                            ? "border-red-500 bg-red-50/20 focus:border-red-500"
                            : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                            }`}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1 text-xs font-medium text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Company* */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                          Company <span className="text-[#B59439]">*</span>
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => {
                            setCompany(e.target.value);
                            if (touched.company) {
                              setErrors(validate({ name, email, company: e.target.value }));
                            }
                          }}
                          onBlur={() => {
                            setTouched((prev) => ({ ...prev, company: true }));
                            setErrors(validate({ name, email, company }));
                          }}
                          placeholder="E.g. Acme Corp"
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors ${touched.company && errors.company
                            ? "border-red-500 bg-red-50/20 focus:border-red-500"
                            : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                            }`}
                        />
                        {touched.company && errors.company && (
                          <p className="mt-1 text-xs font-medium text-red-600">
                            {errors.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Your role (optional) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                        Your role <span className="text-xs font-normal text-[#101C30]/60">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="E.g. Chief Technology Officer, VP Operations"
                        className="mt-1 w-full rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors focus:border-[#2F3F34]"
                      />
                    </div>

                    {/* Where are you in the GCC journey? <optional/drop down> */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                        Where are you in the GCC journey?{" "}
                        <span className="text-xs font-normal text-[#101C30]/60">(optional)</span>
                      </label>
                      <select
                        value={journeyStage}
                        onChange={(e) => setJourneyStage(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors focus:border-[#2F3F34] cursor-pointer"
                      >
                        <option value="">Select your stage (optional)</option>
                        {journeyOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Business Context Comment Box */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#101C30]">
                        Business Context
                      </label>
                      <textarea
                        rows={2}
                        value={businessContext}
                        onChange={(e) => setBusinessContext(e.target.value)}
                        placeholder="e.g. We're a 2,000-person engineering firm considering a 30-person team in India next year."
                        className="mt-1 w-full min-h-[72px] sm:min-h-[80px] rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 sm:py-2.5 text-sm sm:text-base outline-none transition-colors focus:border-[#2F3F34] resize-none"
                      />
                    </div>

                    {/* Submit Button: Send message */}
                    <div className="pt-1 sm:pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="cursor-pointer w-full rounded-xl bg-[#2F3F34] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#233027] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <span>Send message</span>
                        )}
                      </button>
                    </div>

                    {/* Under the button text */}
                    <p className="mt-2.5 sm:mt-3 text-center text-[11px] sm:text-xs leading-relaxed text-[#101C30]/75">
                      We'll reply within two business days. Your details stay confidential and are never shared or used for any marketing purposes. We won’t send any marketing emails after closing
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
