import type { Request, Response } from "express";
import type { CreateTaskUseCase } from "../../application/use-cases/create-task.use-case.js";
import type { ListTasksUseCase } from "../../application/use-cases/list-tasks.use-case.js";
import type { UpdateTaskUseCase } from "../../application/use-cases/update-task.use-case.js";
import type { DeleteTaskUseCase } from "../../application/use-cases/delete-task.use-case.js";

export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly listTasks: ListTasksUseCase,
    private readonly updateTask: UpdateTaskUseCase,
    private readonly deleteTask: DeleteTaskUseCase
  ) {}

  async list(req: Request & { userId?: string }, res: Response) {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tasks = await this.listTasks.execute(userId);
    res.json(tasks);
  }

  async create(req: Request & { userId?: string }, res: Response) {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { title, state } = req.body || {};
    const task = await this.createTask.execute({
      title: title ?? "",
      state,
      userId,
    });
    res.status(201).json(task);
  }

  async update(req: Request & { userId?: string }, res: Response) {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { id } = req.params;
    const { title, concluded, state } = req.body || {};
    try {
      const task = await this.updateTask.execute({
        id: id as string,
        userId,
        ...(title !== undefined && { title }),
        ...(concluded !== undefined && { concluded }),
        ...(state !== undefined && { state }),
      });
      res.json(task);
    } catch {
      res.status(404).json({ error: "Task not found" });
    }
  }

  async delete(req: Request & { userId?: string }, res: Response) {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { id } = req.params;
    const deleted = await this.deleteTask.execute(id as string, userId as string);
    if (!deleted) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(204).send();
  }
}
