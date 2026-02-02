import type { TaskRepository } from "../../domain/repositories/task.repository.interface.js";
import { Task } from "../../domain/entities/task.entity.js";
import { PrismaClient } from "@prisma/client/extension";

export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    const row = await this.prisma.task.findUnique({ where: { id } });
    if (!row) return null;
    return Task.create({
      id: row.id,
      title: row.title,
      concluded: row.concluded,
      state: row.state as "Creating" | "Created",
      userId: row.userId,
      createdAt: row.createdAt,
    });
  }

  async findByUserId(userId: string) {
    const rows = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((row: Task) =>
      Task.create({
        id: row.id,
        title: row.title,
        concluded: row.concluded,
        state: row.state as "Creating" | "Created",
        userId: row.userId,
        createdAt: row.createdAt,
      })
    );
  }

  async save(task: Task) {
    await this.prisma.task.upsert({
      where: { id: task.id },
      create: {
        id: task.id,
        title: task.title,
        concluded: task.concluded,
        state: task.state,
        userId: task.userId,
        createdAt: task.createdAt,
      },
      update: {
        title: task.title,
        concluded: task.concluded,
        state: task.state,
      },
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.prisma.task.deleteMany({
      where: { id, userId },
    });
    return result.count > 0;
  }
}
