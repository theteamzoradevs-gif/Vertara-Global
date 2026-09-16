"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";

export async function createFaqAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const question = String(formData.get("question") || "").trim();
    if (!question) {
      return { success: false, error: "Question is required." };
    }

    const answer = String(formData.get("answer") || "").trim();
    if (!answer) {
      return { success: false, error: "Answer is required." };
    }

    const category = String(formData.get("category") || "Basics").trim();
    const order = Number(formData.get("order") || 1);

    await Faq.create({
      question,
      answer,
      category,
      order,
    });

    revalidatePath("/faq");
    revalidatePath("/admin/faqs");
    revalidatePath("/");

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

    const question = String(formData.get("question") || "").trim();
    if (!question) {
      return { success: false, error: "Question is required." };
    }

    const answer = String(formData.get("answer") || "").trim();
    if (!answer) {
      return { success: false, error: "Answer is required." };
    }

    const category = String(formData.get("category") || "Basics").trim();
    const order = Number(formData.get("order") || 1);

    await Faq.findByIdAndUpdate(id, {
      question,
      answer,
      category,
      order,
    });

    revalidatePath("/faq");
    revalidatePath("/admin/faqs");
    revalidatePath("/");

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

    revalidatePath("/faq");
    revalidatePath("/admin/faqs");
    revalidatePath("/");

    return { success: true, message: "FAQ deleted successfully." };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete FAQ.";
    return { success: false, error: errorMessage };
  }
}
