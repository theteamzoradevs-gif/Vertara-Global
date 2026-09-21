"use client";

import { useState, useTransition } from "react";
import {
  Search,
  Trash2,
  Eye,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Inbox,
  Mail,
  Phone,
  Building,
  Clock,
  MessageSquare,
  Target,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  updateLeadStatusAction,
  deleteLeadAction,
} from "@/app/admin/leads/actions";

export interface LeadItemData {
  _id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  intent?: string;
  message?: string;
  source: "contact" | "trust_pop" | "chat" | "engagement_selector" | string;
  status: "new" | "contacted" | "archived" | string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

interface LeadsManagerProps {
  initialLeads: LeadItemData[];
  isDbConnected: boolean;
}

const SOURCE_LABELS: Record<string, { label: string; style: string }> = {
  contact: {
    label: "Contact Form",
    style: "bg-teal-50 text-teal-700 border-teal-200",
  },
  trust_pop: {
    label: "Trust Pop",
    style: "bg-blue-50 text-blue-700 border-blue-200",
  },
  chat: {
    label: "Live Chat",
    style: "bg-orange-50 text-orange-700 border-orange-200",
  },
  engagement_selector: {
    label: "Engagement Selector",
    style: "bg-purple-50 text-purple-700 border-purple-200",
  },
  hero_quick_call: {
    label: "Hero Quick Call",
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function defaultEmailDraft(lead: LeadItemData) {
  const subject = "Re: your inquiry with Veratara Global";
  const lines = [`Hi ${lead.name},`, "", "Thank you for reaching out to Veratara Global."];
  if (lead.message) {
    lines.push("", "You wrote:", lead.message);
  }
  lines.push("", "- Veratara Global");
  return { subject, body: lines.join("\n") };
}

function gmailComposeUrl(to: string, subject: string, body: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function LeadsManager({
  initialLeads,
  isDbConnected,
}: LeadsManagerProps) {
  const [leads, setLeads] = useState<LeadItemData[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal states
  const [selectedLead, setSelectedLead] = useState<LeadItemData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [emailingLead, setEmailingLead] = useState<LeadItemData | null>(null);
  const [emailSubject, setEmailSubject] = useState("");

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

  const openEmailComposer = (lead: LeadItemData) => {
    if (!lead.email) {
      showToast("error", "This inquiry has no email address.");
      return;
    }
    const draft = defaultEmailDraft(lead);
    setEmailingLead(lead);
    setEmailSubject(draft.subject);
  };

  const openGmailCompose = () => {
    if (!emailingLead?.email) return;
    const { body } = defaultEmailDraft(emailingLead);
    window.open(
      gmailComposeUrl(emailingLead.email, emailSubject, body),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const copyInquiryEmail = async () => {
    if (!emailingLead?.email) return;
    try {
      await navigator.clipboard.writeText(emailingLead.email);
      showToast("success", "Email address copied.");
    } catch {
      showToast("error", "Could not copy email address.");
    }
  };

  // Metrics count
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(q) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      (lead.intent && lead.intent.toLowerCase().includes(q)) ||
      (lead.message && lead.message.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle Status Update
  const handleStatusUpdate = (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateLeadStatusAction(id, newStatus);
      if (res.success) {
        showToast("success", res.message || "Status updated!");
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        showToast("error", res.error || "Failed to update status.");
      }
    });
  };

  // Handle Delete Lead
  const handleDeleteConfirm = () => {
    if (!deletingId) return;

    startTransition(async () => {
      const res = await deleteLeadAction(deletingId);
      if (res.success) {
        showToast("success", res.message || "Lead deleted.");
        setLeads((prev) => prev.filter((l) => l._id !== deletingId));
        if (selectedLead && selectedLead._id === deletingId) {
          setSelectedLead(null);
        }
        setDeletingId(null);
      } else {
        showToast("error", res.error || "Failed to delete lead.");
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
            Database is offline. Inquiries will load when connected.
          </p>
        </div>
      )}

      {/* Header & Metrics */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">
            Form and chat inquiries from the website.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Total Inquiries</p>
          <p className="mt-1 text-2xl font-bold text-navy">{leads.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">New</p>
          <p className="mt-1 text-2xl font-bold text-teal-600">{newCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs text-muted font-medium">Contacted</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{contactedCount}</p>
        </div>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface p-1 text-xs">
            {(["all", "new", "contacted"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 font-semibold capitalize transition ${
                  statusFilter === st
                    ? "bg-navy text-white shadow-xs"
                    : "text-muted hover:text-navy"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate">
            <thead className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3.5">Lead Name</th>
                <th className="px-5 py-3.5">Company / Email</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">Intent</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Received</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <Inbox className="h-10 w-10 text-slate-300" />
                      <p className="mt-3 text-base font-semibold text-navy">No inquiries found</p>
                      <p className="mt-1 text-xs text-muted">
                        {searchQuery || statusFilter !== "all"
                          ? "Try a different search or status."
                          : "New inquiries will show up here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const sourceConfig = SOURCE_LABELS[lead.source] || {
                    label: lead.source,
                    style: "bg-surface text-muted border-border",
                  };

                  return (
                    <tr
                      key={lead._id}
                      className="transition hover:bg-surface/50"
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy">{lead.name}</span>
                          {lead.status === "new" && (
                            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                          )}
                        </div>
                        {lead.phone && (
                          <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {lead.phone}
                          </p>
                        )}
                      </td>

                      {/* Company & Email */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy">{lead.company || "-"}</p>
                        {lead.email && (
                          <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                            <Mail className="h-3 w-3 text-slate-400" />
                            {lead.email}
                          </p>
                        )}
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${sourceConfig.style}`}
                        >
                          {sourceConfig.label}
                        </span>
                      </td>

                      {/* Intent */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-navy max-w-[200px] truncate block">
                          {lead.intent || "-"}
                        </span>
                      </td>

                      {/* Status Selector Pills */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {(["new", "contacted"] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusUpdate(lead._id, st)}
                              disabled={isPending}
                              className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition ${
                                lead.status === st
                                  ? st === "new"
                                    ? "bg-teal-600 text-white shadow-xs"
                                    : "bg-blue-600 text-white shadow-xs"
                                  : "bg-surface text-slate-500 hover:bg-surface-elevated hover:text-navy border border-border"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>

                      {/* Created At */}
                      <td className="px-5 py-4 text-xs text-muted whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {lead.email ? (
                            <button
                              type="button"
                              onClick={() => openEmailComposer(lead)}
                              title={`Email ${lead.email}`}
                              className="rounded-lg p-1.5 text-slate-500 hover:bg-accent-soft hover:text-accent"
                            >
                              <Mail className="h-4 w-4" />
                            </button>
                          ) : (
                            <span
                              title="No email provided"
                              className="rounded-lg p-1.5 text-slate-300 cursor-not-allowed"
                            >
                              <Mail className="h-4 w-4" />
                            </span>
                          )}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            title="View inquiry"
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-surface hover:text-navy"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(lead._id)}
                            title="Delete inquiry"
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-navy">{selectedLead.name}</h3>
                <span
                  className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold ${
                    SOURCE_LABELS[selectedLead.source]?.style || "bg-surface text-muted"
                  }`}
                >
                  {SOURCE_LABELS[selectedLead.source]?.label || selectedLead.source}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Contact Info Cards */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Building className="h-3.5 w-3.5 text-slate-400" />
                    Company
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {selectedLead.company || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    Email Address
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {selectedLead.email ? (
                      <button
                        type="button"
                        onClick={() => openEmailComposer(selectedLead)}
                        className="text-accent hover:underline"
                      >
                        {selectedLead.email}
                      </button>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    Phone Number
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {selectedLead.phone ? (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-navy hover:underline"
                      >
                        {selectedLead.phone}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Received At
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Intent */}
              {selectedLead.intent && (
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Target className="h-3.5 w-3.5 text-accent" />
                    Intent
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {selectedLead.intent}
                  </p>
                </div>
              )}

              {/* Message Body */}
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                  Inquiry message
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate font-normal whitespace-pre-wrap">
                  {selectedLead.message || "No message recorded."}
                </p>
              </div>

              {/* Status Updater in Modal */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy">Status:</span>
                  <div className="flex items-center gap-1">
                    {(["new", "contacted"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusUpdate(selectedLead._id, st)}
                        disabled={isPending}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition ${
                          selectedLead.status === st
                            ? st === "new"
                              ? "bg-teal-600 text-white"
                              : "bg-blue-600 text-white"
                            : "bg-surface text-slate-500 hover:bg-surface-elevated hover:text-navy border border-border"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email compose modal */}
      {emailingLead && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-navy">Email inquiry</h3>
                <p className="mt-0.5 text-xs text-muted">{emailingLead.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setEmailingLead(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">To</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={emailingLead.email || ""}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-navy"
                  />
                  <button
                    type="button"
                    onClick={copyInquiryEmail}
                    title="Copy email"
                    className="rounded-xl border border-border p-2 text-slate-500 hover:bg-surface hover:text-navy"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Subject</label>
                <input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full rounded-xl border border-border px-3.5 py-2 text-sm text-navy focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setEmailingLead(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={openGmailCompose}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Gmail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
            <h3 className="mt-3 text-lg font-bold text-navy">Delete inquiry?</h3>
            <p className="mt-1 text-sm text-muted">
              This will permanently delete the inquiry.
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
