import type { PageResult } from '../core/PageResult';
import {
  randomCpf,
  randomEmail,
  randomInt,
  randomNome
} from '../fixtures/Fixture';
import type { Cliente } from '../models/Cliente';

export const fakeCreateCliente = async (
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

export const fakeUpdateCliente = async (
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

export const fakeClienteById = async (id: number): Promise<Cliente[]> => [
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

export const fakePagesClientes = async (
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

export const fakeFixedPagesClientes = async (
  num: number,
  size: number
): Promise<PageResult<Cliente>> => ({
  items: [
    {
      id: 1,
      nome: 'Ana Souza',
      cpf: '12345678912',
      email: 'ana@hotmail.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    },
    {
      id: 2,
      nome: 'Bruno Lima',
      cpf: '73542740987',
      email: 'bruno@gmail.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    },
    {
      id: 3,
      nome: 'Carlos Cardoso',
      cpf: '97632457651',
      email: 'carlos@outlook.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    },
    {
      id: 4,
      nome: 'Daniela Mercury',
      cpf: '85123412314',
      email: 'daniela@gmail.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    },
    {
      id: 5,
      nome: 'Evandro Mesquita',
      cpf: '98642357898',
      email: 'evandro@hotmail.com',
      senha: '',
      observacoes: 'Cliente de teste',
      ativo: true
    }
  ],
  page: num,
  pageSize: size,
  total: 6
});

export const fakeDeleteCliente = async (_id: number): Promise<void> => {};
