import { NextResponse } from "next/server";
import { adminJson, workflowErrorResponse } from "@/lib/admin-api";
import { deliverApprovedReport } from "@/lib/assessment-workflow";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const gate = await adminJson();
  if (gate.error) return gate.error;

  try {
    const { id } = await context.params;
    const result = await deliverApprovedReport(id);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, alreadySent: result.alreadySent });
  } catch (err) {
    return workflowErrorResponse(err);
  }
}
