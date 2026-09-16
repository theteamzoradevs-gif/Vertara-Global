"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { AdminUser } from "@/models/AdminUser";
import { auth } from "@/lib/auth";

export async function saveSiteSettingsAction(formData: FormData) {
  try {
    const conn = await connectDB();

    const brandName = String(formData.get("brandName") || "Veratara Global").trim();
    const tagline = String(formData.get("tagline") || "").trim();
    const heroHeadline = String(formData.get("heroHeadline") || "").trim();
    const heroSubheadline = String(formData.get("heroSubheadline") || "").trim();
    const contactEmail = String(formData.get("contactEmail") || "hello@verataraglobal.com").trim();
    const contactPhone = String(formData.get("contactPhone") || "+91 80 4000 1200").trim();
    const trustPopHeadline = String(formData.get("trustPopHeadline") || "").trim();
    const aboutStory = String(formData.get("aboutStory") || "").trim();
    const aboutMission = String(formData.get("aboutMission") || "").trim();

    if (conn) {
      await SiteSettings.findOneAndUpdate(
        {},
        {
          brandName,
          tagline,
          heroHeadline,
          heroSubheadline,
          contactEmail,
          contactPhone,
          trustPopHeadline,
          aboutStory,
          aboutMission,
        },
        { upsert: true }
      );
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");

    return { success: true, message: "Site settings updated successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to save settings.";
    return { success: false, error: errorMessage };
  }
}

export async function updateAdminPasswordAction(formData: FormData) {
  try {
    const session = await auth();
    const currentPassword = String(formData.get("currentPassword") || "").trim();
    const newPassword = String(formData.get("newPassword") || "").trim();
    const confirmPassword = String(formData.get("confirmPassword") || "").trim();

    if (!currentPassword) {
      return { success: false, error: "Please enter your current password." };
    }

    if (!newPassword || !confirmPassword) {
      return { success: false, error: "Please fill in all password fields." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New password and confirm password do not match." };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const conn = await connectDB();
    const targetEmail = (session?.user?.email || "admin@verataraglobal.com").toLowerCase();

    if (conn) {
      const user = await AdminUser.findOne({ email: targetEmail });
      if (user) {
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
          return { success: false, error: "Current password is incorrect." };
        }
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await user.save();
      } else {
        const newHash = await bcrypt.hash(newPassword, 10);
        await AdminUser.create({
          email: targetEmail,
          passwordHash: newHash,
          name: session?.user?.name || "Admin User",
        });
      }
    }

    return { success: true, message: "Password updated successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update password.";
    return { success: false, error: errorMessage };
  }
}

export async function clearCacheAction() {
  try {
    revalidatePath("/", "layout");
    return { success: true, message: "Site cache revalidated successfully!" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to clear cache.";
    return { success: false, error: errorMessage };
  }
}
