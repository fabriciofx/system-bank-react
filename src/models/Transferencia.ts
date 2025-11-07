export interface Transferencia {
  conta_origem: number;
  conta_destino: number;
  valor: number;
}

export const TRANSFERENCIA_INVALIDA: Transferencia = {
  conta_origem: 0,
  conta_destino: 0,
  valor: 0
};
