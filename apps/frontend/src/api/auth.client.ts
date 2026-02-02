import { getAuthApiUrl } from "./http";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name: string };
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const res = await fetch(`${getAuthApiUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const res = await fetch(`${getAuthApiUrl()}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
