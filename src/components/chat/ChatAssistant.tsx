"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  chatNodes,
  resolveUserMessage,
  type ChatNode,
} from "@/lib/chat/script";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string };

const DISMISS_KEY = "gcc-chat-dismissed";
const ALEX_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80";

function sessionId() {
  if (typeof window === "undefined") return "";
  const key = "gcc-chat-session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function AlexAvatar({ size = 56, ring = true }: { size?: number; ring?: boolean }) {
  const dot = Math.max(12, Math.round(size * 0.28));
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 rounded-full bg-navy",
        ring && "ring-2 ring-accent/45 ring-offset-2 ring-offset-transparent",
      )}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <Image
          src={ALEX_AVATAR}
          alt="Alex"
          width={size}
          height={size}
          className="h-full w-full object-cover object-top"
        />
      </span>
      <span
        className="absolute -bottom-0.5 -right-0.5"
        style={{ width: dot, height: dot }}
        aria-hidden
      >
        <span className="online-ping absolute inset-0 rounded-full bg-emerald-400" />
        <span className="online-glow relative block h-full w-full rounded-full bg-emerald-400 ring-2 ring-white" />
      </span>
    </span>
  );
}

export function ChatAssistant() {
  const [open, setOpen] = useState(true);
  /** Soft-dismiss of bubble only; returns when chat is closed again */
  const [bubbleSoftHidden, setBubbleSoftHidden] = useState(false);
  const [nodeId, setNodeId] = useState("start");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: chatNodes.start.bot },
  ]);
  const [path, setPath] = useState<string[]>(["start"]);
  const [leadDone, setLeadDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const node: ChatNode = chatNodes[nodeId] ?? chatNodes.start;
  const sid = useMemo(() => (open ? sessionId() : ""), [open]);

  // Bubble stays visible whenever the chat panel is closed
  const showBubble = !open && !bubbleSoftHidden;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, nodeId, typing]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  function openChat() {
    setOpen(true);
    setBubbleSoftHidden(false);
  }

  function closeChat() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    // Always bring the “Alex online” bubble back after chat closes
    setBubbleSoftHidden(false);
  }

  function dismissBubble(e: React.MouseEvent) {
    e.stopPropagation();
    setBubbleSoftHidden(true);
  }

  async function logSession(
    nextPath: string[],
    nextMessages: Msg[],
    intent?: string,
  ) {
    if (!sid) return;
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sid,
          path: nextPath,
          messages: nextMessages,
          intent,
        }),
      });
    } catch {
      /* non-blocking */
    }
  }

  function applyNode(nextId: string, userLabel: string) {
    const next = chatNodes[nextId] ?? chatNodes.fallback;
    setTyping(true);
    const withUser: Msg[] = [...messages, { role: "user", text: userLabel }];
    setMessages(withUser);

    window.setTimeout(() => {
      const nextMessages: Msg[] = [
        ...withUser,
        { role: "bot", text: next.bot },
      ];
      const nextPath = [...path, next.id];
      setMessages(nextMessages);
      setPath(nextPath);
      setNodeId(next.id);
      setTyping(false);
      void logSession(nextPath, nextMessages, next.id);
    }, 450);
  }

  function goTo(nextId: string, userLabel: string) {
    applyNode(nextId, userLabel);
  }

  function sendTyped(e?: React.FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    const nextId = resolveUserMessage(text);
    applyNode(nextId, text);
  }

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
          intent: path[path.length - 1] || "chat",
          source: "chat",
          metadata: { sessionId: sid, path },
        }),
      });
      setLeadDone(true);
      const nextMessages: Msg[] = [
        ...messages,
        {
          role: "bot",
          text: "Thanks — a partner will follow up within one business day.",
        },
      ];
      setMessages(nextMessages);
      void logSession(path, nextMessages, "lead_captured");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {!open ? (
        <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3 sm:bottom-5 sm:right-5">
          <AnimatePresence>
            {showBubble ? (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8 }}
                className="relative mb-1 max-w-[min(72vw,230px)] cursor-pointer rounded-2xl border border-border bg-white px-3 py-2.5 shadow-xl shadow-navy/10 sm:max-w-[230px] sm:px-4 sm:py-3"
                onClick={openChat}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openChat();
                }}
              >
                <button
                  type="button"
                  onClick={dismissBubble}
                  className="absolute right-2 top-2 rounded-full p-0.5 text-muted hover:bg-surface"
                  aria-label="Dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="pr-4 text-sm font-bold text-navy">Alex · online 24/7</p>
                <p className="mt-0.5 text-xs text-muted">
                  Type a question or book a quick call.
                </p>
                <span className="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 border-b border-r border-border bg-white" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={openChat}
            className="relative transition hover:scale-[1.03]"
            aria-label="Chat with Alex — online 24/7"
          >
            <AlexAvatar size={58} />
            <span className="absolute -left-1 -top-1 rounded-full bg-navy px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300 shadow-md ring-1 ring-emerald-400/50">
              24/7
            </span>
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[min(78dvh,600px)] w-full max-w-[100vw] flex-col border border-border bg-white shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[560px] sm:w-[390px] sm:max-w-none sm:rounded-2xl"
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-white sm:rounded-t-2xl">
              <div className="flex min-w-0 items-center gap-3">
                <AlexAvatar size={40} ring={false} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Alex</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/70">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="online-ping absolute inset-0 rounded-full bg-emerald-400" />
                      <span className="online-glow relative block h-full w-full rounded-full bg-emerald-400" />
                    </span>
                    Online 24/7 · type anytime
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden bg-surface px-3 py-4 sm:px-4">
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={cn(
                    "max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "bot"
                      ? "bg-white text-navy shadow-sm ring-1 ring-border"
                      : "ml-auto bg-navy text-white",
                  )}
                >
                  {m.text}
                </div>
              ))}

              {typing ? (
                <div className="inline-flex gap-1 rounded-2xl bg-white px-3.5 py-3 ring-1 ring-border">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:240ms]" />
                </div>
              ) : null}

              {node.link && !typing ? (
                <Link
                  href={node.link.href}
                  className="inline-flex rounded-lg border border-accent bg-accent-soft px-3 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white"
                  onClick={closeChat}
                >
                  {node.link.label} →
                </Link>
              ) : null}

              {node.collectLead && !leadDone && !typing ? (
                <form
                  onSubmit={submitLead}
                  className="min-w-0 space-y-2 rounded-xl border border-border bg-white p-3 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Get a quick call
                  </p>
                  <input
                    name="name"
                    required
                    placeholder="Name"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Work email"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    className="min-w-0 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  />
                  <Button type="submit" size="sm" className="w-full" disabled={submitting}>
                    {submitting ? "Sending…" : "Request callback"}
                  </Button>
                </form>
              ) : null}

              <div ref={bottomRef} />
            </div>

            {node.choices?.length && !typing ? (
              <div className="flex flex-wrap gap-2 border-t border-border bg-white px-3 pt-2">
                {node.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => goTo(c.next, c.label)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-accent hover:bg-accent-soft hover:text-accent"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              onSubmit={sendTyped}
              className="flex items-center gap-2 border-t border-border bg-white p-3 sm:rounded-b-2xl"
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                disabled={typing}
                className="min-w-0 flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                aria-label="Type a message"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition hover:bg-navy-soft disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
