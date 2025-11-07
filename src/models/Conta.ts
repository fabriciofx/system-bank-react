export interface Conta {
  id: number;
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
