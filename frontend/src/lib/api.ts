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

export const api = {
  auth: {
    register: (body: { username: string; email: string; password: string }) =>
      request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body: { email: string; password: string }) =>
      request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
    logout: () =>
      request("/api/auth/logout", { method: "POST" }),
    me: () =>
      request<{ data: { id: string; username: string; email: string } }>("/api/auth/me"),
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
};
