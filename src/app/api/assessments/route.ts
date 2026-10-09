import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { GccAssessment } from "@/models/GccAssessment";
import { normalizeAssessmentAnswers } from "@/lib/gcc-assessment";
import { notifyFounderOfAssessment } from "@/lib/founder-notification";
import { reportDueAt } from "@/lib/business-days";

const SubmitSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  submissionKey: z.string().min(8).max(120).optional(),
  answers: z.array(z.object({
    question: z.string(),
    answer: z.union([z.string(), z.array(z.string())]),
  })),
});

async function notifySaved(doc: {
  _id: { toString(): string };
  name?: string;
  company?: string;
  email?: string;
  createdAt?: Date;
  answers?: { question: string; answer: string | string[] }[];
  notificationStatus?: string;
}) {
  if (doc.notificationStatus === "sent") return;
  try {
    await notifyFounderOfAssessment(doc);
  } catch (err) {
    console.error("[assessments] founder email failed after save:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid assessment payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    let answers;
    try {
      answers = normalizeAssessmentAnswers(parsed.data.answers);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid answers.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database is not connected." }, { status: 503 });
    }

    const submissionKey = parsed.data.submissionKey?.trim();
    if (submissionKey) {
      const existing = await GccAssessment.findOne({ submissionKey });
      if (existing) {
        await notifySaved(existing);
        return NextResponse.json({
          ok: true,
          id: String(existing._id),
          duplicate: true,
        });
      }
    }

    let assessment;
    try {
      assessment = await GccAssessment.create({
        name: parsed.data.name.trim(),
        company: parsed.data.company.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        submissionKey: submissionKey || undefined,
        answers,
        status: "new",
        notificationStatus: "pending",
        reportDueAt: reportDueAt(new Date()),
      });
    } catch (err) {
      const code = (err as { code?: number }).code;
      if (code === 11000 && submissionKey) {
        const existing = await GccAssessment.findOne({ submissionKey });
        if (existing) {
          await notifySaved(existing);
          return NextResponse.json({
            ok: true,
            id: String(existing._id),
            duplicate: true,
          });
        }
      }
      throw err;
    }

    await notifySaved(assessment);

    try {
      revalidatePath("/admin/gcc-assessment");
    } catch (revalErr) {
      console.warn("Revalidation warning:", revalErr);
    }

    return NextResponse.json({ ok: true, id: String(assessment._id) });
  } catch (err) {
    console.error("[assessments]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
