import type { Id } from './Id';

export interface Conta extends Id {
  cliente: number;
  numero: string;
  agencia: string;
  saldo: string;
}

export const CONTA_INVALIDA: Conta = {
  id: 0,
  cliente: 0,
  numero: '',
  agencia: '',
  saldo: ''
};
