import type { TaskRepository } from "../../domain/repositories/task.repository.interface.js";

export class ListTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(userId: string) {
    const tasks = await this.taskRepository.findByUserId(userId);
    return tasks.map((t) => t.toJSON());
  }
}
