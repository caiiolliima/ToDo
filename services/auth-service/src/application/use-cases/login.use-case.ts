import type { UserRepository } from "../../domain/repositories/user.repository.interface.js";
import { Email } from "../../domain/value-objects/email.vo.js";
import bcrypt from "bcrypt";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  user: { id: string; email: string; name: string };
}

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const email = Email.create(input.email);
    const user = await this.userRepository.findByEmail(email.getValue());
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }
    return {
      user: {
        id: user.id,
        email: user.email.getValue(),
        name: user.name,
      },
    };
  }
}
