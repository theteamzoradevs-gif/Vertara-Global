"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/CaseStudy";
import { seedTestimonials } from "@/data/seed-content";

export async function createTestimonialAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const quote = String(formData.get("quote") || "").trim();
    if (!quote) {
      return { success: false, error: "Quote is required." };
    }

    const name = String(formData.get("name") || "").trim();
    if (!name) {
      return { success: false, error: "Name is required." };
    }

    const role = String(formData.get("role") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const image = String(formData.get("image") || "").trim();

    await Testimonial.create({
      quote,
      name,
      role,
      company,
      image,
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/case-studies");
    revalidatePath("/");

    return { success: true, message: "Testimonial created successfully!" };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to create testimonial.";
    return { success: false, error: errorMessage };
  }
}

export async function updateTestimonialAction(formData: FormData) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const id = String(formData.get("id") || "").trim();
    if (!id) {
      return { success: false, error: "Testimonial ID is missing." };
    }

    const quote = String(formData.get("quote") || "").trim();
    if (!quote) {
      return { success: false, error: "Quote is required." };
    }

    const name = String(formData.get("name") || "").trim();
    if (!name) {
      return { success: false, error: "Name is required." };
    }

    const role = String(formData.get("role") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const image = String(formData.get("image") || "").trim();

    await Testimonial.findByIdAndUpdate(id, {
      quote,
      name,
      role,
      company,
      image,
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/case-studies");
    revalidatePath("/");

    return { success: true, message: "Testimonial updated successfully!" };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to update testimonial.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    await Testimonial.findByIdAndDelete(id);

    revalidatePath("/admin/testimonials");
    revalidatePath("/case-studies");
    revalidatePath("/");

    return { success: true, message: "Testimonial deleted successfully." };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to delete testimonial.";
    return { success: false, error: errorMessage };
  }
}

export async function seedTestimonialsAction() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    const count = await Testimonial.countDocuments();
    if (count > 0) {
      return {
        success: false,
        error: "Database already contains testimonials. Seed cancelled.",
      };
    }

    await Testimonial.insertMany(
      seedTestimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        image: "image" in t ? String(t.image || "") : "",
      }))
    );

    revalidatePath("/admin/testimonials");
    revalidatePath("/case-studies");
    revalidatePath("/");

    return {
      success: true,
      message: `${seedTestimonials.length} default testimonials imported to database!`,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to seed testimonials.";
    return { success: false, error: errorMessage };
  }
}
