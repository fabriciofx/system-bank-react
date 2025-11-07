import { randomInt } from '../fixtures/Fixture';
import type { Conta } from '../models/Conta';

export const fakeCreateConta = async (conta: Conta): Promise<Conta> => ({
  id: randomInt(1, 100),
  cliente: conta.cliente,
  numero: conta.numero,
  agencia: conta.agencia,
  saldo: conta.saldo
});

export const fakeUpdateConta = async (
  id: number,
  conta: Conta
): Promise<Conta> => ({
  id: id,
  cliente: conta.cliente,
  numero: conta.numero,
  agencia: conta.agencia,
  saldo: conta.saldo
});

export const fakeContaById = async (id: number): Promise<Conta> => ({
  id: id,
  cliente: randomInt(1, 100),
  numero: String(randomInt(10000, 99999)),
  agencia: String(randomInt(1000, 9999)),
  saldo: String(randomInt(10, 10000))
});

export const fakeDeleteConta = async (_id: number): Promise<void> => {};
