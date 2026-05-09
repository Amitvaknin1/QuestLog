"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

type AdminUser  = { _id: string; username: string; email: string; role: "user" | "admin"; createdAt: string };
type AdminQuest = {
  _id: string; title: string; status: string; priority: string; category: string; createdAt: string;
  userId: { _id: string; username: string; email: string };
};

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [tab, setTab]       = useState<"users" | "quests">("users");
  const [users, setUsers]   = useState<AdminUser[]>([]);
  const [quests, setQuests] = useState<AdminQuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) router.push("/");
  }, [authLoading, user, router]);

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, questsRes] = await Promise.all([api.admin.getUsers(), api.admin.getQuests()]);
      setUsers(usersRes.data);
      setQuests(questsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") fetchData();
  }, [user, fetchData]);

  async function handleToggleRole(u: AdminUser) {
    const newRole = u.role === "admin" ? "user" : "admin";
    try {
      const res = await api.admin.updateRole(u._id, newRole);
      setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, role: res.data.role } : x)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  async function handleDeleteUser(u: AdminUser) {
    if (!confirm(`Delete user "${u.username}" and all their quests?`)) return;
    try {
      await api.admin.deleteUser(u._id);
      setUsers((prev) => prev.filter((x) => x._id !== u._id));
      setQuests((prev) => prev.filter((q) => q.userId?._id !== u._id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  }

  if (authLoading || !user || user.role !== "admin") return null;

  const statusColors: Record<string, string> = {
    "todo":        "bg-gray-700 text-gray-300",
    "in-progress": "bg-blue-900/60 text-blue-300",
    "done":        "bg-green-900/60 text-green-300",
  };
  const priorityColors: Record<string, string> = {
    low:    "bg-gray-700 text-gray-400",
    medium: "bg-yellow-900/60 text-yellow-300",
    high:   "bg-red-900/60 text-red-300",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">
          Admin <span className="text-amber-400">Panel</span>
        </h2>
        <p className="text-gray-400 text-sm">Manage users and view all quests across the platform.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "users"
              ? "bg-amber-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
          }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setTab("quests")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "quests"
              ? "bg-amber-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
          }`}
        >
          All Quests ({quests.length})
        </button>
      </div>

      {loading && <p className="text-gray-500 text-sm text-center py-12">Loading...</p>}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && tab === "users" && (
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">User</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-left px-5 py-3">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition">
                  <td className="px-5 py-3 text-white font-medium">{u.username}</td>
                  <td className="px-5 py-3 text-gray-400">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      u.role === "admin" ? "bg-amber-900/60 text-amber-300" : "bg-gray-700 text-gray-400"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    {u._id !== user.id && (
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleToggleRole(u)}
                          className="text-xs px-2 py-1 rounded border border-amber-700 text-amber-400 hover:bg-amber-900/30 transition"
                        >
                          {u.role === "admin" ? "Demote" : "Make Admin"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="text-xs px-2 py-1 rounded border border-red-800 text-red-400 hover:bg-red-900/30 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {u._id === user.id && (
                      <span className="text-xs text-gray-600 text-right block pr-1">You</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && tab === "quests" && (
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3">User</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Priority</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {quests.map((q) => (
                <tr key={q._id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition">
                  <td className="px-5 py-3 text-white font-medium max-w-[200px] truncate">{q.title}</td>
                  <td className="px-5 py-3 text-gray-400">{q.userId?.username ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColors[q.status] ?? "bg-gray-700 text-gray-400"}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${priorityColors[q.priority] ?? "bg-gray-700 text-gray-400"}`}>
                      {q.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{q.category}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
