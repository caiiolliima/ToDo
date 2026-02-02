import { atom } from "jotai";

export const tokenAtom = atom<string | null>(null);
export const userAtom = atom<{ id: string; email: string; name: string } | null>(
  null
);
