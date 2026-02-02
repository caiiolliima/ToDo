export const TASKS_KEY = "tasks";

export type TaskState = "Creating" | "Created";

export interface Task {
  id: string;
  title: string;
  concluded?: boolean;
  state?: TaskState;
}
