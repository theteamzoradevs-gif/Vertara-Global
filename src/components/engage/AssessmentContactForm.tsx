"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function AssessmentContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [businessContext, setBusinessContext] = useState("");

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

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  function validate(fields: { name: string; email: string; company: string }) {
    const errs: { name?: string; email?: string; company?: string } = {};
    if (!fields.name.trim()) errs.name = "Please enter your name.";
    if (!fields.email.trim()) {
      errs.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!fields.company.trim()) errs.company = "Please enter your company.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const currentErrors = validate({ name, email, company });
    setErrors(currentErrors);
    setTouched({ name: true, email: true, company: true });

    if (Object.keys(currentErrors).length > 0) return;

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
          role: role.trim() || undefined,
          intent: "GCC Assessment Inquiry",
          source: "assessment_page_form",
          message: businessContext.trim() || undefined,
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
    <section
      id="assessment-form"
      className="relative w-full overflow-hidden bg-[#FAF9F5] py-10 sm:py-12 md:py-16 font-sans scroll-mt-20"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-[#D8D2C0] bg-white p-6 sm:p-8 md:p-10 shadow-xl">
          {status === "success" ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2F3F34]/10 text-[#2F3F34]">
                <CheckCircle2 className="h-10 w-10 text-[#2F3F34]" />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-[#101C30]">
                Thank you — message received
              </h3>
              <p className="mt-3 max-w-md mx-auto text-base text-[#101C30]/80 leading-relaxed">
                We'll reply within two business days. Your details stay confidential and are never shared or used for any marketing purposes.
              </p>
              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setCompany("");
                    setRole("");
                    setBusinessContext("");
                    setTouched({});
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#233027]"
                >
                  <span>Send another message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {serverError && (
                <div className="mb-6 rounded-xl bg-red-50 p-3.5 text-sm font-medium text-red-700 border border-red-200">
                  {serverError}
                </div>
              )}

              {/* Horizontal Form Layout: Left Column Details | Right Column Context & Submit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {/* Left Column: 4 Inputs */}
                <div className="space-y-4 flex flex-col justify-between">
                  {/* Name* */}
                  <div>
                    <label className="block text-sm font-bold text-[#101C30]">
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
                      className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors ${
                        touched.name && errors.name
                          ? "border-red-500 bg-red-50/20 focus:border-red-500"
                          : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Work email* */}
                  <div>
                    <label className="block text-sm font-bold text-[#101C30]">
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
                      className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors ${
                        touched.email && errors.email
                          ? "border-red-500 bg-red-50/20 focus:border-red-500"
                          : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Company* & Your role (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company* */}
                    <div>
                      <label className="block text-sm font-bold text-[#101C30]">
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
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors ${
                          touched.company && errors.company
                            ? "border-red-500 bg-red-50/20 focus:border-red-500"
                            : "border-[#D8D2C0] bg-white focus:border-[#2F3F34]"
                        }`}
                      />
                      {touched.company && errors.company && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.company}</p>
                      )}
                    </div>

                    {/* Your role (optional) */}
                    <div>
                      <label className="block text-sm font-bold text-[#101C30]">
                        Your role <span className="text-xs font-normal text-[#101C30]/60">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="E.g. CTO, VP Operations"
                        className="mt-1.5 w-full rounded-xl border border-[#D8D2C0] bg-white px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors focus:border-[#2F3F34]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Business Context, Submit Button & Trust Notice */}
                <div className="flex flex-col justify-between space-y-4">
                  {/* Business Context */}
                  <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-bold text-[#101C30]">
                      Business Context
                    </label>
                    <textarea
                      value={businessContext}
                      onChange={(e) => setBusinessContext(e.target.value)}
                      placeholder='e.g. We&apos;re a 2,000-person engineering firm considering a 30-person team in India next year.'
                      className="mt-1.5 w-full flex-1 min-h-[140px] rounded-xl border border-[#D8D2C0] bg-white p-3.5 text-sm sm:text-base outline-none transition-colors focus:border-[#2F3F34] resize-none"
                    />
                  </div>

                  {/* Button & Trust statement */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="cursor-pointer w-full rounded-xl bg-[#2F3F34] px-7 py-3.5 text-base sm:text-lg font-bold text-white transition-all hover:bg-[#233027] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="h-4 w-4 text-white" />
                        </>
                      )}
                    </button>

                    <p className="text-xs sm:text-sm leading-relaxed text-[#101C30]/75 text-center">
                      We'll reply within two business days. Your details stay confidential and are never shared or used for any marketing purposes. We won’t send any marketing emails after closing
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
