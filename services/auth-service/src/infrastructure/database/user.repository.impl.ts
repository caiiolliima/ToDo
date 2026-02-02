import { PrismaClient } from "@prisma/client/extension";
import type { UserRepository } from "../../domain/repositories/user.repository.interface.js";
import { User } from "../../domain/entities/user.entity.js";
import { Email } from "../../domain/value-objects/email.vo.js";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    if (!row) return null;
    return User.create({
      id: row.id,
      email: Email.create(row.email),
      passwordHash: row.passwordHash,
      name: row.name,
      createdAt: row.createdAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    if (!row) return null;
    return User.create({
      id: row.id,
      email: Email.create(row.email),
      passwordHash: row.passwordHash,
      name: row.name,
      createdAt: row.createdAt,
    });
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email.getValue(),
        passwordHash: user.passwordHash,
        name: user.name,
        createdAt: user.createdAt,
      },
      update: {
        email: user.email.getValue(),
        passwordHash: user.passwordHash,
        name: user.name,
      },
    });
  }
}
