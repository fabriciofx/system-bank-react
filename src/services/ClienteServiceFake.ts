import type { PageResult } from '../core/PageResult';
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
    nome: 'José da Silva',
    cpf: '12345678900',
    email: 'jose@email.com',
    senha: '',
    observacoes: 'Cliente de teste',
    ativo: true
  }
];

export const pagesClientesFake = async (
  num: number,
  size: number
): Promise<PageResult<Cliente>> => ({
  items: [
    {
      id: 1,
      nome: 'José da Silva',
      cpf: '12345678900',
      email: 'jose@email.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    },
    {
      id: 2,
      nome: 'Maria Madalena',
      cpf: '12345678912',
      email: 'maria@email.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    }
  ],
  page: num,
  pageSize: size,
  total: 2
});
