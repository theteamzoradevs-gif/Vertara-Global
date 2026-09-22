import { connectDB } from "@/lib/db";
import { ChatSessionsManager } from "@/components/admin/ChatSessionsManager";
import { listChatSessionsAction } from "@/app/admin/chat-sessions/actions";
import { CHAT_SESSION_PAGE_SIZE } from "@/app/admin/chat-sessions/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Chat Sessions | Vertara Global Admin",
};

export default async function ChatSessionsPage() {
  const conn = await connectDB();
  const result = conn
    ? await listChatSessionsAction({ page: 1 })
    : {
        success: false,
        error: "Database connection unavailable.",
        sessions: [],
        total: 0,
        page: 1,
        pageSize: CHAT_SESSION_PAGE_SIZE,
      };

  return (
    <ChatSessionsManager
      initialSessions={result.sessions}
      initialTotal={result.total}
      isDbConnected={!!conn}
      loadError={result.success ? null : result.error}
    />
  );
}
