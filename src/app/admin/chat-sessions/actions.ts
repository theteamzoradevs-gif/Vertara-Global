"use server";

import { revalidatePath } from "next/cache";
import type { FilterQuery } from "mongoose";
import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";
import {
  CHAT_SESSION_PAGE_SIZE,
  type ChatSessionListFilters,
} from "./constants";

function dateFilter(preset: ChatSessionListFilters["datePreset"]) {
  if (!preset || preset === "all") return {};
  const now = new Date();
  if (preset === "today") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    return { createdAt: { $gte: start } };
  }
  const days = preset === "7d" ? 7 : 30;
  return { createdAt: { $gte: new Date(now.getTime() - days * 24 * 60 * 60 * 1000) } };
}

export async function listChatSessionsAction(filters: ChatSessionListFilters = {}) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return {
        success: false,
        error: "Database connection unavailable.",
        sessions: [],
        total: 0,
        page: 1,
        pageSize: CHAT_SESSION_PAGE_SIZE,
      };
    }

    const page = Math.max(1, filters.page || 1);
    const pageSize = CHAT_SESSION_PAGE_SIZE;
    const search = (filters.search || "").trim();

    const query: FilterQuery<unknown> = {
      ...dateFilter(filters.datePreset),
    };

    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$and = [
        ...(query.$and || []),
        {
          $or: [
            { sessionId: rx },
            { intent: rx },
            { path: rx },
            { "messages.text": rx },
          ],
        },
      ];
    }

    const [docs, total] = await Promise.all([
      ChatSession.find(query)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      ChatSession.countDocuments(query),
    ]);

    return {
      success: true,
      sessions: JSON.parse(JSON.stringify(docs)),
      total,
      page,
      pageSize,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to load chat sessions.";
    return {
      success: false,
      error: errorMessage,
      sessions: [],
      total: 0,
      page: 1,
      pageSize: CHAT_SESSION_PAGE_SIZE,
    };
  }
}

export async function deleteChatSessionAction(id: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return { success: false, error: "Database connection unavailable." };
    }
    if (!id) {
      return { success: false, error: "Session ID is required." };
    }

    await ChatSession.findByIdAndDelete(id);
    revalidatePath("/admin/chat-sessions");
    revalidatePath("/admin");

    return { success: true, message: "Chat session deleted." };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to delete chat session.";
    return { success: false, error: errorMessage };
  }
}
