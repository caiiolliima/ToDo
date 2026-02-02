export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      throw new Error("Invalid email format");
    }
    return new Email(trimmed);
  }

  getValue(): string {
    return this.value;
  }
}
