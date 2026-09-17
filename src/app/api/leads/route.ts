import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";

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
const memoryLeads: z.infer<typeof LeadSchema>[] = [];

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

    const conn = await connectDB();
    if (!conn) {
      memoryLeads.push({ ...parsed.data, email: parsed.data.email || undefined });
      return NextResponse.json({ ok: true, storage: "memory" });
    }

    const lead = await Lead.create(parsed.data);
    revalidatePath("/admin/leads");
    return NextResponse.json({ ok: true, id: lead._id });
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
