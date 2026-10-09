import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { GccAssessment } from "@/models/GccAssessment";
import {
  notifyFounderOfAssessment,
  notifyFounderOfLead,
} from "@/lib/founder-notification";

const RetrySchema = z.object({
  kind: z.enum(["lead", "assessment"]),
  id: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = RetrySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid retry request." }, { status: 400 });
  }

  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ error: "Database is not connected." }, { status: 503 });
  }

  const { kind, id } = parsed.data;
  if (kind === "lead") {
    const lead = await Lead.findById(id);
    if (!lead) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    if (lead.notificationStatus === "sent") {
      return NextResponse.json({ ok: true, alreadySent: true });
    }
    const result = await notifyFounderOfLead(lead);
    return NextResponse.json({
      ok: result.ok,
      alreadySent: result.ok && "alreadySent" in result ? result.alreadySent : undefined,
      error: result.ok ? undefined : result.error,
    });
  }

  const assessment = await GccAssessment.findById(id);
  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
  }
  if (assessment.notificationStatus === "sent") {
    return NextResponse.json({ ok: true, alreadySent: true });
  }
    const result = await notifyFounderOfAssessment(assessment);
    return NextResponse.json({
      ok: result.ok,
      alreadySent: result.ok && "alreadySent" in result ? result.alreadySent : undefined,
      error: result.ok ? undefined : result.error,
    });
}
