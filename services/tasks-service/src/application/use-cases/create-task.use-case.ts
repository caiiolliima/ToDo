import { nanoid } from "nanoid";
import type { TaskRepository } from "../../domain/repositories/task.repository.interface.js";
import { Task } from "../../domain/entities/task.entity.js";

export interface CreateTaskInput {
  title: string;
  state?: "Creating" | "Created";
  userId: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: CreateTaskInput) {
    const task = Task.create({
      id: nanoid(),
      title: input.title,
      concluded: false,
      state: input.state ?? "Created",
      userId: input.userId,
      createdAt: new Date(),
    });
    await this.taskRepository.save(task);
    return task.toJSON();
  }
}
