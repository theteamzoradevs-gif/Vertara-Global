"use client";

import { useState, useTransition } from "react";
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

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync state when props update
  if (initialInsights !== insights && !isModalOpen) {
    setInsights(initialInsights);
  }

  // Collect unique categories dynamically
  const dynamicCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
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
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: InsightItemData) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
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

    startTransition(async () => {
      const res = editingItem
        ? await updateInsightAction(formData)
        : await createInsightAction(formData);

      if (res.success) {
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
                        <p className="text-[11px] text-muted truncate">/insights/{item.slug}</p>
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

                  {/* Status Toggle Pill */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(item._id, item.published)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition ${
                        item.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                      }`}
                      title="Click to toggle Draft / Published status"
                    >
                      {item.published ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 text-amber-600" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
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

              {/* Category & Read Time */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || "GCC Strategy"}
                    className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none bg-surface-elevated"
                  >
                    {dynamicCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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
                  rows={6}
                  defaultValue={editingItem?.body || ""}
                  placeholder="Write full article here..."
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none font-sans"
                />
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-6 rounded-xl border border-border bg-surface p-3">
                <span className="text-xs font-semibold text-navy">Status:</span>
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="published"
                    value="true"
                    defaultChecked={editingItem ? editingItem.published : true}
                    className="text-accent focus:ring-accent"
                  />
                  <span>Published (Live)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-navy cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="published"
                    value="false"
                    defaultChecked={editingItem ? !editingItem.published : false}
                    className="text-accent focus:ring-accent"
                  />
                  <span>Draft</span>
                </label>
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
