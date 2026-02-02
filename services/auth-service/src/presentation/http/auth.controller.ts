import type { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case.js";
import { LoginUseCase } from "../../application/use-cases/login.use-case.js";
import { signToken } from "../../infrastructure/http/jwt.js";

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly login: LoginUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const output = await this.registerUser.execute({ email, password, name });
      const token = signToken({ userId: output.id });
      res.status(201).json({ token, user: output });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      res.status(400).json({ error: msg });
    }
  }

  async loginHandler(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const output = await this.login.execute({ email, password });
      const token = signToken({ userId: output.user.id });
      res.json({ token, user: output.user });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      res.status(401).json({ error: msg });
    }
  }
}
