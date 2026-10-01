"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ContactContent } from "@/models/ContactContent";
import type { ContactContentData } from "@/data/seed-contact";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, error: "Please sign in to save changes." };
  }
  return { ok: true as const };
}

export async function saveContactContentAction(payload: ContactContentData) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database is not connected." };
    }

    await ContactContent.findOneAndUpdate(
      {},
      {
        eyebrow: String(payload.eyebrow || "CONTACT US").trim(),
        headline: String(payload.headline || "Let’s talk about what yours should look like.").trim(),
        description: String(payload.description || "").trim(),
        formTitle: String(payload.formTitle || "Send us a message").trim(),
        formSubmitLabel: String(payload.formSubmitLabel || "Book a consultation").trim(),
        companyName: String(payload.companyName || "Vertara Global — GCC Enablement & Advisory").trim(),
        contactEmail: String(payload.contactEmail || "").trim(),
        contactPhone: String(payload.contactPhone || "").trim(),
        officeAddress: String(payload.officeAddress || "").trim(),
        calendlyUrl: String(payload.calendlyUrl || "").trim(),
      },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/contact");
    revalidatePath("/contact");

    return { success: true, message: "Contact Us page content saved successfully." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save Contact Us content.";
    return { success: false, error: msg };
  }
}
