"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  Search,
  Trash2,
  Eye,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Copy,
  Clock,
  Hash,
  Route,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  deleteChatSessionAction,
  listChatSessionsAction,
} from "@/app/admin/chat-sessions/actions";
import {
  CHAT_SESSION_PAGE_SIZE,
  type ChatSessionListFilters,
} from "@/app/admin/chat-sessions/constants";

export type ChatMessageData = {
  role: "bot" | "user" | string;
  text: string;
  at?: string;
};

export type ChatSessionData = {
  _id: string;
  sessionId: string;
  path?: string[];
  messages?: ChatMessageData[];
  intent?: string;
  status?: "opened" | "in_progress" | "completed" | string;
  createdAt?: string;
  updatedAt?: string;
};

interface ChatSessionsManagerProps {
  initialSessions: ChatSessionData[];
  initialTotal: number;
  isDbConnected: boolean;
  loadError?: string | null;
}

const PATH_LABELS: Record<string, string> = {
  start: "Start",
  greeting: "Greeting",
  fallback: "Fallback",
  thanks: "Thanks",
  full_gcc: "Full GCC",
  services_hub: "Services",
  talent: "Talent",
  workspace: "Workspace",
  operations: "Operations",
  advisory: "Advisory",
  pricing: "Pricing",
  models_link: "Engagement models",
  callback: "Callback",
  consult: "Consultation",
  consult_form: "Contact form",
  lead_captured: "Lead captured",
};

function pathLabel(id: string) {
  return PATH_LABELS[id] || id.replace(/_/g, " ");
}

function formatPath(path?: string[]) {
  if (!path?.length) return "-";
  return path.map(pathLabel).join(" / ");
}

