import type { Credentials } from '../models/Credentials';

export async function loginFake(_credentials: Credentials): Promise<boolean> {
  return true;
}

export async function logoutFake(): Promise<void> {}
