"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
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

    // Sanitize whatWeStandFor
    const sanitizedWhatWeStandFor = Array.isArray(payload.whatWeStandFor)
      ? payload.whatWeStandFor
          .map((item) => ({
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
            icon: String(item.icon || "Layers").trim(),
          }))
          .filter((item) => item.title && item.description)
      : [];

    // Sanitize byTheNumbers
    const sanitizedByTheNumbers = Array.isArray(payload.byTheNumbers)
      ? payload.byTheNumbers
          .map((item) => ({
            number: String(item.number || "").trim(),
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          }))
          .filter((item) => item.title && item.description)
      : [];

    // Sanitize theTeam
    const sanitizedTheTeam = Array.isArray(payload.theTeam)
      ? payload.theTeam
          .map((member) => ({
            name: String(member.name || "").trim(),
            role: String(member.role || "").trim(),
            bio: String(member.bio || "").trim(),
            bullets: Array.isArray(member.bullets)
              ? member.bullets.map((b) => String(b).trim()).filter(Boolean)
              : [],
            image: String(member.image || "").trim(),
            initials: String(member.initials || "").trim(),
          }))
          .filter((m) => m.name && m.role)
      : [];

    await AboutContent.findOneAndUpdate(
      {},
      {
        intro: {
          eyebrow: String(payload.intro?.eyebrow || "").trim(),
          title: String(payload.intro?.title || "").trim(),
          description: String(payload.intro?.description || "").trim(),
          image: String(payload.intro?.image || "").trim(),
        },
        story: {
          eyebrow: String(payload.story?.eyebrow || "").trim(),
          title: String(payload.story?.title || "").trim(),
          content: String(payload.story?.content || "").trim(),
        },
        vision: {
          eyebrow: String(payload.vision?.eyebrow || "").trim(),
          title: String(payload.vision?.title || "").trim(),
          statement: String(payload.vision?.statement || "").trim(),
        },
        theName: {
          eyebrow: String(payload.theName?.eyebrow || "").trim(),
          title: String(payload.theName?.title || "").trim(),
          meaning: String(payload.theName?.meaning || "").trim(),
          description: String(payload.theName?.description || "").trim(),
        },
        whatWeStandFor: sanitizedWhatWeStandFor,
        byTheNumbers: sanitizedByTheNumbers,
        theTeam: sanitizedTheTeam,
        closingCta: {
          eyebrow: String(payload.closingCta?.eyebrow || "").trim(),
          title: String(payload.closingCta?.title || "").trim(),
          description: String(payload.closingCta?.description || "").trim(),
          buttonText: String(payload.closingCta?.buttonText || "").trim(),
          buttonLink: String(payload.closingCta?.buttonLink || "").trim(),
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

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadAboutImageAction(formData: FormData) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { success: false, error: "Choose an image file to upload." };
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return { success: false, error: "Use a JPG, PNG, WEBP, or GIF image." };
    }
    if (file.size > MAX_BYTES) {
      return { success: false, error: "Image must be 5MB or smaller." };
    }

    const ext =
      file.type === "image/jpeg"
        ? "jpg"
        : file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "gif";
    const filename = `about-${Date.now()}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to upload image.";
    return { success: false, error: errorMessage };
  }
}
