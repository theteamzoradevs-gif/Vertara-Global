"use client";

import { useState } from "react";
import { AlertCircle, ClipboardList, Eye, Loader2, RefreshCw, X } from "lucide-react";
import { formatAssessmentAnswer } from "@/lib/gcc-assessment";

export type AssessmentListItem = {
  _id: string;
  name: string;
  company: string;
  email: string;
  status?: string;
  notificationStatus?: string;
  notificationError?: string;
  createdAt?: string;
  answers?: { question: string; answer: string | string[] }[];
};

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
  const [error, setError] = useState<string | null>(null);

  async function openAssessment(id: string) {
    const cached = rows.find((row) => row._id === id && row.answers?.length);
    if (cached?.answers?.length) {
      setSelected(cached);
      return;
    }
    setLoadingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/assessments/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not open this assessment.");
      const full = data.assessment as AssessmentListItem;
      setRows((prev) => prev.map((row) => (row._id === id ? { ...row, ...full } : row)));
      setSelected(full);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open this assessment.");
    } finally {
      setLoadingId(null);
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
                        {row.notificationStatus === "failed" ? (
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
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              {(selected.answers || []).map((row, index) => (
                <div key={`${row.question}-${index}`} className="rounded-xl border border-border bg-surface p-3.5">
                  <p className="text-xs font-semibold text-navy">
                    {index + 1}. {row.question}
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    {formatAssessmentAnswer(row.answer)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
