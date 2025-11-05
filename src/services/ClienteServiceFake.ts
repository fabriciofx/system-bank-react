import type { PageResult } from '../core/PageResult';
import {
  randomCpf,
  randomEmail,
  randomInt,
  randomNome
} from '../fixtures/Fixture';
import type { Cliente } from '../models/Cliente';

export const createClienteFake = async (
  cliente: Cliente
): Promise<Cliente> => ({
  id: randomInt(1, 100),
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
    nome: randomNome(),
    cpf: randomCpf(),
    email: randomEmail(),
    senha: '',
    observacoes: 'Cliente de teste',
    ativo: true
  }
];

export const pagesClientesFake = async (
  num: number,
  size: number
): Promise<PageResult<Cliente>> => {
  const clientes = Array.from({ length: size }, (_, idx) => ({
    id: idx + 1,
    nome: randomNome(),
    cpf: randomCpf(),
    email: randomEmail(),
    senha: '',
    observacoes: 'Cliente de teste',
    ativo: true
  }));
  return {
    items: clientes,
    page: num,
    pageSize: size,
    total: num * size
  };
};
