"use client";

import { useState } from "react";
import { CreateQuestInput, QuestPriority, QuestStatus } from "@/types";

interface QuestFormProps {
  onAdd: (quest: CreateQuestInput) => Promise<void>;
}

export default function QuestForm({ onAdd }: QuestFormProps) {
  const [title, setTitle]           = useState("");
  const [description, setDesc]      = useState("");
  const [priority, setPriority]     = useState<QuestPriority>("medium");
  const [category, setCategory]     = useState("");
  const [status, setStatus]         = useState<QuestStatus>("todo");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onAdd({ title, description, priority, category, status });
      setTitle("");
      setDesc("");
      setPriority("medium");
      setCategory("");
      setStatus("todo");
    } catch {
      setError("Failed to add quest. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-4"
    >
      <h2 className="text-white font-semibold text-sm uppercase tracking-wider">
        + New Quest
      </h2>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Quest title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        rows={2}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
      />

      {/* Priority + Status + Category */}
      <div className="grid grid-cols-3 gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as QuestPriority)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as QuestStatus)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-lg px-2 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg text-sm transition-colors"
      >
        {loading ? "Adding..." : "Add Quest"}
      </button>
    </form>
  );
}
