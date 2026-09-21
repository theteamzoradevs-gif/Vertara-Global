import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";

const Schema = z.object({
  sessionId: z.string().min(1),
  path: z.array(z.string()).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["bot", "user"]),
        text: z.string(),
      }),
    )
    .optional(),
  intent: z.string().optional(),
  status: z.enum(["opened", "in_progress", "completed"]).optional(),
});

type MemorySession = z.infer<typeof Schema> & {
  path: string[];
  messages: { role: "bot" | "user"; text: string }[];
};

const memorySessions: MemorySession[] = [];

function deriveStatus(
  messages: { role: string; text: string }[] | undefined,
  explicit?: "opened" | "in_progress" | "completed",
): "opened" | "in_progress" | "completed" {
  if (explicit) return explicit;
  const count = messages?.length || 0;
  const hasUser = (messages || []).some((m) => m.role === "user");
  if (!hasUser || count <= 1) return "opened";
  return "in_progress";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }

    const { sessionId, intent } = parsed.data;
    const status = deriveStatus(parsed.data.messages, parsed.data.status);

    const conn = await connectDB();
    if (!conn) {
      const idx = memorySessions.findIndex((s) => s.sessionId === sessionId);
      const next: MemorySession = {
        sessionId,
        path: parsed.data.path ?? memorySessions[idx]?.path ?? [],
        messages: parsed.data.messages ?? memorySessions[idx]?.messages ?? [],
        intent: intent ?? memorySessions[idx]?.intent,
        status,
      };
      if (idx >= 0) memorySessions[idx] = next;
      else memorySessions.push(next);
      return NextResponse.json({ ok: true, storage: "memory", status });
    }

    const existing = await ChatSession.findOne({ sessionId }).lean();
    const update: Record<string, unknown> = {
      sessionId,
      status,
    };

    if (parsed.data.path) update.path = parsed.data.path;
    if (parsed.data.messages) {
      update.messages = parsed.data.messages.map((m) => ({
        ...m,
        at: new Date(),
      }));
    }
    if (intent !== undefined) update.intent = intent;

    // Completing without a prior log: keep existing messages/path if omitted
    if (!parsed.data.messages && existing?.messages) {
      // leave messages untouched — only status (and optional intent/path) update
    }

    await ChatSession.findOneAndUpdate({ sessionId }, update, {
      upsert: true,
      new: true,
    });

    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ sessions: memorySessions });
  }
  const sessions = await ChatSession.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({
    sessions: JSON.parse(JSON.stringify(sessions)),
  });
}
