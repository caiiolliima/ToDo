import { Router } from "express";
import type { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../infrastructure/http/auth.middleware.js";

export function createTaskRoutes(controller: TaskController): Router {
  const router = Router();
  router.use(authMiddleware);
  router.get("/", (req, res) => controller.list(req, res));
  router.post("/", (req, res) => controller.create(req, res));
  router.put("/:id", (req, res) => controller.update(req, res));
  router.delete("/:id", (req, res) => controller.delete(req, res));
  return router;
}
