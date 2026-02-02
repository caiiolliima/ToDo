import type { UserRepository } from "../../domain/repositories/user.repository.interface.js";
import { User } from "../../domain/entities/user.entity.js";
import { Email } from "../../domain/value-objects/email.vo.js";
import bcrypt from "bcrypt";

export interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
}

export interface RegisterUserOutput {
  id: string;
  email: string;
  name: string;
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const email = Email.create(input.email);
    const existing = await this.userRepository.findByEmail(email.getValue());
    if (existing) {
      throw new Error("User already exists with this email");
    }
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = User.create({
      id: crypto.randomUUID(),
      email,
      passwordHash,
      name: input.name.trim(),
      createdAt: new Date(),
    });
    await this.userRepository.save(user);
    return {
      id: user.id,
      email: user.email.getValue(),
      name: user.name,
    };
  }
}