function formatDateTime(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function lastUserPreview(messages?: ChatMessageData[]) {
  const userMsgs = (messages || []).filter((m) => m.role === "user" && m.text?.trim());
  if (!userMsgs.length) return "No user message yet";
  const text = userMsgs[userMsgs.length - 1].text.trim();
  return text.length > 110 ? `${text.slice(0, 110)}...` : text;
}

function sessionStatus(session: ChatSessionData) {
  if (session.intent === "lead_captured") {
    return { label: "Lead captured", style: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  }
  if (session.status === "completed") {
    return { label: "Completed", style: "bg-slate-100 text-slate-700 border-slate-200" };
  }
  if (session.status === "opened") {
    return { label: "Opened", style: "bg-surface text-muted border-border" };
  }
  if (session.status === "in_progress") {
    return { label: "In progress", style: "bg-teal-50 text-teal-700 border-teal-200" };
  }
  // Legacy sessions without status field
  const count = session.messages?.length || 0;
  const hasUser = (session.messages || []).some((m) => m.role === "user");
  if (!hasUser || count <= 1) {
    return { label: "Opened", style: "bg-surface text-muted border-border" };
  }
  return { label: "In progress", style: "bg-teal-50 text-teal-700 border-teal-200" };
}

export function ChatSessionsManager({
  initialSessions,
  initialTotal,
  isDbConnected,
  loadError,
}: ChatSessionsManagerProps) {
  const [sessions, setSessions] = useState<ChatSessionData[]>(initialSessions);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [datePreset, setDatePreset] = useState<ChatSessionListFilters["datePreset"]>("all");
  const [selected, setSelected] = useState<ChatSessionData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(loadError || null);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const skipFirstFetch = useRef(true);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const totalPages = Math.max(1, Math.ceil(total / CHAT_SESSION_PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (page - 1) * CHAT_SESSION_PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * CHAT_SESSION_PAGE_SIZE, total);

  async function fetchSessions(nextPage = page) {
    setLoading(true);
    const res = await listChatSessionsAction({
      page: nextPage,
      search: searchQuery,
      datePreset,
    });
    if (res.success) {
      setSessions(res.sessions as ChatSessionData[]);
      setTotal(res.total);
      setPage(res.page);
      setError(null);
    } else {
      setError(res.error || "Failed to load chat sessions.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (skipFirstFetch.current) {
      skipFirstFetch.current = false;
      return;
    }
    const delay = searchQuery ? 300 : 0;
    const timer = window.setTimeout(() => {
      void fetchSessions(1);
    }, delay);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, datePreset]);

  const copySessionId = async (sessionId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(sessionId);
      showToast("success", "Session ID copied.");
    } catch {
      showToast("error", "Could not copy session ID.");
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingId) return;
    startTransition(async () => {
      const res = await deleteChatSessionAction(deletingId);
      if (res.success) {
        showToast("success", res.message || "Session deleted.");
        setSessions((prev) => prev.filter((s) => s._id !== deletingId));
        setTotal((n) => Math.max(0, n - 1));
        if (selected?._id === deletingId) setSelected(null);
        setDeletingId(null);
      } else {
        showToast("error", res.error || "Failed to delete session.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${
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
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {!isDbConnected && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-amber-900">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm font-medium">
            Database is offline. Sessions will load when connected.
          </p>
        </div>
      )}

      {error && isDbConnected && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-300/80 bg-rose-50 p-4 text-rose-900">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-navy">Chat Sessions</h1>
        <p className="mt-1 text-sm text-muted">
          Conversations from the website chat.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs sm:max-w-xs">
        <p className="text-xs text-muted font-medium">Total Sessions</p>
        <p className="mt-1 text-2xl font-bold text-navy">{total}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search session ID, path, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={datePreset}
          onChange={(e) =>
            setDatePreset(e.target.value as ChatSessionListFilters["datePreset"])
          }
          className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-navy focus:border-accent focus:outline-none cursor-pointer"
        >
          <option value="all">All dates</option>
          <option value="today">Today</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-border bg-surface-elevated py-16 text-muted">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface-elevated px-5 py-12 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 text-base font-semibold text-navy">No chat sessions found</p>
            <p className="mt-1 text-xs text-muted">
              {searchQuery || datePreset !== "all"
                ? "Try a different search or date range."
                : "New chat sessions will show up here."}
            </p>
          </div>
        ) : (
          sessions.map((session) => {
            const status = sessionStatus(session);
            const messageCount = session.messages?.length || 0;
            return (
              <article
                key={session._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(session)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(session);
                  }
                }}
                className="cursor-pointer rounded-2xl border border-border bg-surface-elevated p-5 shadow-xs transition hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-sm font-semibold text-navy">
                        {session.sessionId}
                      </p>
                      {status.label !== "In progress" ? (
                        <span
                          className={`inline-block rounded-lg border px-2 py-0.5 text-[11px] font-bold ${status.style}`}
                        >
                          {status.label}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(session.updatedAt || session.createdAt)}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(session)}
                      title="View conversation"
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-surface hover:text-navy"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => copySessionId(session.sessionId, e)}
                      title="Copy session ID"
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-accent-soft hover:text-accent"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingId(session._id)}
                      title="Delete session"
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">
                  <span className="font-semibold text-navy">Path: </span>
                  {formatPath(session.path)}
                </p>
                <p className="mt-2 text-sm text-slate">
                  <span className="font-semibold text-navy">User: </span>
                  {lastUserPreview(session.messages)}
                </p>
                <p className="mt-2 text-[11px] font-medium text-muted">
                  {messageCount} message{messageCount === 1 ? "" : "s"}
                </p>
              </article>
            );
          })
        )}
      </div>

      {total > CHAT_SESSION_PAGE_SIZE && (
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-xs text-muted">
          <p>
            Showing {rangeStart}-{rangeEnd} of {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => void fetchSessions(page - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 font-semibold text-navy disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </button>
            <span className="font-semibold text-navy">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => void fetchSessions(page + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 font-semibold text-navy disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-navy">Conversation</h3>
                <p className="mt-0.5 font-mono text-xs text-muted">{selected.sessionId}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-surface hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3 border-b border-border bg-surface px-6 py-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface-elevated p-3">
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Hash className="h-3.5 w-3.5" />
                  Session ID
                </p>
                <p className="mt-1 break-all font-mono text-xs font-semibold text-navy">
                  {selected.sessionId}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-elevated p-3">
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  Started at
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">
                  {formatDateTime(selected.createdAt)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-elevated p-3">
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <Route className="h-3.5 w-3.5" />
                  Path
                </p>
                <p className="mt-1 text-xs font-semibold text-navy">{formatPath(selected.path)}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-elevated p-3">
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Messages
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">
                  {selected.messages?.length || 0}
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-surface px-6 py-4">
              {(selected.messages || []).length === 0 ? (
                <p className="text-sm text-muted">No messages in this session.</p>
              ) : (
                (selected.messages || []).map((message, i) => (
                  <div
                    key={`${message.role}-${i}`}
                    className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "bot"
                        ? "bg-white text-navy shadow-sm ring-1 ring-border"
                        : "ml-auto bg-navy text-white"
                    }`}
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                      {message.role === "bot" ? "Alex" : "User"}
                      {message.at ? ` - ${formatDateTime(message.at)}` : ""}
                    </p>
                    {message.text}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => copySessionId(selected.sessionId)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-medium text-navy hover:bg-surface"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy ID
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeletingId(selected._id);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 text-center shadow-xl">
            <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
            <h3 className="mt-3 text-lg font-bold text-navy">Delete chat session?</h3>
            <p className="mt-1 text-sm text-muted">
              This will permanently delete the session transcript.
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
