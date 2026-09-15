import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ leads: [], note: "MongoDB unavailable" });
  }
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads: JSON.parse(JSON.stringify(leads)) });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
  const lead = await Lead.findByIdAndUpdate(
    body.id,
    { status: body.status },
    { new: true },
  );
  return NextResponse.json({ lead });
}
