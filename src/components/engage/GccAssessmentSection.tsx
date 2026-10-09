"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  ClipboardList,
  Check,
  ChevronDown,
} from "lucide-react";

// Q1 Options
const sectorOptions = [
  "Engineering & ER&D",
  "FMCG & Retail",
  "Healthcare & Life Sciences",
  "Wealth Management, PE & Insurance",
  "Manufacturing",
  "Mining & Metals",
  "Travel, Leisure, Hospitality",
  "Tech, AI and Services",
  "Other / not listed",
];

// Q2 Options
const currentStageOptions = [
  "Exploring the idea",
  "Business case in progress",
  "Approved, not yet built",
  "Operating a centre we want to scale or fix",
];

// Q3 Options
const sizeOptions = [
  "Under 50 people",
  "50–150",
  "150–500",
  "500+",
  "Not decided",
];

// Q4 Options (up to 2)
const purposeOptions = [
  "Cost reduction",
  "Innovation centre",
  "Capability mandate agreed by leadership",
  "Other",
];

// Q6 Multi-select chips
const functionChips = [
  "Software engineering",
  "Data analytics",
  "AI / ML",
  "IT infrastructure & support",
  "Cybersecurity operations",
  "Finance & accounting",
  "Procurement & supply chain",
  "HR operations & shared services",
  "Customer support",
  "R&D and design engineering",
  "Legal operations",
  "Quality, compliance & regulatory operations",
  "Other",
];

// Q7 Options
const localKnowledgeOptions = [
  "Very little",
  "Some, but it can be documented",
  "A lot",
  "Not sure",
];

// Q8 Options
const regulatedOptions = ["No", "Yes", "Not sure"];

// Q9 Options
const operatingModelOptions = [
  "Captive entity",
  "Build-operate-transfer",
  "Managed / partner-operated centre",
  "Employer of record to start",
  "Undecided",
];

// Q10 Options
const productivityTimelineOptions = [
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
  "No fixed deadline",
];

// Q11 Multi-select Options
const realityOptions = [
  "Budget approved for the centre",
  "Leadership sponsor named",
  "Neither yet",
];

