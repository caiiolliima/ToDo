import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { tokenAtom } from "../atoms/auth.atom";
import { localTasksVersionAtom } from "../atoms/task.atom";
import {
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../api/tasks.client";
import { TASKS_KEY, type Task } from "../modules/task";

function getLocalTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export default function useTask() {
  const token = useAtomValue(tokenAtom);
  const [, setLocalVersion] = useAtom(localTasksVersionAtom);
  const queryClient = useQueryClient();
  const hasToken = !!token;

  const createMutation = useMutation({
    mutationFn: (payload: { title: string; state?: Task["state"] }) =>
      apiCreateTask(token, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { title?: string; concluded?: boolean; state?: Task["state"] };
    }) => apiUpdateTask(token, id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDeleteTask(token, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  function prepareTask() {
    if (hasToken) {
      createMutation.mutate({
        title: "",
        state: "Creating",
      });
    } else {
      const tasks = getLocalTasks();
      tasks.push({
        id: nanoid(),
        title: "",
        state: "Creating",
      });
      setLocalTasks(tasks);
      setLocalVersion((v) => v + 1);
    }
  }

  async function updateTask(id: string, payload: { title: Task["title"] }) {
    if (hasToken) {
      await updateMutation.mutateAsync({
        id,
        payload: { ...payload, state: "Created" },
      });
    } else {
      const tasks = getLocalTasks().map((t) =>
        t.id === id ? { ...t, state: "Created" as const, ...payload } : t
      );
      setLocalTasks(tasks);
      setLocalVersion((v) => v + 1);
    }
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    if (hasToken) {
      updateMutation.mutate({ id, payload: { concluded } });
    } else {
      const tasks = getLocalTasks().map((t) =>
        t.id === id ? { ...t, concluded } : t
      );
      setLocalTasks(tasks);
      setLocalVersion((v) => v + 1);
    }
  }

  async function deleteTask(id: string) {
    if (hasToken) {
      await deleteMutation.mutateAsync(id);
    } else {
      const tasks = getLocalTasks().filter((t) => t.id !== id);
      setLocalTasks(tasks);
      setLocalVersion((v) => v + 1);
    }
  }

  const isUpdatingTask = updateMutation.isPending;
  const isDeletingTask = deleteMutation.isPending;

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  };
}
