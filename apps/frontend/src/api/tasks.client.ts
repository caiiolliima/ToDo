import { getTasksApiUrl, fetchWithAuth } from "./http";
import type { Task } from "../modules/task";

export async function fetchTasks(token: string | null): Promise<Task[]> {
  if (!token) return [];
  const res = await fetchWithAuth(`${getTasksApiUrl()}/tasks`, { token });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createTask(
  token: string | null,
  payload: { title: string; state?: Task["state"] }
): Promise<Task> {
  if (!token) throw new Error("Not authenticated");
  const res = await fetchWithAuth(`${getTasksApiUrl()}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateTask(
  token: string | null,
  id: string,
  payload: { title?: string; concluded?: boolean; state?: Task["state"] }
): Promise<Task> {
  if (!token) throw new Error("Not authenticated");
  const res = await fetchWithAuth(`${getTasksApiUrl()}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteTask(
  token: string | null,
  id: string
): Promise<void> {
  if (!token) throw new Error("Not authenticated");
  const res = await fetchWithAuth(`${getTasksApiUrl()}/tasks/${id}`, {
    method: "DELETE",
    token,
  });
  if (!res.ok) throw new Error(await res.text());
}
