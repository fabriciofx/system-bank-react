export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  ativo: boolean;
  observacoes: string;
}

export const CLIENTE_INVALIDO: Cliente = {
  id: 0,
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  observacoes: '',
  ativo: true
};
