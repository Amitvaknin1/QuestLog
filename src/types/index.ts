// ──────────────────────────────────────────────
// Shared TypeScript types used across the app
// ──────────────────────────────────────────────

export type QuestStatus = "todo" | "in-progress" | "done";
export type QuestPriority = "low" | "medium" | "high";

export interface Quest {
  _id: string;
  title: string;
  description: string;
  status: QuestStatus;
  priority: QuestPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Character {
  _id: string;
  name: string;
  level: number;
  className: string;
  server: string;
  mainStat: string;
  createdAt: string;
}

// Used when creating a new quest (no _id or timestamps yet)
export type CreateQuestInput = Pick<Quest, "title" | "description" | "status" | "priority" | "category">;

// Used when updating an existing quest (all fields optional)
export type UpdateQuestInput = Partial<CreateQuestInput>;

// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
