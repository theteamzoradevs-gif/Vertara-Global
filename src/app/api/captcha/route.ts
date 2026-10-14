import { NextResponse } from "next/server";
import { createCaptchaChallenge } from "@/lib/captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const challenge = await createCaptchaChallenge();
    return NextResponse.json(challenge, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[api/captcha] Failed to generate challenge:", error);
    return NextResponse.json(
      { error: "Failed to generate CAPTCHA challenge" },
      { status: 500 }
    );
  }
}
