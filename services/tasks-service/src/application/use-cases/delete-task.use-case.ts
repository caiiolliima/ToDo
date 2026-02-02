import type { TaskRepository } from "../../domain/repositories/task.repository.interface.js";

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, userId: string): Promise<boolean> {
    return this.taskRepository.delete(id, userId);
  }
}
