import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";

const Schema = z.object({
  sessionId: z.string().min(1),
  path: z.array(z.string()),
  messages: z.array(
    z.object({
      role: z.enum(["bot", "user"]),
      text: z.string(),
    }),
  ),
  intent: z.string().optional(),
});

const memorySessions: z.infer<typeof Schema>[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      const idx = memorySessions.findIndex(
        (s) => s.sessionId === parsed.data.sessionId,
      );
      if (idx >= 0) memorySessions[idx] = parsed.data;
      else memorySessions.push(parsed.data);
      return NextResponse.json({ ok: true, storage: "memory" });
    }

    await ChatSession.findOneAndUpdate(
      { sessionId: parsed.data.sessionId },
      {
        sessionId: parsed.data.sessionId,
        path: parsed.data.path,
        messages: parsed.data.messages.map((m) => ({
          ...m,
          at: new Date(),
        })),
        intent: parsed.data.intent,
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ ok: true });
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
