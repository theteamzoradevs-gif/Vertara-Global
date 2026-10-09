import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { WorkflowError } from "@/lib/assessment-workflow";

export async function adminJson() {
  const session = await auth();
  if (!session?.user) {
    return { session: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const conn = await connectDB();
  if (!conn) {
    return {
      session,
      error: NextResponse.json({ error: "Database is not connected." }, { status: 503 }),
    };
  }
  return { session, error: null };
}

export function workflowErrorResponse(err: unknown) {
  if (err instanceof WorkflowError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error("[assessments]", err);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}
