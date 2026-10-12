import { NextResponse } from "next/server";
import { z } from "zod";
import { adminJson, workflowErrorResponse } from "@/lib/admin-api";
import { approveAssessmentReport } from "@/lib/assessment-workflow";

const ApproveSchema = z.object({
  reportContent: z.string().max(20000).optional(),
  reportReference: z.string().max(500).optional(),
});

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const gate = await adminJson();
  if (gate.error) return gate.error;

  const parsed = ApproveSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "The report content or reference is invalid." }, { status: 400 });
  }

  try {
    const { id } = await context.params;
    const assessment = await approveAssessmentReport(id, parsed.data);
    return NextResponse.json({
      ok: true,
      id: String(assessment._id),
      status: assessment.status,
      approvedAt: assessment.approvedAt,
    });
  } catch (err) {
    return workflowErrorResponse(err);
  }
}
