"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Quote,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Database,
  User,
  Building2,
  Briefcase,
} from "lucide-react";
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  seedTestimonialsAction,
} from "@/app/admin/testimonials/actions";

export interface TestimonialItemData {
  _id?: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
}

interface TestimonialsManagerProps {
  initialTestimonials: TestimonialItemData[];
  isDbConnected: boolean;
}

export function TestimonialsManager({
  initialTestimonials,
  isDbConnected,
}: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] =
    useState<TestimonialItemData[]>(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItemData | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Status message state
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.quote.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q) ||
      (t.role && t.role.toLowerCase().includes(q)) ||
      (t.company && t.company.toLowerCase().includes(q))
    );
  });

  // Handle Create
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createTestimonialAction(formData);
      if (res.success) {
        showToast("success", res.message || "Testimonial created!");
        setIsAddModalOpen(false);
        const newObj: TestimonialItemData = {
          _id: `temp-${Date.now()}`,
          quote: String(formData.get("quote")),
          name: String(formData.get("name")),
          role: String(formData.get("role")),
          company: String(formData.get("company")),
          image: String(formData.get("image")),
        };
        setTestimonials((prev) => [newObj, ...prev]);
      } else {
        showToast("error", res.error || "Failed to create testimonial.");
      }
    });
  };

  // Handle Edit Update
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    const formData = new FormData(e.currentTarget);
    formData.append("id", editingItem._id || "");

    startTransition(async () => {
      const res = await updateTestimonialAction(formData);
      if (res.success) {
        showToast("success", res.message || "Testimonial updated!");
        const updatedQuote = String(formData.get("quote"));
        const updatedName = String(formData.get("name"));
        const updatedRole = String(formData.get("role"));
        const updatedCompany = String(formData.get("company"));
        const updatedImage = String(formData.get("image"));

        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === editingItem._id
              ? {
                  ...t,
                  quote: updatedQuote,
                  name: updatedName,
                  role: updatedRole,
                  company: updatedCompany,
                  image: updatedImage,
                }
              : t
          )
        );
        setEditingItem(null);
      } else {
        showToast("error", res.error || "Failed to update testimonial.");
      }
    });
  };

  // Handle Delete
  const handleDeleteConfirm = () => {
    if (!deletingId) return;

    startTransition(async () => {
      const res = await deleteTestimonialAction(deletingId);
      if (res.success) {
        showToast("success", res.message || "Testimonial deleted.");
        setTestimonials((prev) => prev.filter((t) => t._id !== deletingId));
        setDeletingId(null);
      } else {
        showToast("error", res.error || "Failed to delete testimonial.");
      }
    });
  };

  // Handle Seeding Database
  const handleSeedDatabase = () => {
    startTransition(async () => {
      const res = await seedTestimonialsAction();
      if (res.success) {
        showToast("success", res.message || "Database seeded successfully!");
        window.location.reload();
      } else {
        showToast("error", res.error || "Failed to seed database.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all ${
            toastMessage.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          )}
          <p className="text-sm font-medium">{toastMessage.text}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Database Warning / Seed Banner if using seed fallbacks */}
      {!isDbConnected && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-amber-900 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm font-medium">
            Database connection is unavailable. Currently displaying static seed testimonials.
          </p>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Testimonials Manager</h1>
          <p className="mt-1 text-sm text-muted">
            Manage operator voices, client quotes, and capability testimonials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isDbConnected && testimonials.some((t) => t._id?.startsWith("seed-")) && (
            <button
              onClick={handleSeedDatabase}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-navy shadow-sm transition hover:bg-surface-elevated disabled:opacity-50"
            >
              <Database className="h-4 w-4 text-accent" />
              Import Default Data to DB
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            disabled={!isDbConnected}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by quote, author name, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="text-sm font-medium text-muted">
          Total: <span className="font-semibold text-navy">{filteredTestimonials.length}</span>
        </div>
      </div>

      {/* Testimonials Grid / List */}
      {filteredTestimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <Quote className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-base font-semibold text-navy">No testimonials found</p>
          <p className="mt-1 text-sm text-muted">
            {searchQuery
              ? "Try adjusting your search query."
              : "Click 'Add Testimonial' to create your first item."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((item) => (
            <div
              key={item._id || item.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <Quote className="h-6 w-6 text-accent/60" />
                <p className="mt-2 text-sm leading-relaxed text-slate font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-navy">{item.name}</h4>
                    {item.role && (
                      <p className="text-xs text-slate-500">{item.role}</p>
                    )}
                    {item.company && (
                      <p className="mt-0.5 text-xs font-medium text-accent">
                        {item.company}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      disabled={!isDbConnected || item._id?.startsWith("seed-")}
                      title={
                        item._id?.startsWith("seed-")
                          ? "Import to DB first to edit"
                          : "Edit"
                      }
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-surface hover:text-navy disabled:opacity-40"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item._id || null)}
                      disabled={!isDbConnected || item._id?.startsWith("seed-")}
                      title={
                        item._id?.startsWith("seed-")
                          ? "Import to DB first to delete"
                          : "Delete"
                      }
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-navy">Add New Testimonial</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quote *
                </label>
                <textarea
                  name="quote"
                  required
                  rows={3}
                  placeholder="Enter the operator quote..."
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Author Name *
                  </label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="e.g. Elena Brooks"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </label>
                  <div className="relative mt-1">
                    <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      name="role"
                      type="text"
                      placeholder="e.g. VP Operations"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Service / Industry
                  </label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      name="company"
                      type="text"
                      placeholder="e.g. Workplace · Extended capacity"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Avatar Image URL (Optional)
                  </label>
                  <input
                    name="image"
                    type="text"
                    placeholder="https://..."
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-navy">Edit Testimonial</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quote *
                </label>
                <textarea
                  name="quote"
                  required
                  rows={3}
                  defaultValue={editingItem.quote}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Author Name *
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    defaultValue={editingItem.name}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </label>
                  <input
                    name="role"
                    type="text"
                    defaultValue={editingItem.role || ""}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Service / Industry
                  </label>
                  <input
                    name="company"
                    type="text"
                    defaultValue={editingItem.company || ""}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Avatar Image URL
                  </label>
                  <input
                    name="image"
                    type="text"
                    defaultValue={editingItem.image || ""}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Update Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
            <h3 className="mt-3 text-lg font-bold text-navy">Delete Testimonial?</h3>
            <p className="mt-1 text-sm text-slate-500">
              This action cannot be undone. Are you sure you want to delete this testimonial?
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
