"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { AboutContent } from "@/models/AboutContent";
import type { AboutContentData } from "@/data/seed-about";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, error: "Please sign in to save changes." };
  }
  return { ok: true as const };
}

export async function uploadTeamPhotoAction(formData: FormData) {
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
    const filename = `team-${Date.now()}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to upload photo.";
    return { success: false, error: errorMessage };
  }
}

export async function saveAboutContentAction(payload: AboutContentData) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database is not connected." };
    }

    // Sanitize whatWeStandFor (Point text required)
    const sanitizedWhatWeStandFor = Array.isArray(payload.whatWeStandFor)
      ? payload.whatWeStandFor
          .map((item) => ({
            point: String(item?.point || "").trim(),
          }))
          .filter((item) => item.point)
      : [];

    // Sanitize byTheNumbers (Point text required)
    const sanitizedByTheNumbers = Array.isArray(payload.byTheNumbers)
      ? payload.byTheNumbers
          .map((item) => ({
            point: String(item?.point || "").trim(),
          }))
          .filter((item) => item.point)
      : [];

    // Sanitize theTeam (name and bio required, role and image optional)
    const sanitizedTheTeam = Array.isArray(payload.theTeam)
      ? payload.theTeam
          .map((member) => ({
            name: String(member?.name || "").trim(),
            role: String(member?.role || "").trim(),
            bio: String(member?.bio || "").trim(),
            image: String(member?.image || "").trim(),
          }))
          .filter((m) => m.name || m.bio)
      : [];

    await AboutContent.findOneAndUpdate(
      {},
      {
        aboutUs: {
          title: String(payload.aboutUs?.title || "About Us").trim(),
          description: String(payload.aboutUs?.description || "").trim(),
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
          paragraph: String(payload.theName?.paragraph || "").trim(),
        },
        whatWeStandFor: sanitizedWhatWeStandFor,
        byTheNumbers: sanitizedByTheNumbers,
        theTeam: sanitizedTheTeam,
        closingCta: {
          text: String(
            payload.closingCta?.text || "Let’s build the right GCC — and build it to last."
          ).trim(),
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
