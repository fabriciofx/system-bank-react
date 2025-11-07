export interface Saque {
  conta: number;
  valor: number;
}

export const SAQUE_INVALIDO: Saque = {
  conta: 0,
  valor: 0
};
