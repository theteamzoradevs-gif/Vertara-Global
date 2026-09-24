import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { ChatSession } from "@/models/ChatSession";

const LeadSchema = z
  .object({
    name: z.string().min(1),
    company: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    intent: z.string().optional(),
    message: z.string().optional(),
    source: z.string().min(1).default("contact"),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .refine((d) => Boolean(d.email?.trim()) || Boolean(d.phone?.trim()), {
    message: "Email or phone is required",
    path: ["email"],
  });

// In-memory fallback when MongoDB is down
const memoryLeads: (z.infer<typeof LeadSchema> & { id?: string })[] = [];

function normalizeSource(source: string) {
  if (source === "chat_assistant") return "chat";
  return source;
}

function isChatSource(source: string) {
  return source === "chat" || source === "chat_assistant";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const source = normalizeSource(parsed.data.source);
    const metadata = { ...(parsed.data.metadata || {}) };
    const sessionId =
      typeof metadata.sessionId === "string" && metadata.sessionId.trim()
        ? metadata.sessionId.trim()
        : "";

    const conn = await connectDB();
    if (!conn) {
      // Dedup chat leads in memory by sessionId
      if (sessionId && isChatSource(source)) {
        const existing = memoryLeads.find(
          (l) =>
            isChatSource(String(l.source)) &&
            (l.metadata as { sessionId?: string } | undefined)?.sessionId ===
              sessionId,
        );
        if (existing) {
          return NextResponse.json({
            ok: true,
            storage: "memory",
            id: existing.id,
            duplicate: true,
          });
        }
      }
      const id = `mem-${Date.now()}`;
      memoryLeads.push({
        ...parsed.data,
        source,
        metadata,
        email: parsed.data.email || undefined,
        id,
      });
      return NextResponse.json({ ok: true, storage: "memory", id });
    }

    // Chat: reuse existing Lead linked to this chat session (no duplicate)
    if (sessionId && isChatSource(source)) {
      const session = await ChatSession.findOne({ sessionId }).lean();
      if (session?.leadId) {
        return NextResponse.json({
          ok: true,
          id: String(session.leadId),
          duplicate: true,
        });
      }
    }

    const lead = await Lead.create({
      ...parsed.data,
      source,
      metadata: Object.keys(metadata).length ? metadata : undefined,
      email: parsed.data.email || undefined,
    });

    if (sessionId && isChatSource(source)) {
      await ChatSession.findOneAndUpdate(
        { sessionId },
        { leadId: lead._id, intent: "lead_captured" },
        { upsert: true },
      );
    }

    try {
      revalidatePath("/admin/leads");
      revalidatePath("/admin/inquiries");
    } catch (revalErr) {
      console.warn("Revalidation warning:", revalErr);
    }
    return NextResponse.json({ ok: true, id: String(lead._id) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ leads: memoryLeads });
  }
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads: JSON.parse(JSON.stringify(leads)) });
}

export function getMemoryLeads() {
  return memoryLeads;
}
