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
  Megaphone,
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
import type { HeroRotatingLine, Metric } from "@/data/seed-content";
import { seedSettings, DEFAULT_LIBRARY_IMAGES } from "@/data/seed-content";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

const MAX_ROTATING_LINES = 7;

export function HeroManager({ initialSettings }: { initialSettings: Settings }) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const [tagline, setTagline] = useState(initialSettings.tagline || "");
  const [headline, setHeadline] = useState(initialSettings.heroHeadline || "");
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
  const [rotatingEyebrow, setRotatingEyebrow] = useState(
    initialSettings.heroRotatingEyebrow || seedSettings.heroRotatingEyebrow,
  );
  const [rotatingLines, setRotatingLines] = useState<HeroRotatingLine[]>(
    initialSettings.heroRotatingLines?.length
      ? initialSettings.heroRotatingLines
      : seedSettings.heroRotatingLines,
  );
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

  const updateLine = (index: number, key: keyof HeroRotatingLine, value: string) => {
    setRotatingLines((lines) =>
      lines.map((line, i) => (i === index ? { ...line, [key]: value } : line)),
    );
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
        heroRotatingEyebrow: rotatingEyebrow,
        heroRotatingLines: rotatingLines,
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

  const previewLine = rotatingLines[0] || seedSettings.heroRotatingLines[0];

  return (
    <div className="w-full max-w-7xl space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-navy">Home Editor</h1>
        <p className="mt-1 text-sm text-muted">
          Edit the homepage banner — copy, image, rotating help lines, buttons, form, and stats.
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

          <Section icon={Megaphone} title="Rotating help box">
            <Field label="Box label">
              <input
                className={inputClass}
                value={rotatingEyebrow}
                onChange={(e) => setRotatingEyebrow(e.target.value)}
              />
            </Field>
            <div className="space-y-3">
              {rotatingLines.map((line, index) => (
                <div
                  key={index}
                  className="grid gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-[1fr_1.4fr_auto]"
                >
                  <input
                    className={inputClass}
                    value={line.label}
                    placeholder="Title"
                    onChange={(e) => updateLine(index, "label", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    value={line.detail}
                    placeholder="Short detail"
                    onChange={(e) => updateLine(index, "detail", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setRotatingLines((lines) =>
                        lines.length > 1 ? lines.filter((_, i) => i !== index) : lines,
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-slate-400 hover:border-red-200 hover:text-red-600"
                    aria-label="Remove line"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {rotatingLines.length >= MAX_ROTATING_LINES ? (
              <p className="text-xs font-medium text-muted">Maximum 7 lines allowed</p>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setRotatingLines((lines) =>
                    lines.length >= MAX_ROTATING_LINES
                      ? lines
                      : [...lines, { label: "", detail: "" }],
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent"
              >
                <Plus className="h-4 w-4" /> Add rotating line
              </button>
            )}
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
            <div className="relative min-h-[420px] bg-[#061526] p-4 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImage || seedSettings.heroBackgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-[#061526]/55" />
              <div className="relative space-y-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-200">
                  {tagline || "Tagline"}
                </p>
                <p className="text-lg font-bold leading-tight">{headline || "Headline"}</p>
                <p className="text-[11px] leading-relaxed text-white/80 line-clamp-3">
                  {subheadline || "Subheadline"}
                </p>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-wider text-white/60">{rotatingEyebrow}</p>
                  <p className="mt-1 text-sm font-bold">{previewLine?.label || "Line title"}</p>
                  <p className="text-[11px] text-white/75">{previewLine?.detail || "Line detail"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-accent px-3 py-1.5 text-[10px] font-semibold">
                    {primaryCta || "Primary"}
                  </span>
                  <span className="rounded-lg border border-white/35 px-3 py-1.5 text-[10px] font-semibold">
                    {secondaryCta || "Secondary"}
                  </span>
                </div>
                {metrics.filter((m) => m.label && m.label.trim() !== "").length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/85">
                    {metrics
                      .filter((m) => m.label && m.label.trim() !== "")
                      .map((m) => (
                        <span key={m.label}>
                          {m.prefix}
                          {m.value}
                          {m.suffix} {m.label.toLowerCase()}
                        </span>
                      ))}
                  </div>
                )}
                {showQuickCallForm && (
                  <div className="rounded-xl bg-white p-3 text-navy shadow-lg">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-accent">{formEyebrow}</p>
                    <p className="text-sm font-bold">{formTitle}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{formDescription}</p>
                    <div className="mt-2 h-7 rounded-md bg-slate-100" />
                    <div className="mt-1.5 h-7 rounded-md bg-slate-100" />
                    <div className="mt-2 rounded-md bg-navy px-3 py-1.5 text-center text-[10px] font-semibold text-white">
                      {formButton}
                    </div>
                  </div>
                )}
              </div>
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
