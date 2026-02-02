import { Router } from "express";
import type { AuthController } from "./auth.controller.js";

export function createAuthRoutes(controller: AuthController): Router {
  const router = Router();
  router.post("/register", (req, res) => controller.register(req, res));
  router.post("/login", (req, res) => controller.loginHandler(req, res));
  return router;
}
