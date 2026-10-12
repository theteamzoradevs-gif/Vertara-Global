"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";
import { canonicalFaqCategory, isFaqCategory } from "@/lib/faq-categories";
import { canonicalFaqPage, isFaqPage } from "@/lib/faq-pages";

const FAQ_PATHS = ["/", "/faq", "/about", "/insights", "/engage-with-us", "/services", "/industries", "/engagement-models", "/case-studies", "/contact", "/assessment", "/offerings", "/admin/faqs", "/admin/hero", "/admin"];

function revalidateFaqPages() {
  for (const path of FAQ_PATHS) revalidatePath(path);
}

export async function createFaqAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const page = canonicalFaqPage(String(formData.get("page") || "Home")) || "";
    if (!isFaqPage(page)) {
      return { success: false, error: "Choose a page for this FAQ." };
    }

    const category = canonicalFaqCategory(String(formData.get("category") || "The basics")) || String(formData.get("category") || "The basics").trim();
    if (!isFaqCategory(category)) {
      return { success: false, error: "Choose a category for this FAQ." };
    }

    const categoryCount = await Faq.countDocuments({ page, category });
    if (categoryCount >= 10) {
      return {
        success: false,
        error: `Maximum limit reached. You can only create up to 10 FAQs in '${category}' on ${page}.`,
      };
    }

    const question = String(formData.get("question") || "").trim();
    if (!question) {
      return { success: false, error: "Question is required." };
    }

    const answer = String(formData.get("answer") || "").trim();
    if (!answer) {
      return { success: false, error: "Answer is required." };
    }

    const order = Number(formData.get("order") || 1);

    await Faq.create({
      question,
      answer,
      page,
      category,
      order,
      catalogVersion: 4,
    });

    revalidateFaqPages();

    return { success: true, message: "FAQ created successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create FAQ.";
    return { success: false, error: errorMessage };
  }
}

export async function updateFaqAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const id = String(formData.get("id") || "").trim();
    if (!id) {
      return { success: false, error: "FAQ ID is missing." };
    }

    const page = canonicalFaqPage(String(formData.get("page") || "Home")) || "";
    if (!isFaqPage(page)) {
      return { success: false, error: "Choose a page for this FAQ." };
    }

    const category = canonicalFaqCategory(String(formData.get("category") || "The basics")) || String(formData.get("category") || "The basics").trim();
    if (!isFaqCategory(category)) {
      return { success: false, error: "Choose a category for this FAQ." };
    }

    const existingFaq = await Faq.findById(id);
    if (existingFaq && (existingFaq.category !== category || existingFaq.page !== page)) {
      const targetCategoryCount = await Faq.countDocuments({ page, category, _id: { $ne: id } });
      if (targetCategoryCount >= 10) {
        return {
          success: false,
          error: `Maximum limit reached. '${category}' on ${page} already has 10 FAQs.`,
        };
      }
    }

    const question = String(formData.get("question") || "").trim();
    if (!question) {
      return { success: false, error: "Question is required." };
    }

    const answer = String(formData.get("answer") || "").trim();
    if (!answer) {
      return { success: false, error: "Answer is required." };
    }

    const order = Number(formData.get("order") || 1);

    await Faq.findByIdAndUpdate(id, {
      question,
      answer,
      page,
      category,
      order,
      catalogVersion: 4,
    });

    revalidateFaqPages();

    return { success: true, message: "FAQ updated successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update FAQ.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteFaqAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    await Faq.findByIdAndDelete(id);

    revalidateFaqPages();

    return { success: true, message: "FAQ deleted successfully." };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete FAQ.";
    return { success: false, error: errorMessage };
  }
}
