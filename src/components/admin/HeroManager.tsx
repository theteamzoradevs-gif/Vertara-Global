"use client";

import { useState, useTransition, useEffect } from "react";
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
  PanelTop,
  HelpCircle,
  Search,
  Edit2,
  ChevronDown,
  Eye,
} from "lucide-react";
import {
  saveHeroAction,
  uploadHeroImageAction,
  deleteLibraryImageAction,
} from "@/app/admin/hero/actions";
import {
  createFaqAction,
  updateFaqAction,
  deleteFaqAction,
} from "@/app/admin/faqs/actions";
import type { Settings } from "@/lib/content/types";
import type { Metric } from "@/data/seed-content";
import { seedSettings, DEFAULT_LIBRARY_IMAGES } from "@/data/seed-content";

export interface FaqItemData {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface HeroManagerProps {
  initialSettings: Settings;
  initialFaqs?: FaqItemData[];
}

const inputClass =
  "w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

const CLIENT_HERO_HEADLINE =
  "Your India capability centre, built by people who've done it before.";

function resolveHeadline(value?: string) {
  const current = (value || "").trim();
  if (!current || current.includes("Building GCCs")) return CLIENT_HERO_HEADLINE;
  return value || "";
}

export function HeroManager({ initialSettings, initialFaqs = [] }: HeroManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"hero" | "faqs">("hero");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  // Home FAQs state
  const [homeFaqs, setHomeFaqs] = useState<FaqItemData[]>(() => {
    return initialFaqs.filter((f) => (f.category || "").toLowerCase() === "home");
  });
  const [faqSearch, setFaqSearch] = useState("");
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItemData | null>(null);
  const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);

  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqOrder, setFaqOrder] = useState<number>(1);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  // Check URL query param or hash on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "faqs" || window.location.hash === "#faqs") {
        setActiveTab("faqs");
      }
    }
  }, []);

  // Sync state if initialFaqs change
  useEffect(() => {
    setHomeFaqs(initialFaqs.filter((f) => (f.category || "").toLowerCase() === "home"));
  }, [initialFaqs]);

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

  const openCreateFaqModal = () => {
    setEditingFaq(null);
    setFaqQuestion("");
    setFaqAnswer("");
    setFaqOrder((homeFaqs.length || 0) + 1);
    setIsFaqModalOpen(true);
  };

  const openEditFaqModal = (item: FaqItemData) => {
    setEditingFaq(item);
    setFaqQuestion(item.question);
    setFaqAnswer(item.answer);
    setFaqOrder(item.order || 1);
    setIsFaqModalOpen(true);
  };

  const handleDeleteFaq = (id: string) => {
    startTransition(async () => {
      const res = await deleteFaqAction(id);
      if (res.success) {
        setHomeFaqs((prev) => prev.filter((item) => item._id !== id));
        setDeletingFaqId(null);
        showMessage("success", "Home FAQ deleted successfully.");
      } else {
        showMessage("error", res.error || "Failed to delete FAQ.");
      }
    });
  };

  const handleFaqSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("category", "Home");

    startTransition(async () => {
      const res = editingFaq
        ? await updateFaqAction(formData)
        : await createFaqAction(formData);

      if (res.success) {
        if (editingFaq) {
          setHomeFaqs((prev) =>
            prev.map((item) =>
              item._id === editingFaq._id
                ? { ...item, question: faqQuestion, answer: faqAnswer, order: faqOrder }
                : item
            ).sort((a, b) => (a.order || 0) - (b.order || 0))
          );
        } else {
          const newItem: FaqItemData = {
            _id: `temp-${Date.now()}`,
            question: faqQuestion,
            answer: faqAnswer,
            category: "Home",
            order: faqOrder,
          };
          setHomeFaqs((prev) => [...prev, newItem].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
        showMessage("success", res.message || "Home FAQ saved successfully!");
        setIsFaqModalOpen(false);
      } else {
        showMessage("error", res.error || "An error occurred.");
      }
    });
  };

  const filteredHomeFaqs = homeFaqs
    .filter(
      (f) =>
        f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.answer.toLowerCase().includes(faqSearch.toLowerCase())
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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
          Manage all sections of the homepage — hero banner, copy, images, quick call form, and homepage FAQs.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`inline-flex items-center gap-2 border-b-2 pb-3 pt-1 text-xs font-semibold transition cursor-pointer ${
            activeTab === "hero"
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-navy"
          }`}
        >
          <PanelTop className="h-4 w-4" />
          <span>Hero Banner & Setup</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`inline-flex items-center gap-2 border-b-2 pb-3 pt-1 text-xs font-semibold transition cursor-pointer ${
            activeTab === "faqs"
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-navy"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Home FAQs</span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">
            {homeFaqs.length}
          </span>
        </button>
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

      {activeTab === "hero" ? (
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
      ) : (
        <div className="space-y-6">
          {/* FAQ Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search homepage questions or answers..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-xs text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-medium text-muted">
                Total: <strong className="text-navy">{homeFaqs.length}</strong> / 10
              </span>
              <button
                type="button"
                onClick={openCreateFaqModal}
                disabled={homeFaqs.length >= 10 || isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-accent/90 disabled:opacity-50 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Home FAQ</span>
              </button>
            </div>
          </div>

          {/* FAQs List */}
          {filteredHomeFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
              <HelpCircle className="h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-navy">No Home FAQs found</p>
              <p className="mt-1 text-xs text-muted">
                {faqSearch
                  ? "No FAQs match your search query."
                  : "Click 'Add Home FAQ' to add an FAQ that will appear on the homepage."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHomeFaqs.map((faq, idx) => (
                <div
                  key={faq._id || `faq-${idx}`}
                  className="rounded-2xl border border-border bg-surface-elevated p-4 sm:p-5 shadow-xs transition hover:border-slate/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-mono text-xs font-bold text-accent">
                        {faq.order ?? idx + 1}
                      </span>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <h3 className="text-sm font-bold text-navy leading-snug">
                          {faq.question}
                        </h3>
                        <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditFaqModal(faq)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-surface hover:text-navy transition cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingFaqId(faq._id || null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Homepage Accordion Preview */}
          {homeFaqs.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border bg-surface-elevated p-6 shadow-xs">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <Eye className="h-4 w-4 text-accent" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                  Live Homepage Preview
                </h3>
                <span className="text-[11px] text-muted">
                  (Click any question to preview accordion expand)
                </span>
              </div>

              <div className="space-y-3">
                {homeFaqs.map((faq, idx) => {
                  const id = faq._id || `preview-${idx}`;
                  const isOpen = openAccordionId === id;
                  return (
                    <div
                      key={id}
                      className="rounded-xl border border-border/70 bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenAccordionId(isOpen ? null : id)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs text-navy hover:bg-surface transition cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-muted leading-relaxed border-t border-border/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Create / Edit FAQ Modal */}
          {isFaqModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
              <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl my-8">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-base font-bold text-navy">
                    {editingFaq ? "Edit Home FAQ" : "Add New Home FAQ"}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-navy cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleFaqSubmit} className="mt-4 space-y-4">
                  {editingFaq && <input type="hidden" name="id" value={editingFaq._id} />}
                  <input type="hidden" name="category" value="Home" />

                  <div>
                    <label className="block text-xs font-semibold text-navy">
                      Question *
                    </label>
                    <input
                      required
                      name="question"
                      type="text"
                      placeholder="e.g. What is a Global Capability Center (GCC)?"
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy">
                      Answer *
                    </label>
                    <textarea
                      required
                      name="answer"
                      rows={4}
                      placeholder="Enter the detailed answer..."
                      value={faqAnswer}
                      onChange={(e) => setFaqAnswer(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy">
                        Display Order
                      </label>
                      <input
                        required
                        name="order"
                        type="number"
                        min={1}
                        max={10}
                        value={faqOrder}
                        onChange={(e) => setFaqOrder(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy">
                        Section
                      </label>
                      <div className="mt-1 rounded-xl border border-border bg-surface/50 px-3 py-2 text-xs font-semibold text-accent">
                        Homepage (Locked)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setIsFaqModalOpen(false)}
                      className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-slate hover:bg-surface transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90 transition shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{editingFaq ? "Update FAQ" : "Create FAQ"}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete FAQ Modal */}
          {deletingFaqId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
                <div className="flex items-center gap-3 text-rose-600 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="text-sm font-bold text-navy">Delete Home FAQ?</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Are you sure you want to delete this FAQ? It will be immediately removed from the homepage.
                </p>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDeletingFaqId(null)}
                    className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-slate hover:bg-surface cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(deletingFaqId)}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
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
