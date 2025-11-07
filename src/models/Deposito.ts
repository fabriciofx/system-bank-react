export interface Deposito {
  conta: number;
  valor: number;
}

export const DEPOSITO_INVALIDO: Deposito = {
  conta: 0,
  valor: 0
};
