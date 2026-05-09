"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow">
            Q
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight leading-none">QuestLog</h1>
            <p className="text-gray-400 text-xs mt-0.5">Quest Tracker Dashboard</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          {!loading && user && (
            <>
              <span className="text-gray-400 text-sm hidden sm:block">
                Hey, <span className="text-violet-400 font-medium">{user.username}</span>
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg px-3 py-1.5 transition"
              >
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
