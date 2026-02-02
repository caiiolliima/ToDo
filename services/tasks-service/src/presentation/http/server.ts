import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaTaskRepository } from "../../infrastructure/database/task.repository.impl.js";
import { CreateTaskUseCase } from "../../application/use-cases/create-task.use-case.js";
import { ListTasksUseCase } from "../../application/use-cases/list-tasks.use-case.js";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task.use-case.js";
import { DeleteTaskUseCase } from "../../application/use-cases/delete-task.use-case.js";
import { TaskController } from "./task.controller.js";
import { createTaskRoutes } from "./task.routes.js";

const prisma = new PrismaClient();
const taskRepo = new PrismaTaskRepository(prisma);
const createTask = new CreateTaskUseCase(taskRepo);
const listTasks = new ListTasksUseCase(taskRepo);
const updateTask = new UpdateTaskUseCase(taskRepo);
const deleteTask = new DeleteTaskUseCase(taskRepo);
const controller = new TaskController(createTask, listTasks, updateTask, deleteTask);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", createTaskRoutes(controller));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Tasks service running on port ${PORT}`);
});
