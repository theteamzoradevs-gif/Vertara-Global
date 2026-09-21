"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  FileText,
  AlertCircle,
  Loader2,
  Check,
  ChevronDown,
  Star,
} from "lucide-react";
import {
  createInsightAction,
  updateInsightAction,
  toggleInsightStatusAction,
  deleteInsightAction,
} from "@/app/admin/insights/actions";

export interface InsightItemData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  coverImage?: string;
  category?: string;
  readTime?: string;
  published: boolean;
  featured?: boolean;
  publishedAt?: string | Date;
  createdAt?: string | Date;
}

const DEFAULT_CATEGORIES = [
  "GCC Strategy",
  "Talent & Hiring",
  "Operations & Legal",
  "AI & Digital Transformation",
  "Advisory",
  "Engagement",
  "General",
];

export function InsightsManager({ initialInsights }: { initialInsights: InsightItemData[] }) {
  const [insights, setInsights] = useState<InsightItemData[]>(initialInsights);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InsightItemData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formPublished, setFormPublished] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Table row status dropdown state
  const [openTableStatusId, setOpenTableStatusId] = useState<string | null>(null);
  const tableStatusRef = useRef<HTMLDivElement>(null);

  // Category States
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState("GCC Strategy");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
      if (tableStatusRef.current && !tableStatusRef.current.contains(e.target as Node)) {
        setOpenTableStatusId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync state when props update
  if (initialInsights !== insights && !isModalOpen) {
    setInsights(initialInsights);
  }

  // Collect unique categories dynamically
  const dynamicCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...customCategories,
      ...insights.map((i) => i.category).filter(Boolean) as string[],
    ])
  );

  // Filtered insights list
  const filteredInsights = insights.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase())) ||
      item.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "published"
        ? item.published
        : !item.published;

    const matchesCat =
      selectedCategory === "all" ? true : item.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCat;
  });

  const totalPublished = insights.filter((i) => i.published).length;
  const totalDrafts = insights.filter((i) => !i.published).length;

  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormSlug("");
    const defaultCat = dynamicCategories[0] || "GCC Strategy";
    setFormCategory(defaultCat);
    setIsCustomCategory(false);
    setCustomCategoryInput("");
    setFormPublished(true);
    setFormFeatured(false);
    setIsStatusDropdownOpen(false);
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: InsightItemData) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormCategory(item.category || dynamicCategories[0] || "GCC Strategy");
    setIsCustomCategory(false);
    setCustomCategoryInput("");
    setFormPublished(item.published);
    setFormFeatured(Boolean(item.featured));
    setIsStatusDropdownOpen(false);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormTitle(title);
    if (!editingItem) {
      setFormSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
      );
    }
  };

  const handleToggleStatus = (id: string, currentPublished: boolean) => {
    startTransition(async () => {
      const res = await toggleInsightStatusAction(id, currentPublished);
      if (res.success) {
        setInsights((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, published: !currentPublished } : item
          )
        );
        setMessage({ type: "success", text: res.message || "Status updated." });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update status." });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteInsightAction(id);
      if (res.success) {
        setInsights((prev) => prev.filter((item) => item._id !== id));
        setDeleteConfirmId(null);
        setMessage({ type: "success", text: "Insight deleted." });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to delete." });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const finalCat = isCustomCategory ? customCategoryInput.trim() : formCategory;
    if (finalCat) {
      formData.set("category", finalCat);
    }

    startTransition(async () => {
      const res = editingItem
        ? await updateInsightAction(formData)
        : await createInsightAction(formData);

      if (res.success) {
        if (isCustomCategory && finalCat && !dynamicCategories.includes(finalCat)) {
          setCustomCategories((prev) => [...prev, finalCat]);
        }
        setMessage({ type: "success", text: res.message || "Saved successfully!" });
        setIsModalOpen(false);
      } else {
        setMessage({ type: "error", text: res.error || "An error occurred." });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Clean Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Insights</h1>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover transition shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Create Insight</span>
        </button>
      </div>

      {/* Alert Notifications */}
      {message && (
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium border ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Minimal Metrics Row */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Total Insights</p>
          <p className="mt-1 text-2xl font-bold text-navy">{insights.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Published</p>
          <p className="mt-1 text-2xl font-bold text-navy">{totalPublished}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Drafts</p>
          <p className="mt-1 text-2xl font-bold text-navy">{totalDrafts}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Categories</p>
          <p className="mt-1 text-2xl font-bold text-navy">{dynamicCategories.length}</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-surface-elevated p-3 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
          />
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Status Tabs */}
          <div className="flex items-center rounded-xl bg-surface p-1 border border-border shrink-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                statusFilter === "all" ? "bg-navy text-white shadow-xs" : "text-muted hover:text-navy"
              }`}
            >
              All ({insights.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                statusFilter === "published"
                  ? "bg-navy text-white shadow-xs"
                  : "text-muted hover:text-navy"
              }`}
            >
              Published ({totalPublished})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                statusFilter === "draft"
                  ? "bg-navy text-white shadow-xs"
                  : "text-muted hover:text-navy"
              }`}
            >
              Drafts ({totalDrafts})
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none shrink-0"
          >
            <option value="all">All Categories</option>
            {dynamicCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Insights Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
        <table className="w-full text-left text-xs text-slate">
          <thead className="border-b border-border bg-surface text-[11px] font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3.5">Article</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Read Time</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredInsights.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted">
                  <FileText className="mx-auto h-7 w-7 text-slate/30 mb-2" />
                  <p className="font-medium">No insights found</p>
                </td>
              </tr>
            ) : (
              filteredInsights.map((item) => (
                <tr key={item._id || item.slug} className="hover:bg-surface/60 transition">
                  {/* Article Title & Cover Thumbnail */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="h-10 w-14 rounded-lg object-cover border border-border shrink-0"
                        />
                      ) : (
                        <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-surface border border-border text-slate/40 shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0 max-w-xs md:max-w-md">
                        <p className="font-semibold text-navy truncate">{item.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] text-muted truncate">/insights/{item.slug}</p>
                          {item.featured ? (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              Homepage
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category Pill Tag */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-md bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      {item.category || "GCC Strategy"}
                    </span>
                  </td>

                  {/* Read Time */}
                  <td className="px-5 py-4 whitespace-nowrap text-muted">
                    {item.readTime || "5 min read"}
                  </td>

                  {/* Status Dropdown Selector */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div
                      className="relative inline-block"
                      ref={openTableStatusId === item._id ? tableStatusRef : undefined}
                    >
                      <button
                        onClick={() =>
                          setOpenTableStatusId(openTableStatusId === item._id ? null : item._id)
                        }
                        disabled={isPending}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition cursor-pointer ${
                          item.published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Change Status"
                      >
                        {item.published ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 text-amber-600 shrink-0" />
                            <span>Draft</span>
                          </>
                        )}
                        <ChevronDown className="h-3 w-3 text-slate-400 shrink-0 ml-0.5" />
                      </button>

                      {openTableStatusId === item._id && (
                        <div className="absolute top-full left-0 mt-1 z-30 w-36 rounded-xl border border-border bg-surface-elevated p-1 shadow-xl space-y-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.published) {
                                handleToggleStatus(item._id, item.published);
                              }
                              setOpenTableStatusId(null);
                            }}
                            className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg text-left transition cursor-pointer ${
                              !item.published
                                ? "bg-surface text-navy font-semibold"
                                : "text-slate-600 hover:bg-surface/80"
                            }`}
                          >
                            <div className="w-3.5 flex items-center justify-center shrink-0">
                              {!item.published && <Check className="h-3.5 w-3.5 text-navy" />}
                            </div>
                            <span>Draft</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!item.published) {
                                handleToggleStatus(item._id, item.published);
                              }
                              setOpenTableStatusId(null);
                            }}
                            className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg text-left transition cursor-pointer ${
                              item.published
                                ? "bg-surface text-navy font-semibold"
                                : "text-slate-600 hover:bg-surface/80"
                            }`}
                          >
                            <div className="w-3.5 flex items-center justify-center shrink-0">
                              {item.published && <Check className="h-3.5 w-3.5 text-navy" />}
                            </div>
                            <span>Published</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      {item.published && (
                        <Link
                          href={`/insights/${item.slug}`}
                          target="_blank"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-surface hover:text-navy transition"
                          title="View on site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}

                      <button
                        onClick={() => openEditModal(item)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-surface hover:text-accent transition"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(item._id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-navy">
                {editingItem ? "Edit Insight" : "Create New Insight"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {editingItem && <input type="hidden" name="id" value={editingItem._id} />}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formTitle}
                  onChange={handleTitleChange}
                  placeholder="e.g. Scaling Tech Talent in India GCCs"
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Slug URL */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Slug URL</label>
                <input
                  type="text"
                  name="slug"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="scaling-tech-talent-india"
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none font-mono"
                />
              </div>

              {/* Category, Read Time & Status Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-navy">Category</label>
                    {isCustomCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setCustomCategoryInput("");
                        }}
                        className="text-[11px] font-medium text-accent hover:underline cursor-pointer"
                      >
                        ← Select existing
                      </button>
                    )}
                  </div>

                  {!isCustomCategory ? (
                    <select
                      name="category"
                      value={formCategory}
                      onChange={(e) => {
                        if (e.target.value === "__add_custom__") {
                          setIsCustomCategory(true);
                          setCustomCategoryInput("");
                        } else {
                          setFormCategory(e.target.value);
                        }
                      }}
                      className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none bg-surface-elevated cursor-pointer font-medium"
                    >
                      {dynamicCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__add_custom__" className="font-semibold text-accent">
                        + Add Custom Category...
                      </option>
                    </select>
                  ) : (
                    <div>
                      <input
                        type="text"
                        name="category"
                        required
                        autoFocus
                        value={customCategoryInput}
                        onChange={(e) => {
                          setCustomCategoryInput(e.target.value);
                          setFormCategory(e.target.value);
                        }}
                        placeholder="Type new category..."
                        className="w-full rounded-xl border border-accent px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none bg-surface font-medium"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    defaultValue={editingItem?.readTime || ""}
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Selector Dropdown */}
              <div className="relative" ref={statusDropdownRef}>
                <label className="block text-xs font-semibold text-navy mb-1.5">Status</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs text-navy font-medium text-left focus:border-accent focus:outline-none transition shadow-xs hover:border-slate-400 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      {formPublished ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold text-navy">Published</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 text-slate-500 shrink-0" />
                          <span className="font-semibold text-navy">Draft</span>
                        </>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isStatusDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isStatusDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-border bg-surface-elevated p-1.5 shadow-xl space-y-0.5 border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          setFormPublished(false);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition cursor-pointer ${
                          !formPublished
                            ? "bg-slate-100 text-navy font-semibold"
                            : "text-slate-600 hover:bg-surface/80"
                        }`}
                      >
                        <div className="w-4 flex items-center justify-center shrink-0">
                          {!formPublished && <Check className="h-4 w-4 text-navy" />}
                        </div>
                        <span>Draft</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormPublished(true);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition cursor-pointer ${
                          formPublished
                            ? "bg-slate-100 text-navy font-semibold"
                            : "text-slate-600 hover:bg-surface/80"
                        }`}
                      >
                        <div className="w-4 flex items-center justify-center shrink-0">
                          {formPublished && <Check className="h-4 w-4 text-navy" />}
                        </div>
                        <span>Published</span>
                      </button>
                    </div>
                  )}
                </div>

                <input type="hidden" name="published" value={formPublished ? "true" : "false"} />

                <p className="mt-1.5 text-[11px] text-muted">
                  Draft stays hidden, Published goes live on the website.
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3">
                <input
                  type="checkbox"
                  id="insight-featured"
                  name="featured"
                  value="true"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <label htmlFor="insight-featured" className="cursor-pointer">
                  <span className="block text-xs font-semibold text-navy">Feature on Homepage</span>
                  <span className="mt-0.5 block text-[11px] text-muted">
                    Checked items appear in the homepage featured insights section.
                  </span>
                </label>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  defaultValue={editingItem?.coverImage || ""}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Excerpt / Summary</label>
                <textarea
                  name="excerpt"
                  rows={2}
                  defaultValue={editingItem?.excerpt || ""}
                  placeholder="Short overview for article cards..."
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Body Content */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Article Body</label>
                <textarea
                  name="body"
                  rows={5}
                  defaultValue={editingItem?.body || ""}
                  placeholder="Write full article here..."
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none font-sans"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-navy hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50"
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{editingItem ? "Update Insight" : "Publish Insight"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl text-center">
            <h3 className="text-base font-bold text-navy">Delete Insight?</h3>
            <p className="mt-1 text-xs text-muted">
              Are you sure you want to delete this insight? This action cannot be undone.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-navy hover:bg-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-xs"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
