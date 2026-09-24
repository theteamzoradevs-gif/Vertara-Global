"use server";

import { revalidatePath } from "next/cache";
import type { QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";
import { Lead } from "@/models/Lead";
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

    const query: QueryFilter<Record<string, unknown>> = {
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
        .populate("leadId", "name email phone")
        .sort({ updatedAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      ChatSession.countDocuments(query),
    ]);

    const sessions = JSON.parse(JSON.stringify(docs)).map(
      (doc: {
        sessionId: string;
        leadId?:
          | string
          | { _id?: string; name?: string; email?: string; phone?: string }
          | null;
      }) => {
        const populated =
          doc.leadId && typeof doc.leadId === "object" ? doc.leadId : null;
        return {
          ...doc,
          leadId: populated?._id || doc.leadId || null,
          lead: populated
            ? {
                name: populated.name || "",
                email: populated.email || "",
                phone: populated.phone || "",
              }
            : null,
        };
      },
    );

    // Fallback: chat leads linked by metadata.sessionId (no leadId on session)
    const missing = sessions.filter((s: { lead: unknown; sessionId: string }) => !s.lead);
    if (missing.length) {
      const orphanLeads = await Lead.find({
        "metadata.sessionId": { $in: missing.map((s: { sessionId: string }) => s.sessionId) },
        source: { $in: ["chat", "chat_assistant"] },
      })
        .select("name email phone metadata.sessionId")
        .lean();

      const bySession = new Map<
        string,
        { name: string; email: string; phone: string }
      >();
      for (const lead of orphanLeads) {
        const sid = (lead as { metadata?: { sessionId?: string } }).metadata
          ?.sessionId;
        if (!sid || bySession.has(sid)) continue;
        bySession.set(sid, {
          name: String((lead as { name?: string }).name || ""),
          email: String((lead as { email?: string }).email || ""),
          phone: String((lead as { phone?: string }).phone || ""),
        });
      }

      for (const session of sessions) {
        if (!session.lead) {
          session.lead = bySession.get(session.sessionId) || null;
        }
      }
    }

    return {
      success: true,
      sessions,
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
