import type { Cliente } from './Cliente';

export interface ContaCliente {
  id: number;
  cliente: Cliente;
  numero: string;
  agencia: string;
  saldo: string;
}