export function GccAssessmentSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Phase 1 Answers
  const [q1Sector, setQ1Sector] = useState("");
  const [q1Other, setQ1Other] = useState("");
  const [q2Stage, setQ2Stage] = useState("");
  const [q3Size, setQ3Size] = useState("");
  const [q4Purpose, setQ4Purpose] = useState<string[]>([]);
  const [q4Other, setQ4Other] = useState("");
  const [q4Open, setQ4Open] = useState(false);

  // Phase 2 Answers
  const [q5CapabilityGap, setQ5CapabilityGap] = useState("");
  const [q6Functions, setQ6Functions] = useState<string[]>([]);
  const [q6Other, setQ6Other] = useState("");
  const [q6Open, setQ6Open] = useState(false);
  const [q7LocalKnowledge, setQ7LocalKnowledge] = useState("");
  const [q8Regulated, setQ8Regulated] = useState("");

  // Phase 3 Answers
  const [q9OperatingModel, setQ9OperatingModel] = useState("");
  const [q10Timeline, setQ10Timeline] = useState("");
  const [q11Truth, setQ11Truth] = useState<string[]>([]);
  const [q11Open, setQ11Open] = useState(false);
  const [q12Constraints, setQ12Constraints] = useState("");

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  // Helper toggle for Q4 (up to 2)
  function togglePurpose(val: string) {
    if (q4Purpose.includes(val)) {
      setQ4Purpose(q4Purpose.filter((p) => p !== val));
    } else {
      if (q4Purpose.length >= 2) return; // Cap at 2
      setQ4Purpose([...q4Purpose, val]);
    }
  }

  // Helper toggle for Q6 (multi-select chips)
  function toggleFunction(val: string) {
    if (q6Functions.includes(val)) {
      setQ6Functions(q6Functions.filter((f) => f !== val));
    } else {
      setQ6Functions([...q6Functions, val]);
    }
  }

  // Helper toggle for Q11 (multi-select)
  function toggleTruth(val: string) {
    if (val === "Neither yet") {
      setQ11Truth(["Neither yet"]);
      return;
    }
    const filtered = q11Truth.filter((item) => item !== "Neither yet");
    if (filtered.includes(val)) {
      setQ11Truth(filtered.filter((item) => item !== val));
    } else {
      setQ11Truth([...filtered, val]);
    }
  }

  // Validation per step
  function validateStep(currentStep: 1 | 2 | 3) {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!q1Sector) errs.q1 = "Please select your business sector.";
      if (q1Sector === "Other / not listed" && !q1Other.trim()) {
        errs.q1Other = "Please specify your sector.";
      }
      if (!q2Stage) errs.q2 = "Please select where you are today.";
      if (!q3Size) errs.q3 = "Please select the target size.";
      if (q4Purpose.length === 0) errs.q4 = "Please choose at least 1 main purpose (up to 2).";
      if (q4Purpose.includes("Other") && !q4Other.trim()) {
        errs.q4Other = "Please describe the purpose.";
      }
    } else if (currentStep === 2) {
      if (!q5CapabilityGap.trim()) {
        errs.q5 = "Please describe what this centre must do.";
      }
      if (q6Functions.length === 0) {
        errs.q6 = "Please select at least one function.";
      }
      if (q6Functions.includes("Other") && !q6Other.trim()) {
        errs.q6Other = "Please specify the other function.";
      }
      if (!q7LocalKnowledge) {
        errs.q7 = "Please select local knowledge dependency.";
      }
      if (!q8Regulated) {
        errs.q8 = "Please select regulation status.";
      }
    } else if (currentStep === 3) {
      if (!q9OperatingModel) errs.q9 = "Please select your preferred operating model.";
      if (!q10Timeline) errs.q10 = "Please select your productivity timeline.";
      if (q11Truth.length === 0) errs.q11 = "Please select current status.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      if (step === 1) setStep(2);
      else if (step === 2) setStep(3);
      // Smooth scroll back to section top
      document.getElementById("gcc-assessment")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    document.getElementById("gcc-assessment")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(3)) return;

    setStatus("loading");
    setServerError("");

    const fullPayload = {
      name: "GCC Assessment Inquiry",
      email: "assessment@vertaraglobal.com",
      company: q1Sector || "Confidential",
      intent: "GCC Feasibility Assessment",
      source: "gcc_assessment",
      message: `Key Capability Gap: ${q5CapabilityGap}\nConstraints: ${q12Constraints}`,
      metadata: {
        assessmentAnswers: {
          q1_sector: q1Sector === "Other / not listed" ? `Other: ${q1Other}` : q1Sector,
          q2_stage: q2Stage,
          q3_size: q3Size,
          q4_purpose: q4Purpose.map((p) => (p === "Other" ? `Other: ${q4Other}` : p)),
          q5_capabilityGap: q5CapabilityGap,
          q6_functions: q6Functions.map((f) => (f === "Other" ? `Other: ${q6Other}` : f)),
          q7_localKnowledge: q7LocalKnowledge,
          q8_regulated: q8Regulated,
          q9_operatingModel: q9OperatingModel,
          q10_timeline: q10Timeline,
          q11_truth: q11Truth,
          q12_constraints: q12Constraints,
        },
      },
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullPayload),
      });

      if (!res.ok) throw new Error("Could not submit assessment. Please try again.");
      setStatus("success");
      document.getElementById("gcc-assessment")?.scrollIntoView({ behavior: "smooth" });
    } catch (err: unknown) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Submission error. Please try again."
      );
    }
  }

  return (
    <section
      id="gcc-assessment"
      className="relative w-full overflow-hidden bg-[#FAF9F5] py-16 sm:py-20 md:py-24 border-t border-[#D8D2C0]/70 font-sans scroll-mt-20"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Perfectly aligned with first sections */}
        <div className="text-left">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
            FEASIBILITY ASSESSMENT
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#101C30] leading-tight">
            Questions for Conduct a GCC assessment
          </h2>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-[#101C30]/80 italic">
            10 minutes of structured questions. A feasibility report delivered within 2 business days, reviewed and approved by a Vertara practice expert. The assessment is free and confidential.
          </p>
        </div>

        {/* Success Confirmation View */}
        {status === "success" ? (
          <div className="mt-10 sm:mt-12 rounded-[24px] border border-[#D8D2C0] bg-white p-8 sm:p-12 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2F3F34]/10 text-[#2F3F34]">
              <CheckCircle2 className="h-10 w-10 text-[#2F3F34]" />
            </div>
            <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-[#101C30]">
              Assessment Submitted Successfully
            </h3>
            <p className="mt-3 max-w-xl mx-auto text-base sm:text-lg text-[#101C30]/80 leading-relaxed">
              Your feasibility assessment inputs have been safely received. A Vertara practice expert will personally review and validate your model.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setStep(1);
                }}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-6 py-3 font-bold text-white hover:bg-[#233027] transition-all shadow-md"
              >
                <span>Run another assessment</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 sm:mt-12 rounded-[24px] border border-[#D8D2C0] bg-white p-6 sm:p-10 shadow-xl">
            {/* Step Progress Tracker */}
            <div className="mb-8 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B59439]">
                    Step {step} of 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#101C30] mt-0.5">
                    {step === 1 && "Phase 1: Business Context & Scope"}
                    {step === 2 && "Phase 2: Capability, Functions & Portability"}
                    {step === 3 && "Phase 3: Operating Model, Readiness & Report Delivery"}
                  </h3>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-16 rounded-full transition-all ${step >= 1 ? "bg-[#2F3F34]" : "bg-[#D8D2C0]"}`} />
                  <div className={`h-2.5 w-16 rounded-full transition-all ${step >= 2 ? "bg-[#2F3F34]" : "bg-[#D8D2C0]"}`} />
                  <div className={`h-2.5 w-16 rounded-full transition-all ${step >= 3 ? "bg-[#2F3F34]" : "bg-[#D8D2C0]"}`} />
                </div>
              </div>
            </div>

            {serverError && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 border border-red-200">
                {serverError}
              </div>
            )}

            {/* PHASE 1 (Questions 1 - 4) */}
            {step === 1 && (
              <div className="space-y-8">
                {/* Row 1: Q1 (Sector) & Q2 (Current stage) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Q1: Sector */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        1
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Which sector best describes your business? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q1Sector}
                          onChange={(e) => setQ1Sector(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select your sector</option>
                          {sectorOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>

                      {q1Sector === "Other / not listed" && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={q1Other}
                            onChange={(e) => setQ1Other(e.target.value)}
                            placeholder="Please specify your sector"
                            className="w-full rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#2F3F34]"
                          />
                          {errors.q1Other && (
                            <p className="mt-1 text-xs text-red-600">{errors.q1Other}</p>
                          )}
                        </div>
                      )}
                      {errors.q1 && <p className="mt-1 text-xs text-red-600">{errors.q1}</p>}
                    </div>
                  </div>

                  {/* Q2: Current stage */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        2
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Where are you today with a capability centre? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q2Stage}
                          onChange={(e) => setQ2Stage(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select where you are today</option>
                          {currentStageOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                      {errors.q2 && <p className="mt-1 text-xs text-red-600">{errors.q2}</p>}
                    </div>
                  </div>
                </div>

                {/* Row 2: Q3 (Size) & Q4 (Main purpose) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-1">
                  {/* Q3: Size within 3 years */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        3
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        What size are you considering within three years? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q3Size}
                          onChange={(e) => setQ3Size(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select size within three years</option>
                          {sizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                      {errors.q3 && <p className="mt-1 text-xs text-red-600">{errors.q3}</p>}
                    </div>
                  </div>

                  {/* Q4: Main purpose */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        4
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        What is the main purpose of the centre? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">
                      Multi-select, up to 2 ({q4Purpose.length}/2 selected)
                    </p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={() => setQ4Open(!q4Open)}
                          className="w-full flex items-center justify-between rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 text-sm sm:text-base text-[#101C30] font-medium text-left outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <span className={q4Purpose.length === 0 ? "text-[#101C30]/50" : "text-[#101C30] font-semibold truncate"}>
                            {q4Purpose.length === 0
                              ? "Select main purpose (up to 2)"
                              : q4Purpose.map((p) => (p === "Other" && q4Other ? `Other: ${q4Other}` : p)).join(", ")}
                          </span>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-[#101C30]/60 ${q4Open ? "rotate-180" : ""}`} />
                        </button>

                        {q4Open && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setQ4Open(false)} />
                            <div className="absolute top-full left-0 right-0 z-20 mt-1.5 rounded-xl border border-[#D8D2C0] bg-white p-2 shadow-xl">
                              {purposeOptions.map((opt) => {
                                const isSelected = q4Purpose.includes(opt);
                                const isDisabled = !isSelected && q4Purpose.length >= 2;
                                return (
                                  <div
                                    key={opt}
                                    onClick={() => {
                                      if (isDisabled) return;
                                      togglePurpose(opt);
                                    }}
                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDisabled
                                      ? "opacity-40 cursor-not-allowed"
                                      : isSelected
                                        ? "bg-[#edf5ef] text-[#2F3F34] font-bold cursor-pointer"
                                        : "text-[#101C30] hover:bg-[#FAF9F5] cursor-pointer"
                                      }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? "border-[#2F3F34] bg-[#2F3F34] text-white" : "border-[#cddcd1] bg-white"}`}>
                                        {isSelected && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <span>{opt}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      {q4Purpose.includes("Other") && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={q4Other}
                            onChange={(e) => setQ4Other(e.target.value)}
                            placeholder="Please specify other purpose"
                            className="w-full rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#2F3F34]"
                          />
                          {errors.q4Other && (
                            <p className="mt-1 text-xs text-red-600">{errors.q4Other}</p>
                          )}
                        </div>
                      )}
                      {errors.q4 && <p className="mt-1 text-xs text-red-600">{errors.q4}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PHASE 2 (Questions 5 - 8) */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Row 1: Q5 (Capability gap) & Q6 (Functions to move) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Q5: Capability gap */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        5
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        In one or two lines, what must this centre be able to do that you can't do today? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <textarea
                        rows={3}
                        maxLength={500}
                        value={q5CapabilityGap}
                        onChange={(e) => setQ5CapabilityGap(e.target.value)}
                        placeholder="e.g. Scale 24/7 engineering bandwidth, accelerate our core product roadmap, and build deep in-house AI capabilities."
                        className="w-full rounded-xl border border-[#D8D2C0] bg-white p-3.5 text-sm sm:text-base outline-none focus:border-[#2F3F34] resize-none"
                      />
                      <div className="flex justify-between items-center mt-1 text-xs text-[#101C30]/50">
                        <span>{errors.q5 ? <span className="text-red-600">{errors.q5}</span> : ""}</span>
                        <span>{q5CapabilityGap.length} / 500 characters</span>
                      </div>
                    </div>
                  </div>

                  {/* Q6: Functions to move */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        6
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Which functions do you want to move to the centre and grow there? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Multi-select dropdown</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={() => setQ6Open(!q6Open)}
                          className="w-full flex items-center justify-between rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 text-sm sm:text-base text-[#101C30] font-medium text-left outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <span className={q6Functions.length === 0 ? "text-[#101C30]/50" : "text-[#101C30] font-semibold"}>
                            {q6Functions.length === 0
                              ? "Select functions to move (select all that apply)"
                              : `${q6Functions.length} function${q6Functions.length > 1 ? "s" : ""} selected`}
                          </span>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-[#101C30]/60 ${q6Open ? "rotate-180" : ""}`} />
                        </button>

                        {/* Display selected tags below dropdown */}
                        {q6Functions.length > 0 && !q6Open && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {q6Functions.map((fn) => (
                              <span
                                key={fn}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#edf5ef] border border-[#cddcd1] text-[#2F3F34]"
                              >
                                {fn === "Other" && q6Other ? `Other: ${q6Other}` : fn}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFunction(fn);
                                  }}
                                  className="hover:text-red-600 font-bold ml-0.5 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {q6Open && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setQ6Open(false)} />
                            <div className="absolute top-full left-0 right-0 z-20 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-[#D8D2C0] bg-white p-2 shadow-xl">
                              {functionChips.map((chip) => {
                                const isSelected = q6Functions.includes(chip);
                                return (
                                  <div
                                    key={chip}
                                    onClick={() => toggleFunction(chip)}
                                    className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isSelected
                                      ? "bg-[#edf5ef] text-[#2F3F34] font-bold"
                                      : "text-[#101C30] hover:bg-[#FAF9F5]"
                                      }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${isSelected ? "border-[#2F3F34] bg-[#2F3F34] text-white" : "border-[#cddcd1] bg-white"}`}>
                                        {isSelected && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <span>{chip}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      {q6Functions.includes("Other") && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={q6Other}
                            onChange={(e) => setQ6Other(e.target.value)}
                            placeholder="Please specify other function(s)"
                            className="w-full rounded-xl border border-[#D8D2C0] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#2F3F34]"
                          />
                          {errors.q6Other && (
                            <p className="mt-1 text-xs text-red-600">{errors.q6Other}</p>
                          )}
                        </div>
                      )}
                      {errors.q6 && <p className="mt-1 text-xs text-red-600">{errors.q6}</p>}
                    </div>
                  </div>
                </div>

                {/* Row 2: Q7 (Local knowledge) & Q8 (Regulated) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-1">
                  {/* Q7: Local knowledge */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        7
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        How much does the work depend on undocumented local knowledge or relationships? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q7LocalKnowledge}
                          onChange={(e) => setQ7LocalKnowledge(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select local knowledge dependency</option>
                          {localKnowledgeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                      {errors.q7 && <p className="mt-1 text-xs text-red-600">{errors.q7}</p>}
                    </div>
                  </div>

                  {/* Q8: Regulated */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        8
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Is any of this work regulated, licensed or restricted from being done offshore? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q8Regulated}
                          onChange={(e) => setQ8Regulated(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select offshore restriction status</option>
                          {regulatedOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                    </div>
                    {errors.q8 && <p className="mt-1 text-xs text-red-600 pl-8">{errors.q8}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* PHASE 3 (Questions 9 - 12) */}
            {step === 3 && (
              <div className="space-y-8">
                {/* Row 1: Q9 (Preferred operating model) & Q10 (Productivity timeline) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Q9: Preferred operating model */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        9
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Do you have a preferred operating model today? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q9OperatingModel}
                          onChange={(e) => setQ9OperatingModel(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select preferred operating model</option>
                          {operatingModelOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                      {errors.q9 && <p className="mt-1 text-xs text-red-600">{errors.q9}</p>}
                    </div>
                  </div>

                  {/* Q10: How quickly must the first team be productive? */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        10
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        How quickly must the first team be productive? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Single choice</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <select
                          value={q10Timeline}
                          onChange={(e) => setQ10Timeline(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 pr-10 text-sm sm:text-base text-[#101C30] font-medium outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <option value="">Select target productivity timeline</option>
                          {productivityTimelineOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#101C30]/60" />
                      </div>
                    </div>
                    {errors.q10 && <p className="mt-1 text-xs text-red-600 pl-8">{errors.q10}</p>}
                  </div>
                </div>

                {/* Row 2: Q11 (Truth today) & Q12 (Constraints) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-1">
                  {/* Q11: Which of these is true today? */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        11
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Which of these is true today? <span className="text-[#B59439]">*</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Multi-select dropdown</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={() => setQ11Open(!q11Open)}
                          className="w-full flex items-center justify-between rounded-xl border border-[#cddcd1] bg-[#edf5ef] px-4 py-3 text-sm sm:text-base text-[#101C30] font-medium text-left outline-none transition-colors focus:border-[#2F3F34] focus:bg-white cursor-pointer"
                        >
                          <span className={q11Truth.length === 0 ? "text-[#101C30]/50" : "text-[#101C30] font-semibold truncate"}>
                            {q11Truth.length === 0
                              ? "Select what is true today"
                              : q11Truth.join(", ")}
                          </span>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-[#101C30]/60 ${q11Open ? "rotate-180" : ""}`} />
                        </button>

                        {/* Display selected chips below dropdown */}
                        {q11Truth.length > 0 && !q11Open && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {q11Truth.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#edf5ef] border border-[#cddcd1] text-[#2F3F34]"
                              >
                                {item}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTruth(item);
                                  }}
                                  className="hover:text-red-600 font-bold ml-0.5 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {q11Open && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setQ11Open(false)} />
                            <div className="absolute top-full left-0 right-0 z-20 mt-1.5 rounded-xl border border-[#D8D2C0] bg-white p-2 shadow-xl">
                              <div className="space-y-1">
                                {realityOptions.map((opt) => {
                                  const isSelected = q11Truth.includes(opt);
                                  return (
                                    <div
                                      key={opt}
                                      onClick={() => toggleTruth(opt)}
                                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        isSelected
                                          ? "bg-[#edf5ef] text-[#2F3F34] font-bold"
                                          : "text-[#101C30] hover:bg-[#FAF9F5]"
                                      }`}
                                    >
                                      <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "border-[#2F3F34] bg-[#2F3F34] text-white" : "border-[#cddcd1] bg-white"}`}>
                                        {isSelected && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <span>{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mt-2 pt-2 border-t border-[#D8D2C0]/50 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setQ11Open(false)}
                                  className="px-3 py-1 rounded-lg bg-[#2F3F34] text-xs font-bold text-white hover:bg-[#233027] cursor-pointer"
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {errors.q11 && <p className="mt-1 text-xs text-red-600">{errors.q11}</p>}
                    </div>
                  </div>

                  {/* Q12: Constraints / Board conditions */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B59439]/15 text-xs font-bold text-[#8C7026]">
                        12
                      </span>
                      <label className="text-base sm:text-lg font-bold text-[#101C30]">
                        Is there a constraint, deadline or board condition we should design around?
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#101C30]/60 pl-8">Long text</p>

                    <div className="mt-3 pl-0 sm:pl-8">
                      <textarea
                        rows={3}
                        value={q12Constraints}
                        onChange={(e) => setQ12Constraints(e.target.value)}
                        placeholder="e.g. Must keep initial entity capitalization under $1M, require Q3 board approval, or prefer Bangalore over Hyderabad due to existing client presence."
                        className="w-full rounded-xl border border-[#D8D2C0] bg-white p-3 text-sm sm:text-base outline-none focus:border-[#2F3F34] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Footer */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[#D8D2C0] bg-white px-5 py-2.5 text-sm font-bold text-[#101C30] hover:bg-[#FAF9F5] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-7 py-3 text-sm sm:text-base font-bold text-white hover:bg-[#233027] transition-all shadow-md active:scale-[0.99]"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-8 py-3 text-base font-bold text-white hover:bg-[#233027] transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting Assessment...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Assessment</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
