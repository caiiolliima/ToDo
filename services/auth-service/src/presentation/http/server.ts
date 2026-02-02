import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaUserRepository } from "../../infrastructure/database/user.repository.impl.js";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case.js";
import { LoginUseCase } from "../../application/use-cases/login.use-case.js";
import { AuthController } from "./auth.controller.js";
import { createAuthRoutes } from "./auth.routes.js";

const prisma = new PrismaClient();
const userRepo = new PrismaUserRepository(prisma);
const registerUser = new RegisterUserUseCase(userRepo);
const login = new LoginUseCase(userRepo);
const authController = new AuthController(registerUser, login);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", createAuthRoutes(authController));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
