"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { AboutContent } from "@/models/AboutContent";
import type { AboutContentData } from "@/data/seed-about";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, error: "Please sign in to save changes." };
  }
  return { ok: true as const };
}

export async function saveAboutContentAction(payload: AboutContentData) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database is not connected." };
    }

    // Sanitize whatWeStandFor (Title required, description optional)
    const sanitizedWhatWeStandFor = Array.isArray(payload.whatWeStandFor)
      ? payload.whatWeStandFor
          .map((item) => ({
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          }))
          .filter((item) => item.title)
      : [];

    // Sanitize byTheNumbers
    const sanitizedByTheNumbers = Array.isArray(payload.byTheNumbers)
      ? payload.byTheNumbers
          .map((item) => ({
            number: String(item.number || "").trim(),
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          }))
          .filter((item) => item.title)
      : [];

    // Sanitize theTeam (Only name, role, bio)
    const sanitizedTheTeam = Array.isArray(payload.theTeam)
      ? payload.theTeam
          .map((member) => ({
            name: String(member.name || "").trim(),
            role: String(member.role || "").trim(),
            bio: String(member.bio || "").trim(),
          }))
          .filter((m) => m.name && m.role)
      : [];

    await AboutContent.findOneAndUpdate(
      {},
      {
        aboutUs: {
          title: String(payload.aboutUs?.title || "About Us").trim(),
          content: String(payload.aboutUs?.content || "").trim(),
        },
        ourStory: {
          title: String(payload.ourStory?.title || "Our Story").trim(),
          content: String(payload.ourStory?.content || "").trim(),
        },
        ourVision: {
          title: String(payload.ourVision?.title || "Our Vision").trim(),
          statement: String(payload.ourVision?.statement || "").trim(),
        },
        theName: {
          title: String(payload.theName?.title || "The Name").trim(),
          meaning: String(payload.theName?.meaning || "").trim(),
          description: String(payload.theName?.description || "").trim(),
        },
        whatWeStandFor: sanitizedWhatWeStandFor,
        byTheNumbers: sanitizedByTheNumbers,
        theTeam: sanitizedTheTeam,
        closingCta: {
          title: String(
            payload.closingCta?.title || "Let’s build the right GCC — and build it to last."
          ).trim(),
          description: String(payload.closingCta?.description || "").trim(),
          buttonText: String(payload.closingCta?.buttonText || "Discuss your GCC mandate").trim(),
          buttonLink: String(payload.closingCta?.buttonLink || "/contact").trim(),
        },
      },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/about");
    revalidatePath("/about");

    return { success: true, message: "About Us content saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save About Us content.";
    return { success: false, error: msg };
  }
}
