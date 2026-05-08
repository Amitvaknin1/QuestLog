"use client";

import { useEffect, useState, useCallback } from "react";
import StatsCard from "@/components/ui/StatsCard";
import QuestCard from "@/components/quest/QuestCard";
import QuestForm from "@/components/quest/QuestForm";
import { Quest, CreateQuestInput } from "@/types";

export default function HomePage() {
  const [quests, setQuests]   = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // ── Fetch all quests ──────────────────────────────────────────
  const fetchQuests = useCallback(async () => {
    try {
      const res = await fetch("/api/quests");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to fetch");
      setQuests(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  // ── Add quest ─────────────────────────────────────────────────
  async function handleAdd(input: CreateQuestInput) {
    const res = await fetch("/api/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to create quest");
    setQuests((prev) => [json.data, ...prev]);
  }

  // ── Update status ─────────────────────────────────────────────
  async function handleStatusChange(id: string, status: Quest["status"]) {
    const res = await fetch(`/api/quests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok) return;
    setQuests((prev) =>
      prev.map((q) => (q._id === id ? { ...q, ...json.data } : q))
    );
  }

  // ── Delete quest ──────────────────────────────────────────────
  async function handleDelete(id: string) {
    const res = await fetch(`/api/quests/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setQuests((prev) => prev.filter((q) => q._id !== id));
  }

  // ── Computed stats ────────────────────────────────────────────
  const stats = {
    total:      quests.length,
    inProgress: quests.filter((q) => q.status === "in-progress").length,
    completed:  quests.filter((q) => q.status === "done").length,
    highPrio:   quests.filter((q) => q.priority === "high").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* ── Hero ── */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">
          Welcome to <span className="text-violet-400">QuestLog</span>
        </h2>
        <p className="text-gray-400 text-sm">
          Track your quests, manage priorities, and never lose progress again.
        </p>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Total Quests"  value={stats.total}      color="violet" icon="📋" />
        <StatsCard label="In Progress"   value={stats.inProgress} color="blue"   icon="⚔️" />
        <StatsCard label="Completed"     value={stats.completed}  color="green"  icon="✅" />
        <StatsCard label="High Priority" value={stats.highPrio}   color="red"    icon="🔥" />
      </section>

      {/* ── Main content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quest list — takes 2/3 of the width on large screens */}
        <section className="lg:col-span-2">
          <h2 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">
            All Quests
          </h2>

          {loading && (
            <p className="text-gray-500 text-sm text-center py-12">Loading quests...</p>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-sm">
              <strong>Error:</strong> {error}
              <p className="mt-1 text-red-400 text-xs">
                Make sure you have a valid <code className="bg-red-900/40 px-1 rounded">.env.local</code> with{" "}
                <code className="bg-red-900/40 px-1 rounded">MONGODB_URI</code> set.
              </p>
            </div>
          )}

          {!loading && !error && quests.length === 0 && (
            <div className="text-center py-16 border border-dashed border-gray-700 rounded-xl">
              <p className="text-gray-500 text-sm">No quests yet.</p>
              <p className="text-gray-600 text-xs mt-1">Add your first quest using the form →</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {quests.map((quest) => (
              <QuestCard
                key={quest._id}
                quest={quest}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>

        {/* Sidebar: Add quest form */}
        <aside>
          <QuestForm onAdd={handleAdd} />
        </aside>
      </div>
    </div>
  );
}
