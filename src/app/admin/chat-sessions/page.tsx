import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";

export default async function ChatSessionsPage() {
  const conn = await connectDB();
  const sessions = conn
    ? JSON.parse(
        JSON.stringify(await ChatSession.find().sort({ updatedAt: -1 }).limit(50).lean()),
      )
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Chat sessions</h1>
      <p className="mt-1 text-sm text-muted">Guided assistant paths and transcripts.</p>
      <div className="mt-6 space-y-4">
        {sessions.length === 0 ? (
          <p className="text-sm text-muted">No sessions logged yet.</p>
        ) : (
          sessions.map((s: {
            _id: string;
            sessionId: string;
            intent?: string;
            path: string[];
            messages: { role: string; text: string }[];
            updatedAt: string;
          }) => (
            <article
              key={s._id}
              className="rounded-2xl border border-border bg-surface-elevated p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-navy">
                  {s.sessionId.slice(0, 8)}… · {s.intent || "—"}
                </p>
                <p className="text-xs text-muted">
                  {new Date(s.updatedAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted">Path: {s.path?.join(" → ")}</p>
              <div className="mt-3 max-h-40 space-y-1 overflow-y-auto text-sm">
                {s.messages?.map((m, i) => (
                  <p key={i} className="text-slate">
                    <span className="font-semibold text-navy">{m.role}:</span> {m.text}
                  </p>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
