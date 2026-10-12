import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { GccAssessment } from "@/models/GccAssessment";
import { reportDueAt } from "@/lib/business-days";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ error: "Database is not connected." }, { status: 503 });
  }

  const assessment = await GccAssessment.findById(id).lean();
  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
  }

  const payload = JSON.parse(JSON.stringify(assessment)) as {
    reportDueAt?: string;
    createdAt?: string;
  };
  if (!payload.reportDueAt && payload.createdAt) {
    payload.reportDueAt = reportDueAt(new Date(payload.createdAt)).toISOString();
  }

  return NextResponse.json({ assessment: payload });
}
