"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { CaseStudy } from "@/models/CaseStudy";
import { seedCaseStudies } from "@/data/seed-content";

export async function createCaseStudyAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const title = String(formData.get("title") || "").trim();
    if (!title) {
      return { success: false, error: "Title is required." };
    }

    const client = String(formData.get("client") || "").trim();
    const industry = String(formData.get("industry") || "").trim();
    const challenge = String(formData.get("challenge") || "").trim();
    const approach = String(formData.get("approach") || "").trim();
    const result = String(formData.get("result") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const featured = formData.get("featured") === "true";

    // Dynamic metrics parsing
    const rawMetrics = String(formData.get("metrics") || "[]");
    let metrics: { label: string; value: string }[] = [];
    try {
      metrics = JSON.parse(rawMetrics);
    } catch {
      metrics = [];
    }

    await CaseStudy.create({
      title,
      client,
      industry,
      challenge,
      approach,
      result,
      metrics,
      image,
      featured,
    });

    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Case Study created successfully!" };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to create case study.";
    return { success: false, error: errorMessage };
  }
}

export async function updateCaseStudyAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const id = String(formData.get("id") || "").trim();
    if (!id) {
      return { success: false, error: "Case Study ID is missing." };
    }

    const title = String(formData.get("title") || "").trim();
    if (!title) {
      return { success: false, error: "Title is required." };
    }

    const client = String(formData.get("client") || "").trim();
    const industry = String(formData.get("industry") || "").trim();
    const challenge = String(formData.get("challenge") || "").trim();
    const approach = String(formData.get("approach") || "").trim();
    const result = String(formData.get("result") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const featured = formData.get("featured") === "true";

    // Dynamic metrics parsing
    const rawMetrics = String(formData.get("metrics") || "[]");
    let metrics: { label: string; value: string }[] = [];
    try {
      metrics = JSON.parse(rawMetrics);
    } catch {
      metrics = [];
    }

    await CaseStudy.findByIdAndUpdate(id, {
      title,
      client,
      industry,
      challenge,
      approach,
      result,
      metrics,
      image,
      featured,
    });

    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Case Study updated successfully!" };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to update case study.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteCaseStudyAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    await CaseStudy.findByIdAndDelete(id);

    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "Case Study deleted successfully." };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to delete case study.";
    return { success: false, error: errorMessage };
  }
}

export async function seedCaseStudiesAction() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const count = await CaseStudy.countDocuments();
    if (count > 0) {
      return {
        success: false,
        error: "Database already contains case studies. Seed cancelled.",
      };
    }

    await CaseStudy.insertMany(
      seedCaseStudies.map((cs) => ({
        title: cs.title,
        client: cs.client,
        industry: cs.industry,
        challenge: cs.challenge,
        approach: cs.approach,
        result: cs.result,
        metrics: cs.metrics || [],
        image: cs.image || "",
        featured: cs.featured ?? true,
      }))
    );

    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return {
      success: true,
      message: `${seedCaseStudies.length} default case studies imported to database!`,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to seed case studies.";
    return { success: false, error: errorMessage };
  }
}
