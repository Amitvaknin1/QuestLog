"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import StatsCard from "@/components/ui/StatsCard";
import QuestCard from "@/components/quest/QuestCard";
import QuestForm from "@/components/quest/QuestForm";
import { Quest, CreateQuestInput } from "@/types";
import { api } from "@/lib/api";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [quests, setQuests]   = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  const fetchQuests = useCallback(async () => {
    try {
      const res = await api.quests.getAll() as { data: Quest[] };
      setQuests(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchQuests();
  }, [user, fetchQuests]);

  async function handleAdd(input: CreateQuestInput) {
    const res = await api.quests.create(input as unknown as Record<string, string>) as { data: Quest };
    setQuests((prev) => [res.data, ...prev]);
  }

  async function handleStatusChange(id: string, status: Quest["status"]) {
    const res = await api.quests.update(id, { status }) as { data: Quest };
    setQuests((prev) => prev.map((q) => (q._id === id ? { ...q, ...res.data } : q)));
  }

  async function handleDelete(id: string) {
    await api.quests.delete(id);
    setQuests((prev) => prev.filter((q) => q._id !== id));
  }

  const stats = {
    total:      quests.length,
    inProgress: quests.filter((q) => q.status === "in-progress").length,
    completed:  quests.filter((q) => q.status === "done").length,
    highPrio:   quests.filter((q) => q.priority === "high").length,
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">
          Welcome to <span className="text-violet-400">QuestLog</span>
        </h2>
        <p className="text-gray-400 text-sm">
          Track your quests, manage priorities, and never lose progress again.
        </p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Total Quests"  value={stats.total}      color="violet" icon="📋" />
        <StatsCard label="In Progress"   value={stats.inProgress} color="blue"   icon="⚔️" />
        <StatsCard label="Completed"     value={stats.completed}  color="green"  icon="✅" />
        <StatsCard label="High Priority" value={stats.highPrio}   color="red"    icon="🔥" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h2 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">
            All Quests
          </h2>

          {loading && <p className="text-gray-500 text-sm text-center py-12">Loading quests...</p>}

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-sm">
              <strong>Error:</strong> {error}
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

        <aside>
          <QuestForm onAdd={handleAdd} />
        </aside>
      </div>
    </div>
  );
}
