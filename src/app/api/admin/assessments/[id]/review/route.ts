import { NextResponse } from "next/server";
import { z } from "zod";
import { adminJson, workflowErrorResponse } from "@/lib/admin-api";
import { startExpertReview } from "@/lib/assessment-workflow";

const ReviewSchema = z.object({
  reviewer: z.string().trim().min(1).max(120),
});

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const gate = await adminJson();
  if (gate.error) return gate.error;

  const parsed = ReviewSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the practice expert who will review this assessment." }, { status: 400 });
  }

  try {
    const { id } = await context.params;
    const assessment = await startExpertReview(
      id,
      parsed.data.reviewer,
      gate.session?.user?.email,
    );
    return NextResponse.json({
      ok: true,
      id: String(assessment._id),
      status: assessment.status,
      reviewer: assessment.reviewer,
      reportDueAt: assessment.reportDueAt,
    });
  } catch (err) {
    return workflowErrorResponse(err);
  }
}
