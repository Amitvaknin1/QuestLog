"use client";

import { Quest } from "@/types";

interface QuestCardProps {
  quest: Quest;
  onStatusChange: (id: string, status: Quest["status"]) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<Quest["status"], string> = {
  "todo":        "bg-gray-700 text-gray-300",
  "in-progress": "bg-blue-900/60 text-blue-300",
  "done":        "bg-green-900/60 text-green-300",
};

const statusLabels: Record<Quest["status"], string> = {
  "todo":        "To Do",
  "in-progress": "In Progress",
  "done":        "Done",
};

const priorityStyles: Record<Quest["priority"], string> = {
  low:    "text-gray-400",
  medium: "text-yellow-400",
  high:   "text-red-400",
};

const priorityDots: Record<Quest["priority"], string> = {
  low:    "bg-gray-400",
  medium: "bg-yellow-400",
  high:   "bg-red-400",
};

export default function QuestCard({ quest, onStatusChange, onDelete }: QuestCardProps) {
  const nextStatus: Record<Quest["status"], Quest["status"]> = {
    "todo":        "in-progress",
    "in-progress": "done",
    "done":        "todo",
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-600 transition-colors">
      {/* Top row: title + status badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold text-sm leading-snug flex-1">
          {quest.title}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${statusStyles[quest.status]}`}>
          {statusLabels[quest.status]}
        </span>
      </div>

      {/* Description */}
      {quest.description && (
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
          {quest.description}
        </p>
      )}

      {/* Bottom row: priority + category + actions */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1 text-xs font-medium ${priorityStyles[quest.priority]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priorityDots[quest.priority]}`} />
            {quest.priority}
          </span>
          <span className="text-gray-500 text-xs">{quest.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onStatusChange(quest._id, nextStatus[quest.status])}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {quest.status === "done" ? "↩ Reset" : "→ Advance"}
          </button>
          <button
            onClick={() => onDelete(quest._id)}
            className="text-gray-500 hover:text-red-400 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-red-900/30 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
