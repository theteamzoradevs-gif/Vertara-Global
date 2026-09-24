"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Database,
  Building,
  Tag,
  ImageIcon,
  Star,
  Trash,
} from "lucide-react";
import {
  createCaseStudyAction,
  updateCaseStudyAction,
  deleteCaseStudyAction,
  seedCaseStudiesAction,
} from "@/app/admin/case-studies/actions";

export interface MetricItem {
  label: string;
  value: string;
}

export interface CaseStudyItemData {
  _id?: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  metrics: MetricItem[];
  image: string;
  featured?: boolean;
}

interface CaseStudiesManagerProps {
  initialCaseStudies: CaseStudyItemData[];
  isDbConnected: boolean;
}

export function CaseStudiesManager({
  initialCaseStudies,
  isDbConnected,
}: CaseStudiesManagerProps) {
  const [cases, setCases] = useState<CaseStudyItemData[]>(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CaseStudyItemData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Dynamic metrics form state (for modal)
  const [modalMetrics, setModalMetrics] = useState<MetricItem[]>([]);

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

  // Open Add Modal
  const handleOpenAddModal = () => {
    setModalMetrics([
      { label: "Cost vs prior model", value: "-20%" },
      { label: "Time to launch", value: "90 days" },
    ]);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (item: CaseStudyItemData) => {
    setEditingItem(item);
    setModalMetrics(item.metrics && item.metrics.length > 0 ? item.metrics : []);
  };

  // Dynamic Metrics Handlers
  const handleAddMetricField = () => {
    setModalMetrics((prev) => [...prev, { label: "", value: "" }]);
  };

  const handleMetricChange = (
    index: number,
    field: "label" | "value",
    val: string
  ) => {
    setModalMetrics((prev) =>
      prev.map((m, idx) => (idx === index ? { ...m, [field]: val } : m))
    );
  };

  const handleRemoveMetricField = (index: number) => {
    setModalMetrics((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Filtered list — featured pinned first (same as frontend)
  const filteredCases = cases
    .filter((cs) => {
      const q = searchQuery.toLowerCase();
      return (
        cs.title.toLowerCase().includes(q) ||
        cs.client.toLowerCase().includes(q) ||
        cs.industry.toLowerCase().includes(q) ||
        cs.challenge.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  // Handle Create Submit
  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("metrics", JSON.stringify(modalMetrics));

    startTransition(async () => {
      const res = await createCaseStudyAction(formData);
      if (res.success) {
        showToast("success", res.message || "Case Study created!");
        setIsAddModalOpen(false);
        const newObj: CaseStudyItemData = {
          _id: `temp-${Date.now()}`,
          title: String(formData.get("title")),
          client: String(formData.get("client")),
          industry: String(formData.get("industry")),
          challenge: String(formData.get("challenge")),
          approach: String(formData.get("approach")),
          result: String(formData.get("result")),
          image: String(formData.get("image")),
          featured: formData.get("featured") === "true",
          metrics: modalMetrics,
        };
        setCases((prev) => [
          newObj,
          ...(newObj.featured
            ? prev.map((c) => ({ ...c, featured: false }))
            : prev),
        ]);
      } else {
        showToast("error", res.error || "Failed to create case study.");
      }
    });
  };

  // Handle Update Submit
  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    const formData = new FormData(e.currentTarget);
    formData.append("id", editingItem._id || "");
    formData.append("metrics", JSON.stringify(modalMetrics));

    startTransition(async () => {
      const res = await updateCaseStudyAction(formData);
      if (res.success) {
        showToast("success", res.message || "Case Study updated!");
        const updatedTitle = String(formData.get("title"));
        const updatedClient = String(formData.get("client"));
        const updatedIndustry = String(formData.get("industry"));
        const updatedChallenge = String(formData.get("challenge"));
        const updatedApproach = String(formData.get("approach"));
        const updatedResult = String(formData.get("result"));
        const updatedImage = String(formData.get("image"));
        const updatedFeatured = formData.get("featured") === "true";

        setCases((prev) =>
          prev.map((c) =>
            c._id === editingItem._id
              ? {
                  ...c,
                  title: updatedTitle,
                  client: updatedClient,
                  industry: updatedIndustry,
                  challenge: updatedChallenge,
                  approach: updatedApproach,
                  result: updatedResult,
                  image: updatedImage,
                  featured: updatedFeatured,
                  metrics: modalMetrics,
                }
              : updatedFeatured
                ? { ...c, featured: false }
                : c
          )
        );
        setEditingItem(null);
      } else {
        showToast("error", res.error || "Failed to update case study.");
      }
    });
  };

  // Handle Delete
  const handleDeleteConfirm = () => {
    if (!deletingId) return;

    startTransition(async () => {
      const res = await deleteCaseStudyAction(deletingId);
      if (res.success) {
        showToast("success", res.message || "Case Study deleted.");
        setCases((prev) => prev.filter((c) => c._id !== deletingId));
        setDeletingId(null);
      } else {
        showToast("error", res.error || "Failed to delete case study.");
      }
    });
  };

  // Handle Seeding Database
  const handleSeedDatabase = () => {
    startTransition(async () => {
      const res = await seedCaseStudiesAction();
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
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
              : "border-rose-500/30 bg-rose-500/10 text-rose-700"
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

      {/* Database Warning Banner */}
      {!isDbConnected && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-amber-900 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm font-medium">
            Database connection is unavailable. Currently displaying static seed case studies.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Case Studies Manager</h1>
          <p className="mt-1 text-sm text-muted">
            Manage GCC client outcomes, metrics callouts, and programme shapes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isDbConnected && cases.some((c) => c._id?.startsWith("seed-")) && (
            <button
              onClick={handleSeedDatabase}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-navy shadow-xs transition hover:bg-surface-elevated disabled:opacity-50"
            >
              <Database className="h-4 w-4 text-accent" />
              Import Default Data to DB
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            disabled={!isDbConnected}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-accent/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add Case Study
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, industry, or engagement model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="text-sm font-medium text-muted">
          Total: <span className="font-semibold text-navy">{filteredCases.length}</span>
        </div>
      </div>

      {/* Case Studies List */}
      {filteredCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <Building className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-base font-semibold text-navy">No case studies found</p>
          <p className="mt-1 text-sm text-muted">
            {searchQuery
              ? "Try adjusting your search query."
              : "Click 'Add Case Study' to create your first item."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCases.map((cs) => (
            <div
              key={cs._id || cs.title}
              className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs transition hover:shadow-md"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">
                      {cs.industry}
                    </span>
                    <span className="text-xs font-medium text-muted">
                      {cs.client}
                    </span>
                    {cs.featured && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(cs)}
                      disabled={!isDbConnected || cs._id?.startsWith("seed-")}
                      title={
                        cs._id?.startsWith("seed-")
                          ? "Import to DB first to edit"
                          : "Edit Case Study"
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-slate hover:bg-surface-elevated hover:text-navy disabled:opacity-40"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingId(cs._id || null)}
                      disabled={!isDbConnected || cs._id?.startsWith("seed-")}
                      title={
                        cs._id?.startsWith("seed-")
                          ? "Import to DB first to delete"
                          : "Delete Case Study"
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 disabled:opacity-40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold text-navy">{cs.title}</h3>

                <dl className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
                  <div className="rounded-xl bg-surface p-3.5 border border-border/50">
                    <dt className="font-bold text-navy">Challenge</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted">{cs.challenge}</dd>
                  </div>
                  <div className="rounded-xl bg-surface p-3.5 border border-border/50">
                    <dt className="font-bold text-navy">Approach</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted">{cs.approach}</dd>
                  </div>
                  <div className="rounded-xl bg-surface p-3.5 border border-border/50">
                    <dt className="font-bold text-navy">Result</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted">{cs.result}</dd>
                  </div>
                </dl>

                {cs.metrics && cs.metrics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {cs.metrics.map((m, idx) => (
                      <div
                        key={m.label + idx}
                        className="rounded-xl border border-border bg-surface px-4 py-2"
                      >
                        <p className="metric-number text-lg font-bold text-accent">
                          {m.value}
                        </p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-navy">Add New Case Study</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Case Study Title *
                </label>
                <input
                  name="title"
                  required
                  type="text"
                  placeholder="e.g. Standing up a 180-person product engineering GCC"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Client / Engagement Label
                  </label>
                  <input
                    name="client"
                    type="text"
                    placeholder="e.g. Build & Transfer · Product engineering"
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Industry
                  </label>
                  <input
                    name="industry"
                    type="text"
                    placeholder="e.g. Retail / Digital, BFSI"
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Challenge
                </label>
                <textarea
                  name="challenge"
                  rows={2}
                  placeholder="Describe the initial client problem or goal..."
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Approach
                </label>
                <textarea
                  name="approach"
                  rows={2}
                  placeholder="Describe the execution plan and solution..."
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Result
                </label>
                <textarea
                  name="result"
                  rows={2}
                  placeholder="Describe key outcomes and metric impact..."
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Dynamic Metrics Section */}
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy">
                    Metric Callouts ({modalMetrics.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMetricField}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-accent hover:bg-surface"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Metric
                  </button>
                </div>

                <div className="space-y-2">
                  {modalMetrics.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 180, -22%)"
                        value={m.value}
                        onChange={(e) =>
                          handleMetricChange(idx, "value", e.target.value)
                        }
                        className="w-1/3 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Headcount at transfer)"
                        value={m.label}
                        onChange={(e) =>
                          handleMetricChange(idx, "label", e.target.value)
                        }
                        className="w-2/3 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMetricField(idx)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Cover Image Path / URL
                  </label>
                  <input
                    name="image"
                    type="text"
                    placeholder="/images/gcc-floor.webp"
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="add-featured"
                    name="featured"
                    value="true"
                    defaultChecked
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="add-featured"
                    className="text-sm font-semibold text-navy cursor-pointer"
                  >
                    Featured on Homepage
                  </label>
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
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-navy">Edit Case Study</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Case Study Title *
                </label>
                <input
                  name="title"
                  required
                  type="text"
                  defaultValue={editingItem.title}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Client / Engagement Label
                  </label>
                  <input
                    name="client"
                    type="text"
                    defaultValue={editingItem.client}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Industry
                  </label>
                  <input
                    name="industry"
                    type="text"
                    defaultValue={editingItem.industry}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Challenge
                </label>
                <textarea
                  name="challenge"
                  rows={2}
                  defaultValue={editingItem.challenge}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Approach
                </label>
                <textarea
                  name="approach"
                  rows={2}
                  defaultValue={editingItem.approach}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Result
                </label>
                <textarea
                  name="result"
                  rows={2}
                  defaultValue={editingItem.result}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>

              {/* Dynamic Metrics Section */}
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy">
                    Metric Callouts ({modalMetrics.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMetricField}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-accent hover:bg-surface"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Metric
                  </button>
                </div>

                <div className="space-y-2">
                  {modalMetrics.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Value"
                        value={m.value}
                        onChange={(e) =>
                          handleMetricChange(idx, "value", e.target.value)
                        }
                        className="w-1/3 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={m.label}
                        onChange={(e) =>
                          handleMetricChange(idx, "label", e.target.value)
                        }
                        className="w-2/3 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs text-navy focus:border-accent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMetricField(idx)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Cover Image Path / URL
                  </label>
                  <input
                    name="image"
                    type="text"
                    defaultValue={editingItem.image}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    name="featured"
                    value="true"
                    defaultChecked={editingItem.featured}
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="edit-featured"
                    className="text-sm font-semibold text-navy cursor-pointer"
                  >
                    Featured on Homepage
                  </label>
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
                  Update Case Study
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
            <h3 className="mt-3 text-lg font-bold text-navy">Delete Case Study?</h3>
            <p className="mt-1 text-sm text-muted">
              This action cannot be undone. Are you sure you want to delete this case study?
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
