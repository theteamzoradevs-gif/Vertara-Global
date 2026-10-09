import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getFaqs } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json(
      { error: "Database is not connected.", faqs: [] },
      { status: 503 },
    );
  }

  try {
    const faqs = await getFaqs();
    return NextResponse.json({ faqs });
  } catch (err) {
    console.error("[faqs]", err);
    return NextResponse.json(
      { error: "Could not load FAQs.", faqs: [] },
      { status: 500 },
    );
  }
}
