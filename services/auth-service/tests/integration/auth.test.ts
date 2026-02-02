import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaUserRepository } from "../../src/infrastructure/database/user.repository.impl.js";
import { RegisterUserUseCase } from "../../src/application/use-cases/register-user.use-case.js";
import { LoginUseCase } from "../../src/application/use-cases/login.use-case.js";
import { AuthController } from "../../src/presentation/http/auth.controller.js";
import { createAuthRoutes } from "../../src/presentation/http/auth.routes.js";

const prisma = new PrismaClient();
const userRepo = new PrismaUserRepository(prisma);
const registerUser = new RegisterUserUseCase(userRepo);
const login = new LoginUseCase(userRepo);
const controller = new AuthController(registerUser, login);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", createAuthRoutes(controller));

describe("Auth API", () => {
  const testEmail = `test-${Date.now()}@example.com`;

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it("POST /auth/register creates user and returns token", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: testEmail, password: "123456", name: "Test User" });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.user.name).toBe("Test User");
  });

  it("POST /auth/login returns token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: testEmail, password: "123456" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("POST /auth/login fails with wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: testEmail, password: "wrong" });
    expect(res.status).toBe(401);
  });
});
