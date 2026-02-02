import type { Task } from "../entities/task.entity.js";

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(id: string, userId: string): Promise<boolean>;
}
