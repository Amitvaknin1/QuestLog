const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

type AuthUser = { id: string; username: string; email: string; role: "user" | "admin" };
type AdminUser = { _id: string; username: string; email: string; role: "user" | "admin"; createdAt: string };
type AdminQuest = {
  _id: string; title: string; status: string; priority: string; category: string; createdAt: string;
  userId: { _id: string; username: string; email: string };
};

export const api = {
  auth: {
    register: (body: { username: string; email: string; password: string }) =>
      request<{ data: AuthUser }>("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body: { email: string; password: string }) =>
      request<{ data: AuthUser }>("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
    logout: () =>
      request("/api/auth/logout", { method: "POST" }),
    me: () =>
      request<{ data: AuthUser }>("/api/auth/me"),
  },
  quests: {
    getAll: () =>
      request<{ data: unknown[] }>("/api/quests"),
    create: (body: Record<string, string>) =>
      request("/api/quests", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Record<string, string>) =>
      request(`/api/quests/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (id: string) =>
      request(`/api/quests/${id}`, { method: "DELETE" }),
  },
  admin: {
    getUsers: () =>
      request<{ data: AdminUser[] }>("/api/admin/users"),
    getQuests: () =>
      request<{ data: AdminQuest[] }>("/api/admin/quests"),
    updateRole: (id: string, role: "user" | "admin") =>
      request<{ data: AdminUser }>(`/api/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
    deleteUser: (id: string) =>
      request(`/api/admin/users/${id}`, { method: "DELETE" }),
  },
};
