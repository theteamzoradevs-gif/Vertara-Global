"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Insight } from "@/models/Insight";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function createInsightAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const title = String(formData.get("title") || "").trim();
    if (!title) {
      return { success: false, error: "Title is required." };
    }

    let slug = String(formData.get("slug") || "").trim();
    if (!slug) {
      slug = slugify(title);
    } else {
      slug = slugify(slug);
    }

    const excerpt = String(formData.get("excerpt") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const category = String(formData.get("category") || "GCC Strategy").trim();
    const coverImage = String(formData.get("coverImage") || "").trim();
    
    let readTime = String(formData.get("readTime") || "").trim();
    if (!readTime) {
      readTime = calculateReadTime(body || excerpt || title);
    }

    const isPublished = formData.get("published") === "true";
    const featured = formData.get("featured") === "true";

    // Ensure slug uniqueness
    const existing = await Insight.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    await Insight.create({
      title,
      slug,
      excerpt,
      body,
      category,
      coverImage,
      readTime,
      published: isPublished,
      featured,
      publishedAt: isPublished ? new Date() : null,
    });

    revalidatePath("/insights");
    revalidatePath(`/insights/${slug}`);
    revalidatePath("/admin/insights");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Insight created successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create insight.";
    return { success: false, error: errorMessage };
  }
}

export async function updateInsightAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const id = String(formData.get("id") || "").trim();
    if (!id) {
      return { success: false, error: "Insight ID is missing." };
    }

    const title = String(formData.get("title") || "").trim();
    if (!title) {
      return { success: false, error: "Title is required." };
    }

    let slug = String(formData.get("slug") || "").trim();
    if (!slug) {
      slug = slugify(title);
    } else {
      slug = slugify(slug);
    }

    const excerpt = String(formData.get("excerpt") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const category = String(formData.get("category") || "GCC Strategy").trim();
    const coverImage = String(formData.get("coverImage") || "").trim();
    
    let readTime = String(formData.get("readTime") || "").trim();
    if (!readTime) {
      readTime = calculateReadTime(body || excerpt || title);
    }

    const isPublished = formData.get("published") === "true";
    const featured = formData.get("featured") === "true";

    const updateData: Record<string, unknown> = {
      title,
      slug,
      excerpt,
      body,
      category,
      readTime,
      published: isPublished,
      featured,
    };

    if (coverImage) {
      updateData.coverImage = coverImage;
    }

    if (isPublished) {
      const current = await Insight.findById(id);
      if (!current?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    await Insight.findByIdAndUpdate(id, updateData);

    revalidatePath("/insights");
    revalidatePath(`/insights/${slug}`);
    revalidatePath("/admin/insights");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Insight updated successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update insight.";
    return { success: false, error: errorMessage };
  }
}

export async function toggleInsightStatusAction(id: string, currentPublished: boolean) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const newPublished = !currentPublished;
    await Insight.findByIdAndUpdate(id, {
      published: newPublished,
      ...(newPublished ? { publishedAt: new Date() } : {}),
    });

    revalidatePath("/insights");
    revalidatePath("/admin/insights");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return {
      success: true,
      message: `Status updated to ${newPublished ? "Published" : "Draft"}.`,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to toggle status.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteInsightAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    await Insight.findByIdAndDelete(id);

    revalidatePath("/insights");
    revalidatePath("/admin/insights");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Insight deleted successfully." };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete insight.";
    return { success: false, error: errorMessage };
  }
}
