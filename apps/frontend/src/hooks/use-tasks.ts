import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../atoms/auth.atom";
import { localTasksVersionAtom } from "../atoms/task.atom";
import { fetchTasks } from "../api/tasks.client";
import { TASKS_KEY, type Task } from "../modules/task";

function getLocalTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useTasks() {
  const token = useAtomValue(tokenAtom);
  useAtomValue(localTasksVersionAtom);
  const hasToken = !!token;

  const {
    data: apiTasks = [],
    isLoading: isLoadingApi,
    isError: apiError,
  } = useQuery({
    queryKey: ["tasks", token],
    queryFn: () => fetchTasks(token),
    enabled: hasToken,
    retry: false,
  });

  const localTasks = getLocalTasks();
  const tasks = hasToken && !apiError ? apiTasks : localTasks;
  const isLoadingTasks = hasToken ? isLoadingApi : false;
  const createdTasksCount = tasks.filter((t) => t.state === "Created").length;
  const concludedTasksCount = tasks.filter((t) => t.concluded).length;

  return {
    tasks,
    createdTasksCount,
    concludedTasksCount,
    isLoadingTasks,
  };
}
