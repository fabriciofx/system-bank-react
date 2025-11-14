import type { Cliente } from './Cliente';
import type { Id } from './Id';

export interface ContaCliente extends Id {
  cliente: Cliente;
  numero: string;
  agencia: string;
  saldo: string;
}
