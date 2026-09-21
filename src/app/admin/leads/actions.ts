"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    if (!id) {
      return { success: false, error: "Lead ID is required." };
    }

    const validStatuses = ["new", "contacted", "archived"];
    if (!validStatuses.includes(status)) {
      return { success: false, error: "Invalid lead status." };
    }

    await Lead.findByIdAndUpdate(id, { status });

    revalidatePath("/admin/leads");
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return { success: true, message: `Lead status updated to ${status}.` };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to update lead status.";
    return { success: false, error: errorMessage };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }

    if (!id) {
      return { success: false, error: "Lead ID is required." };
    }

    await Lead.findByIdAndDelete(id);

    revalidatePath("/admin/leads");
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return { success: true, message: "Lead deleted successfully." };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to delete lead.";
    return { success: false, error: errorMessage };
  }
}
