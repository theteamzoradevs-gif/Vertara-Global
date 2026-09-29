"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { seedSettings, type HeroRotatingLine, type Metric } from "@/data/seed-content";

export type HeroPayload = {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBackgroundImage: string;
  heroRotatingEyebrow: string;
  heroRotatingLines: HeroRotatingLine[];
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroFormEyebrow: string;
  heroFormTitle: string;
  heroFormDescription: string;
  heroFormButton: string;
  heroFormSuccess: string;
  showQuickCallForm?: boolean;
  metrics: Metric[];
  libraryImages?: string[];
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, error: "Please sign in to save changes." };
  }
  return { ok: true as const };
}

function cleanLines(lines: HeroRotatingLine[]): HeroRotatingLine[] {
  return lines
    .map((line) => ({
      label: String(line.label || "").trim(),
      detail: String(line.detail || "").trim(),
    }))
    .filter((line) => line.label || line.detail)
    .slice(0, 7);
}

function cleanMetrics(metrics: Metric[]): Metric[] {
  if (!Array.isArray(metrics)) return [];
  return metrics
    .map((m) => ({
      label: String(m.label || "").trim(),
      value: Number.isFinite(Number(m.value)) ? Number(m.value) : 0,
      suffix: String(m.suffix || "").trim(),
      prefix: String(m.prefix || "").trim(),
    }))
    .filter((m) => m.label.length > 0)
    .slice(0, 4);
}

export async function saveHeroAction(payload: HeroPayload) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database is not connected." };
    }

    const rotatingLines = cleanLines(payload.heroRotatingLines);
    if (rotatingLines.length === 0) {
      return { success: false, error: "Add at least one rotating line." };
    }

    const heroMetrics = cleanMetrics(payload.metrics);

    await SiteSettings.findOneAndUpdate(
      {},
      {
        tagline: String(payload.tagline || "").trim() || seedSettings.tagline,
        heroHeadline:
          String(payload.heroHeadline || "").trim() || seedSettings.heroHeadline,
        heroSubheadline: String(payload.heroSubheadline || "").trim(),
        heroBackgroundImage:
          String(payload.heroBackgroundImage || "").trim() ||
          seedSettings.heroBackgroundImage,
        heroRotatingEyebrow:
          String(payload.heroRotatingEyebrow || "").trim() ||
          seedSettings.heroRotatingEyebrow,
        heroRotatingLines: rotatingLines,
        heroPrimaryCta:
          String(payload.heroPrimaryCta || "").trim() || seedSettings.heroPrimaryCta,
        heroSecondaryCta:
          String(payload.heroSecondaryCta || "").trim() ||
          seedSettings.heroSecondaryCta,
        heroFormEyebrow:
          String(payload.heroFormEyebrow || "").trim() ||
          seedSettings.heroFormEyebrow,
        heroFormTitle:
          String(payload.heroFormTitle || "").trim() || seedSettings.heroFormTitle,
        heroFormDescription: String(payload.heroFormDescription || "").trim(),
        heroFormButton:
          String(payload.heroFormButton || "").trim() || seedSettings.heroFormButton,
        heroFormSuccess:
          String(payload.heroFormSuccess || "").trim() ||
          seedSettings.heroFormSuccess,
        showQuickCallForm: typeof payload.showQuickCallForm === "boolean" ? payload.showQuickCallForm : true,
        metrics: heroMetrics,
        ...(Array.isArray(payload.libraryImages)
          ? {
              libraryImages: payload.libraryImages
                .map((s) => String(s).trim())
                .filter(Boolean),
            }
          : {}),
      },
      { upsert: true, new: true },
    );

    revalidatePath("/");
    revalidatePath("/admin/hero");
    revalidatePath("/admin/settings");

    return { success: true, message: "Hero section saved. Homepage will show the new copy." };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to save hero.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteLibraryImageAction(imageUrl: string) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return { success: false, error: gate.error };

    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database is not connected." };
    }

    const doc = await SiteSettings.findOne().lean();
    const currentList: string[] = Array.isArray(doc?.libraryImages)
      ? (doc.libraryImages as string[])
      : seedSettings.libraryImages;

    const updatedList = currentList.filter((img) => img !== imageUrl);

    await SiteSettings.findOneAndUpdate(
      {},
      { libraryImages: updatedList },
      { upsert: true, new: true }
    );

    revalidatePath("/admin/hero");
    return { success: true, libraryImages: updatedList };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete image.";
    return { success: false, error: errorMessage };
  }
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadHeroImageAction(formData: FormData) {
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
    const filename = `hero-${Date.now()}.${ext}`;
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
