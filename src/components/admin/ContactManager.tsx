"use client";

import { useState, useTransition } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Mail,
  Type,
  Send,
  Building,
  Calendar,
} from "lucide-react";
import { saveContactContentAction } from "@/app/admin/contact/actions";
import type { ContactContentData } from "@/data/seed-contact";

const inputClass =
  "w-full rounded-xl border border-border px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

export function ContactManager({
  initialContent,
}: {
  initialContent: ContactContentData;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [eyebrow, setEyebrow] = useState(initialContent.eyebrow);
  const [headline, setHeadline] = useState(initialContent.headline);
  const [description, setDescription] = useState(initialContent.description);
  const [formTitle, setFormTitle] = useState(initialContent.formTitle);
  const [formSubmitLabel, setFormSubmitLabel] = useState(
    initialContent.formSubmitLabel
  );
  const [companyName, setCompanyName] = useState(initialContent.companyName);
  const [contactEmail, setContactEmail] = useState(initialContent.contactEmail);
  const [contactPhone, setContactPhone] = useState(initialContent.contactPhone);
  const [officeAddress, setOfficeAddress] = useState(
    initialContent.officeAddress || ""
  );
  const [calendlyUrl, setCalendlyUrl] = useState(
    initialContent.calendlyUrl || ""
  );

  const [activeTab, setActiveTab] = useState<
    "copy" | "form" | "direct" | "calendly"
  >("copy");

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 5000);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveContactContentAction({
        eyebrow,
        headline,
        description,
        formTitle,
        formSubmitLabel,
        companyName,
        contactEmail,
        contactPhone,
        officeAddress,
        calendlyUrl,
      });

      if (res.success) {
        showMessage("success", res.message || "Contact page content saved.");
      } else {
        showMessage("error", res.error || "Failed to save Contact page content.");
      }
    });
  };

  const tabs = [
    { id: "copy", label: "Page Copy", icon: Type },
    { id: "form", label: "Form Settings", icon: Send },
    { id: "direct", label: "Direct Contact", icon: Building },
    { id: "calendly", label: "Calendly Embed", icon: Calendar },
  ] as const;

  return (
    <div className="w-full max-w-7xl space-y-4 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy">
            Contact Us Editor
          </h1>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted">
            Manage the headline, proposition copy, form text, and direct contact details for /contact.
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isPending ? "Saving..." : "Save Contact Page"}</span>
        </button>
      </div>

      {/* Alert Banner */}
      {message ? (
        <div
          className={`flex items-center justify-between rounded-xl sm:rounded-2xl px-4 py-3 text-xs font-medium border shadow-xs ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs font-semibold rounded-xl transition cursor-pointer border ${
                isActive
                  ? "bg-navy text-white border-navy shadow-xs"
                  : "bg-surface-elevated text-slate-600 border-border hover:bg-surface hover:text-navy"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive ? "text-highlight" : "text-slate-400"
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={onSave} className="space-y-4 sm:space-y-6">
        {/* 1. Page Copy */}
        {activeTab === "copy" && (
          <Section icon={Type} title="Page Headline & Proposition">
            <Field label="Eyebrow Tag" hint="Small uppercase tag above the title.">
              <input
                className={inputClass}
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                placeholder="CONTACT US"
              />
            </Field>

            <Field
              label="Main Headline"
              hint="Primary headline on the left of the contact page."
            >
              <textarea
                className={inputClass}
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Let’s talk about what yours should look like."
              />
            </Field>

            <Field
              label="Proposition Description"
              hint="Introductory narrative explaining why the prospect should reach out."
            >
              <textarea
                className={inputClass}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us where you are exploring a Nano GCC pilot, building the full business case, or ready to launch..."
              />
            </Field>
          </Section>
        )}

        {/* 2. Form Settings */}
        {activeTab === "form" && (
          <Section icon={Send} title="Contact Form Copy">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Form Title Header"
                hint="Heading displayed inside the dark card."
              >
                <input
                  className={inputClass}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Send us a message"
                />
              </Field>

              <Field
                label="Submit Button Label"
                hint="Label on the gold action button."
              >
                <input
                  className={inputClass}
                  value={formSubmitLabel}
                  onChange={(e) => setFormSubmitLabel(e.target.value)}
                  placeholder="Book a consultation"
                />
              </Field>
            </div>
          </Section>
        )}

        {/* 3. Direct Contact Info */}
        {activeTab === "direct" && (
          <Section icon={Building} title="Direct Contact Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company / Entity Name">
                <input
                  className={inputClass}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Vertara Global — GCC Enablement & Advisory"
                />
              </Field>

              <Field label="Contact Email">
                <input
                  type="email"
                  className={inputClass}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="hello@gccadvisor.com"
                />
              </Field>

              <Field label="Contact Phone">
                <input
                  type="tel"
                  className={inputClass}
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 80 4000 1200"
                />
              </Field>

              <Field label="Registered Office Address (Optional)">
                <input
                  className={inputClass}
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                />
              </Field>
            </div>
          </Section>
        )}

        {/* 4. Calendly Integration */}
        {activeTab === "calendly" && (
          <Section icon={Calendar} title="Calendly Booking Embed (Optional)">
            <Field
              label="Calendly Scheduling URL"
              hint="If provided, a responsive scheduling calendar will be embedded at the bottom of the page."
            >
              <input
                type="url"
                className={inputClass}
                value={calendlyUrl}
                onChange={(e) => setCalendlyUrl(e.target.value)}
                placeholder="https://calendly.com/your-team/30min"
              />
            </Field>
          </Section>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-accent px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>Save Contact Us Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: React.ElementType;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl sm:rounded-2xl border border-border bg-surface-elevated p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-navy">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          <span>{title}</span>
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-navy">
        {label}
      </label>
      {hint ? <p className="mb-1.5 text-[11px] text-muted">{hint}</p> : null}
      {children}
    </div>
  );
}
