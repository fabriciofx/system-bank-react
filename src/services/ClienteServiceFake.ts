import type { Cliente } from '../models/Cliente';

export const createClienteFake = async (
  cliente: Cliente
): Promise<Cliente> => ({
  id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  nome: cliente.nome,
  cpf: cliente.cpf,
  email: cliente.email,
  senha: cliente.senha,
  observacoes: cliente.observacoes,
  ativo: cliente.ativo
});

export const updateClienteFake = async (
  id: number,
  cliente: Cliente
): Promise<Cliente> => ({
  id: id,
  nome: cliente.nome,
  cpf: cliente.cpf,
  email: cliente.email,
  senha: cliente.senha,
  observacoes: cliente.observacoes,
  ativo: cliente.ativo
});

export const clienteByIdFake = async (id: number): Promise<Cliente[]> => [
  {
    id: id,
    nome: 'Fabrício Cabral',
    cpf: '12345678900',
    email: 'fabricio@email.com',
    senha: '',
    observacoes: 'Cliente de teste',
    ativo: true
  }
];
