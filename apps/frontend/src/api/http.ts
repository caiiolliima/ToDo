const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:3001";
const TASKS_API_URL = import.meta.env.VITE_TASKS_API_URL || "http://localhost:3002";

export function getAuthApiUrl(): string {
  return AUTH_API_URL;
}

export function getTasksApiUrl(): string {
  return TASKS_API_URL;
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<Response> {
  const { token, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");
  return fetch(url, { ...fetchOptions, headers });
}
