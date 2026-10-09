import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { GccAssessment } from "@/models/GccAssessment";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ assessments: [], note: "MongoDB unavailable" });
  }

  const assessments = await GccAssessment.find()
    .sort({ createdAt: -1 })
    .select("name company email status notificationStatus createdAt")
    .lean();

  return NextResponse.json({
    assessments: JSON.parse(JSON.stringify(assessments)),
  });
}
