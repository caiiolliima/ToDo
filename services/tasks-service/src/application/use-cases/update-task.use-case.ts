import type { TaskRepository } from "../../domain/repositories/task.repository.interface.js";
import { Task } from "../../domain/entities/task.entity.js";
import type { TaskState } from "../../domain/entities/task.entity.js";

export interface UpdateTaskInput {
  id: string;
  userId: string;
  title?: string;
  concluded?: boolean;
  state?: TaskState;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: UpdateTaskInput) {
    const task = await this.taskRepository.findById(input.id);
    if (!task || task.userId !== input.userId) {
      throw new Error("Task not found");
    }
    const updated = Task.create({
      id: task.id,
      title: input.title ?? task.title,
      concluded: input.concluded ?? task.concluded,
      state: input.state ?? task.state,
      userId: task.userId,
      createdAt: task.createdAt,
    });
    await this.taskRepository.save(updated);
    return updated.toJSON();
  }
}
