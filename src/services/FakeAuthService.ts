import type { Credentials } from '../models/Credentials';

export async function fakeLogin(_credentials: Credentials): Promise<boolean> {
  return true;
}

export async function fakeLogout(): Promise<void> {}
