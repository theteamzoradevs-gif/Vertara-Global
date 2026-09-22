import { NextResponse } from "next/server";
import { z } from "zod";
import { answerFromWebsiteKnowledge } from "@/lib/chat/knowledge";

const AskSchema = z.object({
  question: z.string().min(1).max(800),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    const result = await answerFromWebsiteKnowledge(parsed.data.question);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[chat/ask]", err);
    return NextResponse.json(
      {
        answer:
          "Something went wrong while looking that up. Please try again, or say “book a call” to leave your details.",
        intent: "error",
        found: false,
      },
      { status: 500 },
    );
  }
}
