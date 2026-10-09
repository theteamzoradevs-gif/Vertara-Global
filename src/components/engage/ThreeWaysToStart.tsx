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
  RotateCw,
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
    cta: "Discuss Market Research",
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
  const [gccFlipped, setGccFlipped] = useState(false);

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
              const isGccCard = item.title === "Run your GCC assessment";

              if (isGccCard) {
                return (
                  <div
                    key={index}
                    className="group relative min-h-[430px] rounded-2xl [perspective:1200px] cursor-pointer"
                    onMouseEnter={() => setGccFlipped(true)}
                    onMouseLeave={() => setGccFlipped(false)}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a, button")) return;
                      setGccFlipped((prev) => !prev);
                    }}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                        gccFlipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* FRONT FACE */}
                      <div className="h-full w-full rounded-2xl border border-[#cddcd1] bg-[#edf5ef] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group-hover:border-[#2F3F34] group-hover:shadow-xl [backface-visibility:hidden] [webkit-backface-visibility:hidden]">
                        <div>
                          {/* Icon Badge & Flip hint */}
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F3F34]/10 text-[#2F3F34] border border-[#2F3F34]/20 transition-colors duration-300 group-hover:bg-[#2F3F34] group-hover:text-white">
                              <Icon className="h-6 w-6 transition-colors" />
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8C7026] bg-[#B59439]/15 px-2.5 py-1 rounded-full border border-[#B59439]/30">
                              <span>Hover to flip</span>
                              <RotateCw className="h-3 w-3" />
                            </span>
                          </div>

                          {/* Card Title */}
                          <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-[#101C30] leading-snug">
                            {item.title}
                          </h3>

                          {/* Card Description */}
                          <p className="mt-3.5 text-base sm:text-[1.05rem] leading-relaxed text-[#101C30]/80 italic">
                            {item.description}
                          </p>
                        </div>

                        {/* Front CTA Button */}
                        <div className="mt-8 pt-1 flex justify-center w-full">
                          <Link
                            href={item.href || "/assessment"}
                            className="inline-flex items-center gap-2.5 rounded-xl bg-[#2F3F34] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md active:scale-[0.98]"
                          >
                            <span>{item.cta}</span>
                            <ArrowRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div className="absolute inset-0 h-full w-full rounded-2xl border-2 border-[#2F3F34] bg-[#edf5ef] p-6 sm:p-7 flex flex-col justify-between shadow-2xl [backface-visibility:hidden] [webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div>
                          {/* Back Header - No straight line */}
                          <div className="flex items-center justify-between pb-1">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B59439]">
                                What You Receive
                              </span>
                              <h4 className="text-base sm:text-lg font-bold text-[#101C30] leading-tight mt-0.5">
                                Confidential Feasibility Report
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setGccFlipped(false);
                              }}
                              className="cursor-pointer p-1.5 rounded-lg text-[#101C30]/60 hover:text-[#101C30] hover:bg-black/5 transition-colors"
                              title="Flip back"
                              aria-label="Flip back"
                            >
                              <RotateCw className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* 4 Feature Points - Kept short & readable */}
                          <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px] text-[#101C30] leading-snug">
                            <li className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#B59439] shrink-0 mt-1.5" />
                              <div>
                                <strong className="font-bold text-[#101C30]">10 Minutes:</strong>{" "}
                                <span className="text-[#101C30]/80">Short, structured questions about your business mandate.</span>
                              </div>
                            </li>

                            <li className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#B59439] shrink-0 mt-1.5" />
                              <div>
                                <strong className="font-bold text-[#101C30]">AI Engine + Expert Validated:</strong>{" "}
                                <span className="text-[#101C30]/80">Proprietary modeling personally validated by GCC practitioners.</span>
                              </div>
                            </li>

                            <li className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#B59439] shrink-0 mt-1.5" />
                              <div>
                                <strong className="font-bold text-[#101C30]">Delivered in 2 Business Days:</strong>{" "}
                                <span className="text-[#101C30]/80">Delivered directly to your inbox with a clear point of view.</span>
                              </div>
                            </li>

                            <li className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#B59439] shrink-0 mt-1.5" />
                              <div>
                                <strong className="font-bold text-[#101C30]">Strictly Confidential:</strong>{" "}
                                <span className="text-[#101C30]/80">Never used for marketing or sold to any third party.</span>
                              </div>
                            </li>
                          </ul>
                        </div>

                        {/* Back CTA Button - Centered in middle, no top divider line */}
                        <div className="mt-4 pt-1 flex justify-center w-full">
                          <Link
                            href={item.href || "/assessment"}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md active:scale-[0.98]"
                          >
                            <span>{item.cta}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-white" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="group relative min-h-[430px] flex flex-col justify-between rounded-2xl border border-[#cddcd1] bg-[#edf5ef] p-7 sm:p-8 transition-all duration-300 hover:border-[#2F3F34] hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {/* Icon Badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F3F34]/10 text-[#2F3F34] border border-[#2F3F34]/20 transition-colors duration-300 group-hover:bg-[#2F3F34] group-hover:text-white">
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

                  {/* CTA Action - Button centered in middle */}
                  <div className="mt-8 pt-1 flex justify-center w-full">
                    {item.type === "modal" ? (
                      <button
                        type="button"
                        onClick={() => item.intent && handleOpenModal(item.intent)}
                        className="cursor-pointer inline-flex items-center gap-2.5 rounded-xl bg-[#2F3F34] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md active:scale-[0.98]"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <Link
                        href={item.href || "/assessment"}
                        className="inline-flex items-center gap-2.5 rounded-xl bg-[#2F3F34] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md active:scale-[0.98]"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
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
