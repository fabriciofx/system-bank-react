import type { Conta } from '../models/Conta';

export const createContaFake = async (_conta: Conta): Promise<Conta> => ({
  id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  cliente: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  numero: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1),
  agencia: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1),
  saldo: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1)
});

export const updateContaFake = async (
  id: number,
  conta: Conta
): Promise<Conta> => ({
  id: id,
  cliente: conta.cliente,
  numero: conta.numero,
  agencia: conta.agencia,
  saldo: conta.saldo
});

export const contaByIdFake = async (id: number): Promise<Conta> => ({
  id: id,
  cliente: 1,
  numero: '12345',
  agencia: '2222',
  saldo: '1000'
});
