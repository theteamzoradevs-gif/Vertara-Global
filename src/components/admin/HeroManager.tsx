"use client";

import { useState, useTransition } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ImageIcon,
  Type,
  MousePointerClick,
  MessageSquareText,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import {
  saveHeroAction,
  uploadHeroImageAction,
  deleteLibraryImageAction,
} from "@/app/admin/hero/actions";
import type { Settings } from "@/lib/content/types";
import type { Metric } from "@/data/seed-content";
import { seedSettings, DEFAULT_LIBRARY_IMAGES } from "@/data/seed-content";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

const CLIENT_HERO_HEADLINE =
  "Your India capability centre, built by people who've done it before.";

function resolveHeadline(value?: string) {
  const current = (value || "").trim();
  if (!current || current.includes("Building GCCs")) return CLIENT_HERO_HEADLINE;
  return value || "";
}

export function HeroManager({ initialSettings }: { initialSettings: Settings }) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const [tagline, setTagline] = useState(initialSettings.tagline || "");
  const [headline, setHeadline] = useState(resolveHeadline(initialSettings.heroHeadline));
  const [subheadline, setSubheadline] = useState(initialSettings.heroSubheadline || "");
  const [backgroundImage, setBackgroundImage] = useState(
    initialSettings.heroBackgroundImage || seedSettings.heroBackgroundImage,
  );
  const [libraryImages, setLibraryImages] = useState<string[]>(
    Array.isArray(initialSettings.libraryImages)
      ? initialSettings.libraryImages
      : DEFAULT_LIBRARY_IMAGES,
  );
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [primaryCta, setPrimaryCta] = useState(
    initialSettings.heroPrimaryCta || seedSettings.heroPrimaryCta,
  );
  const [secondaryCta, setSecondaryCta] = useState(
    initialSettings.heroSecondaryCta || seedSettings.heroSecondaryCta,
  );
  const [formEyebrow, setFormEyebrow] = useState(
    initialSettings.heroFormEyebrow || seedSettings.heroFormEyebrow,
  );
  const [formTitle, setFormTitle] = useState(
    initialSettings.heroFormTitle || seedSettings.heroFormTitle,
  );
  const [formDescription, setFormDescription] = useState(
    initialSettings.heroFormDescription || seedSettings.heroFormDescription,
  );
  const [formButton, setFormButton] = useState(
    initialSettings.heroFormButton || seedSettings.heroFormButton,
  );
  const [formSuccess, setFormSuccess] = useState(
    initialSettings.heroFormSuccess || seedSettings.heroFormSuccess,
  );
  const [showQuickCallForm, setShowQuickCallForm] = useState(
    typeof initialSettings.showQuickCallForm === "boolean"
      ? initialSettings.showQuickCallForm
      : true,
  );
  const [metrics, setMetrics] = useState<Metric[]>(initialSettings.metrics || []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 5000);
  };

  const updateMetric = (index: number, patch: Partial<Metric>) => {
    setMetrics((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const removeMetric = (index: number) => {
    setMetrics((rows) => rows.filter((_, i) => i !== index));
  };

  const addMetric = () => {
    setMetrics((rows) =>
      rows.length >= 4 ? rows : [...rows, { label: "", value: 0, suffix: "+", prefix: "" }]
    );
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadHeroImageAction(fd);
      if (res.success && res.url) {
        setBackgroundImage(res.url);
        setLibraryImages((prev) => (prev.includes(res.url!) ? prev : [res.url!, ...prev]));
        showMessage("success", "Image uploaded and added to library. Save the hero to publish it.");
      } else {
        showMessage("error", res.error || "Could not upload image.");
      }
    } catch {
      showMessage("error", "Could not upload image.");
    } finally {
      setUploading(false);
    }
  };

  const onDeleteImage = async (src: string) => {
    if (!window.confirm("Are you sure you want to delete this photo from the site library?")) {
      return;
    }
    setDeletingImage(src);
    try {
      const res = await deleteLibraryImageAction(src);
      if (res.success) {
        const updated = libraryImages.filter((img) => img !== src);
        setLibraryImages(updated);
        if (backgroundImage === src) {
          setBackgroundImage(updated[0] || "");
        }
        showMessage("success", "Photo deleted from site library.");
      } else {
        showMessage("error", res.error || "Failed to delete photo.");
      }
    } catch {
      showMessage("error", "Failed to delete photo.");
    } finally {
      setDeletingImage(null);
    }
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveHeroAction({
        tagline,
        heroHeadline: headline,
        heroSubheadline: subheadline,
        heroBackgroundImage: backgroundImage,
        heroPrimaryCta: primaryCta,
        heroSecondaryCta: secondaryCta,
        heroFormEyebrow: formEyebrow,
        heroFormTitle: formTitle,
        heroFormDescription: formDescription,
        heroFormButton: formButton,
        heroFormSuccess: formSuccess,
        showQuickCallForm,
        metrics,
        libraryImages,
      });
      if (res.success) {
        showMessage("success", res.message || "Hero saved.");
      } else {
        showMessage("error", res.error || "Failed to save hero.");
      }
    });
  };

  const eyebrowParts = (tagline || seedSettings.tagline)
    .replace(/[·•]/g, "|")
    .replace(/[—–]/g, "|")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
  const previewMetrics = metrics.filter((m) => m.label && m.label.trim() !== "").slice(0, 4);

  return (
    <div className="w-full max-w-7xl space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-navy">Home Editor</h1>
        <p className="mt-1 text-sm text-muted">
          Edit the homepage banner — copy, image, buttons, form, and stats.
        </p>
      </div>

      {message ? (
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-xs font-medium border shadow-xs ${
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
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <form onSubmit={onSave} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px] items-start">
        <div className="space-y-6">
          <Section icon={Type} title="Main copy">
            <Field label="Tagline">
              <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </Field>
            <Field label="Headline">
              <textarea
                className={inputClass}
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </Field>
            <Field label="Subheadline">
              <textarea
                className={inputClass}
                rows={4}
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
              />
            </Field>
          </Section>

          <Section icon={ImageIcon} title="Background image">
            <Field label="Image URL" hint="Paste a URL or upload a file. Local images start with /images/ or /uploads/.">
              <input
                className={inputClass}
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                placeholder="/images/gcc-floor.webp"
              />
            </Field>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-navy hover:border-accent">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              <span>{uploading ? "Uploading…" : "Upload image"}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onUpload(file);
                  e.target.value = "";
                }}
              />
            </label>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Site library
                </p>
                <span className="text-[11px] text-muted">
                  Hover to delete • Click to select
                </span>
              </div>
              {libraryImages.length === 0 ? (
                <p className="text-xs text-muted italic py-2">
                  No images in site library. Upload an image above to add to library.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                  {libraryImages.map((src) => (
                    <div
                      key={src}
                      className="group relative overflow-hidden rounded-xl border border-border bg-slate-100 shadow-xs transition hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => setBackgroundImage(src)}
                        className={`block h-full w-full overflow-hidden transition ${
                          backgroundImage === src
                            ? "ring-2 ring-accent ring-offset-1"
                            : "hover:opacity-90"
                        }`}
                        title="Click to select as background"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt="Library image"
                          className="h-16 w-full object-cover"
                        />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        disabled={deletingImage === src}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void onDeleteImage(src);
                        }}
                        className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/95 text-white shadow-sm opacity-90 transition hover:bg-red-700 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100"
                        title="Delete photo from library"
                        aria-label="Delete photo from library"
                      >
                        {deletingImage === src ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {backgroundImage === src && (
                        <div className="pointer-events-none absolute bottom-1 left-1 rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                          Active
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          <Section icon={MousePointerClick} title="Buttons">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary button">
                <input className={inputClass} value={primaryCta} onChange={(e) => setPrimaryCta(e.target.value)} />
              </Field>
              <Field label="Secondary button">
                <input
                  className={inputClass}
                  value={secondaryCta}
                  onChange={(e) => setSecondaryCta(e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section
            icon={MessageSquareText}
            title="Quick-call form"
            action={
              <label className="relative inline-flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={showQuickCallForm}
                  onChange={(e) => setShowQuickCallForm(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
                <span className={`text-xs font-semibold ${showQuickCallForm ? "text-accent" : "text-muted"}`}>
                  {showQuickCallForm ? "Enabled" : "Disabled"}
                </span>
              </label>
            }
          >
            {!showQuickCallForm ? (
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200/80 rounded-xl p-3 font-medium">
                Quick-call form card is disabled and will be hidden from the homepage hero banner.
              </p>
            ) : null}
            <div className={`space-y-4 transition-opacity ${!showQuickCallForm ? "opacity-40 pointer-events-none" : ""}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Form eyebrow">
                  <input className={inputClass} value={formEyebrow} onChange={(e) => setFormEyebrow(e.target.value)} />
                </Field>
                <Field label="Form title">
                  <input className={inputClass} value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                </Field>
              </div>
              <Field label="Form description">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Submit button">
                  <input className={inputClass} value={formButton} onChange={(e) => setFormButton(e.target.value)} />
                </Field>
                <Field label="Success message">
                  <input className={inputClass} value={formSuccess} onChange={(e) => setFormSuccess(e.target.value)} />
                </Field>
              </div>
            </div>
          </Section>

          <Section icon={CheckCircle2} title="Stats under the buttons">
            {metrics.length === 0 ? (
              <p className="text-xs text-muted font-medium py-1">
                No stats added. The green stats strip on the homepage will be hidden.
              </p>
            ) : (
              <div className="space-y-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="grid grid-cols-[64px_48px_1fr_auto] sm:grid-cols-[90px_70px_1fr_auto] gap-2 items-center">
                    <input
                      className={inputClass}
                      type="number"
                      value={metric.value}
                      onChange={(e) => updateMetric(index, { value: Number(e.target.value) })}
                      placeholder="85"
                    />
                    <input
                      className={inputClass}
                      value={metric.suffix || ""}
                      onChange={(e) => updateMetric(index, { suffix: e.target.value })}
                      placeholder="+"
                    />
                    <input
                      className={inputClass}
                      value={metric.label}
                      onChange={(e) => updateMetric(index, { label: e.target.value })}
                      placeholder="GCCs established"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                      aria-label="Delete stat"
                      title="Delete stat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {metrics.length >= 4 ? (
              <p className="mt-3 text-xs font-medium text-muted">Maximum 4 stats allowed</p>
            ) : (
              <button
                type="button"
                onClick={addMetric}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add stat
              </button>
            )}
          </Section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              <span>Save hero</span>
            </button>
          </div>
        </div>

        <aside className="xl:sticky xl:top-24 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Live preview</p>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="flex min-h-[420px] flex-col bg-[#2F3F34] text-white">
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#C5A55D] sm:text-[10px]">
                  {eyebrowParts.map((part, index) => (
                    <span key={`${part}-${index}`} className="inline-flex items-center">
                      <span>{part}</span>
                      {index < eyebrowParts.length - 1 ? (
                        <span className="ml-2 text-[#C5A55D]/50 select-none">|</span>
                      ) : null}
                    </span>
                  ))}
                </div>
                <p className="mt-3 max-w-xl text-[15px] font-bold leading-snug tracking-tight text-white sm:text-lg md:text-xl">
                  {headline || "Headline"}
                </p>
                <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-[#e2e8e4]/95 sm:text-xs">
                  {subheadline || "Subheadline"}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-lg border border-[#445b4c] bg-[#1E2922]/85 px-3 py-2 text-[10px] font-semibold text-white sm:text-xs">
                    {primaryCta || "Primary"}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-lg bg-[#B59439] px-3 py-2 text-[10px] font-semibold text-white sm:text-xs">
                    {secondaryCta || "Secondary"}
                  </span>
                </div>
              </div>
              {previewMetrics.length > 0 ? (
                <div className="border-t border-white/10 bg-[#2F3F34] px-4 py-3">
                  <div
                    className={`grid gap-x-3 gap-y-2 ${
                      previewMetrics.length === 1
                        ? "grid-cols-1 justify-items-center"
                        : "grid-cols-2"
                    }`}
                  >
                    {previewMetrics.map((metric) => (
                      <div key={metric.label} className="flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B59439]" />
                        <p className="min-w-0 text-[10px] leading-none text-white sm:text-[11px]">
                          <span className="font-bold">
                            {metric.prefix}
                            {metric.value}
                            {metric.suffix}
                          </span>{" "}
                          <span className="font-medium text-[#d1e0d7]">{metric.label}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </aside>
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
    <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          <Icon className="h-5 w-5 text-accent" />
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
      <label className="mb-1.5 block text-xs font-semibold text-navy">{label}</label>
      {hint ? <p className="mb-1.5 text-[11px] text-muted">{hint}</p> : null}
      {children}
    </div>
  );
}
