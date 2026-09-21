export const CHAT_SESSION_PAGE_SIZE = 20;

export type ChatSessionListFilters = {
  page?: number;
  search?: string;
  datePreset?: "all" | "today" | "7d" | "30d";
};
