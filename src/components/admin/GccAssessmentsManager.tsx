"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ClipboardList, Eye, Loader2, RefreshCw, X } from "lucide-react";
import { formatAssessmentAnswer } from "@/lib/gcc-assessment";

export type AssessmentListItem = {
  _id: string;
  name: string;
  company: string;
  email: string;
  role?: string;
  businessContext?: string;
  status?: string;
  notificationStatus?: string;
  notificationError?: string;
  createdAt?: string;
  reportDueAt?: string;
  reviewer?: string;
  reviewStartedAt?: string;
  approvedAt?: string;
  reportContent?: string;
  reportReference?: string;
  reportDeliveryStatus?: string;
  reportDeliveryError?: string;
  reportSentAt?: string;
  answers?: { question: string; answer: string | string[] }[];
};

/** Set to true to show the founder-email retry button in the Actions column again. */
const SHOW_ASSESSMENT_EMAIL_RETRY = false;

export function GccAssessmentsManager({
  initialAssessments,
  isDbConnected,
  initialOpenId,
}: {
  initialAssessments: AssessmentListItem[];
  isDbConnected: boolean;
  initialOpenId?: string;
}) {
  const [rows, setRows] = useState(initialAssessments);
  const [selected, setSelected] = useState<AssessmentListItem | null>(
    initialAssessments.find((row) => row._id === initialOpenId) || null,
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportReference, setReportReference] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialOpenId) return;
    const row = initialAssessments.find((item) => item._id === initialOpenId);
    if (!row) {
      setSelected(null);
      setError("This GCC Assessment submission could not be found.");
      return;
    }
    setError(null);
    void openAssessment(initialOpenId);
    // Open the submission named in the URL once, including its saved answers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOpenId]);

  useEffect(() => {
    if (!selected) return;
    setReviewerName(selected.reviewer || "");
    setReportContent(selected.reportContent || "");
    setReportReference(selected.reportReference || "");
  }, [selected?._id, selected?.status, selected?.reviewer, selected?.reportContent, selected?.reportReference]);

  function remember(next: AssessmentListItem) {
    setRows((prev) => prev.map((row) => (row._id === next._id ? { ...row, ...next } : row)));
    setSelected(next);
    setReviewerName(next.reviewer || "");
    setReportContent(next.reportContent || "");
    setReportReference(next.reportReference || "");
  }

  async function openAssessment(id: string) {
    const cached = rows.find((row) => row._id === id && row.answers?.length);
    if (cached?.answers?.length) {
      remember(cached);
      return;
    }
    setLoadingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/assessments/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not open this assessment.");
      const full = data.assessment as AssessmentListItem;
      remember(full);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open this assessment.");
    } finally {
      setLoadingId(null);
    }
  }

  async function postWorkflow(id: string, path: string, body?: Record<string, string>) {
    setWorking(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/assessments/${id}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "The assessment could not be updated.");
      }
      const resDetail = await fetch(`/api/admin/assessments/${id}`);
      const detail = await resDetail.json();
      if (!resDetail.ok) throw new Error(detail.error || "The assessment could not be reloaded.");
      remember(detail.assessment as AssessmentListItem);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The assessment could not be updated.");
    } finally {
      setWorking(false);
    }
  }

  async function retryEmail(id: string) {
    setRetryingId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/notifications/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "assessment", id }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Email could not be sent.");
      }
      const status = data.alreadySent || data.ok ? "sent" : "failed";
      setRows((prev) =>
        prev.map((row) => (row._id === id ? { ...row, notificationStatus: status } : row)),
      );
      setSelected((current) =>
        current?._id === id ? { ...current, notificationStatus: status } : current,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email could not be sent.");
    } finally {
      setRetryingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">GCC Assessment</h1>
        <p className="mt-1 text-sm text-muted">
          Completed 12-question GCC Assessment submissions.
        </p>
      </div>

      {!isDbConnected ? (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-amber-900 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm font-medium">
            Database is offline. Assessments will load when connected.
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="text-rose-500">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
          <p className="text-xs font-medium text-muted">GCC Assessments</p>
          <p className="mt-1 text-2xl font-bold text-navy">{rows.length}</p>
        </div>
      </div>

      <p className="text-xs text-muted">
        A Vertara practice expert reviews each submission and prepares the feasibility report within 2 business days. This admin view does not generate that report.
      </p>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate">
            <thead className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Company / Email</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Email notice</th>
                <th className="px-5 py-3.5">Received</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted">
                    <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />
                    <p className="mt-3 text-base font-semibold text-navy">No assessments yet</p>
                    <p className="mt-1 text-xs text-muted">
                      Completed 12-question GCC Assessments will show up here.
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row._id} className="transition hover:bg-surface/50">
                    <td className="px-5 py-4 font-bold text-navy">{row.name}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-navy">{row.company}</p>
                      <p className="mt-0.5 text-xs text-muted">{row.email}</p>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold capitalize text-navy">
                      {(row.status || "new").replace("_", " ")}
                    </td>
                    <td className="px-5 py-4 text-xs capitalize text-muted">
                      {row.notificationStatus || "pending"}
                    </td>
                    <td className="px-5 py-4 text-xs whitespace-nowrap text-muted">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {SHOW_ASSESSMENT_EMAIL_RETRY && row.notificationStatus === "failed" ? (
                          <button
                            type="button"
                            title="Retry founder email"
                            onClick={() => void retryEmail(row._id)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-accent-soft hover:text-accent"
                          >
                            {retryingId === row._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          title="View answers"
                          onClick={() => void openAssessment(row._id)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-surface hover:text-navy"
                        >
                          {loadingId === row._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-navy">{selected.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  {selected.company} · {selected.email}
                  {selected.role ? ` · ${selected.role}` : ""}
                </p>
                {selected.businessContext ? (
                  <p className="mt-2 text-sm text-slate">{selected.businessContext}</p>
                ) : null}
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-navy">
                Practice expert
                <input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-normal text-navy"
                />
              </label>
              <div className="text-xs text-muted">
                <p className="font-semibold uppercase tracking-wider">Review status</p>
                <p className="mt-2 text-sm font-bold capitalize text-navy">
                  {(selected.status || "new").replaceAll("_", " ")}
                </p>
                {selected.reportDueAt ? (
                  <p className="mt-1">
                    Report due{" "}
                    {new Date(selected.reportDueAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : null}
              </div>
            </div>

            <label className="mt-4 block text-xs font-semibold text-navy">
              Feasibility report
              <textarea
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                rows={5}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-normal text-navy"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold text-navy">
              Report reference
              <input
                value={reportReference}
                onChange={(e) => setReportReference(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-normal text-navy"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={working}
                onClick={() => void postWorkflow(selected._id, "review", { reviewer: reviewerName })}
                className="rounded-xl bg-navy px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                Mark in review
              </button>
              <button
                type="button"
                disabled={working}
                onClick={() =>
                  void postWorkflow(selected._id, "approve", { reportContent, reportReference })
                }
                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy disabled:opacity-50"
              >
                Approve report
              </button>
              <button
                type="button"
                disabled={working}
                onClick={() => void postWorkflow(selected._id, "deliver")}
                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy disabled:opacity-50"
              >
                Send to submitter
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {(selected.answers || []).map((row, index) => (
                <div key={`${row.question}-${index}`} className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold text-navy">
                    {index + 1}. {row.question}
                  </p>
                  <p className="mt-1 text-sm text-slate">{formatAssessmentAnswer(row.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}