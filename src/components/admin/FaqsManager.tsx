"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  HelpCircle,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  createFaqAction,
  updateFaqAction,
  deleteFaqAction,
} from "@/app/admin/faqs/actions";

export interface FaqItemData {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const DEFAULT_CATEGORIES = [
  "Basics",
  "Timeline",
  "Commercial",
  "Ownership",
  "Talent",
  "Location",
  "Operations",
  "Engagement",
];

export function FaqsManager({ initialFaqs }: { initialFaqs: FaqItemData[] }) {
  const [faqs, setFaqs] = useState<FaqItemData[]>(initialFaqs);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItemData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formOrder, setFormOrder] = useState<number>(1);

  // Custom Category States
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState("Basics");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync state when props update
  if (initialFaqs !== faqs && !isModalOpen) {
    setFaqs(initialFaqs);
  }

  // Collect unique categories dynamically
  const dynamicCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...customCategories,
      ...faqs.map((f) => f.category).filter(Boolean),
    ])
  );

  // Filter & Sort FAQs by order (ascending: 1, 2, 3...)
  const filteredFaqs = faqs
    .filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        selectedCategory === "all" ? true : item.category === selectedCategory;

      return matchesSearch && matchesCat;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const openCreateModal = () => {
    setEditingItem(null);
    setFormQuestion("");
    setFormAnswer("");
    setFormOrder((faqs.length || 0) + 1);
    const defaultCat = dynamicCategories[0] || "Basics";
    setFormCategory(defaultCat);
    setIsCustomCategory(false);
    setCustomCategoryInput("");
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: FaqItemData) => {
    setEditingItem(item);
    setFormQuestion(item.question);
    setFormAnswer(item.answer);
    setFormOrder(item.order || 1);
    setFormCategory(item.category || dynamicCategories[0] || "Basics");
    setIsCustomCategory(false);
    setCustomCategoryInput("");
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteFaqAction(id);
      if (res.success) {
        setFaqs((prev) => prev.filter((item) => item._id !== id));
        setDeleteConfirmId(null);
        setMessage({ type: "success", text: "FAQ deleted." });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to delete FAQ." });
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
        ? await updateFaqAction(formData)
        : await createFaqAction(formData);

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
        <div>
          <h1 className="text-2xl font-bold text-navy">FAQs Manager</h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover transition shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Create FAQ</span>
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
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 max-w-2xl">
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Total FAQs</p>
          <p className="mt-1 text-2xl font-bold text-navy">{faqs.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Categories</p>
          <p className="mt-1 text-2xl font-bold text-navy">{dynamicCategories.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Filtered FAQs</p>
          <p className="mt-1 text-2xl font-bold text-navy">{filteredFaqs.length}</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-surface-elevated p-3 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted font-medium whitespace-nowrap">Filter Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories ({faqs.length})</option>
            {dynamicCategories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* FAQs Table List View */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
        <table className="w-full text-left text-xs text-slate">
          <thead className="border-b border-border bg-surface text-[11px] font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3.5 w-16 text-center">Order</th>
              <th className="px-5 py-3.5">Question & Answer</th>
              <th className="px-5 py-3.5 w-32">Category</th>
              <th className="px-5 py-3.5 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredFaqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-muted">
                  <HelpCircle className="mx-auto h-7 w-7 text-slate/30 mb-2" />
                  <p className="font-medium">No FAQs found</p>
                </td>
              </tr>
            ) : (
              filteredFaqs.map((item, idx) => (
                <tr key={item._id || item.question || idx} className="hover:bg-surface/60 transition">
                  {/* Order Badge */}
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-border font-mono font-bold text-navy text-xs">
                      {item.order ?? idx + 1}
                    </span>
                  </td>

                  {/* Question & Answer */}
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <p className="font-bold text-navy text-xs leading-snug">{item.question}</p>
                      <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">{item.answer}</p>
                    </div>
                  </td>

                  {/* Category Pill Tag */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-md bg-slate-100 border border-slate-200/70 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      {item.category || "Basics"}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-surface hover:text-accent transition cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {item._id && (
                        <button
                          onClick={() => setDeleteConfirmId(item._id!)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
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
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-navy">
                {editingItem ? "Edit FAQ" : "Create New FAQ"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-navy cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {editingItem && <input type="hidden" name="id" value={editingItem._id} />}

              {/* Question */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="question"
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="e.g. What is a Global Capability Center (GCC)?"
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="answer"
                  required
                  rows={4}
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="Write clear, detailed answer..."
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Category & Order Grid */}
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
                  <label className="block text-xs font-semibold text-navy mb-1">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    min={1}
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    placeholder="1"
                    className="w-full rounded-xl border border-border px-3.5 py-2 text-xs text-navy focus:border-accent focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-navy hover:bg-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{editingItem ? "Update FAQ" : "Create FAQ"}</span>
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
            <h3 className="text-base font-bold text-navy">Delete FAQ?</h3>
            <p className="mt-1 text-xs text-muted">
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-navy hover:bg-surface cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-xs cursor-pointer"
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
