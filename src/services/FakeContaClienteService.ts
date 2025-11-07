import type { PageResult } from '../core/PageResult';
import type { ContaCliente } from '../models/ContaCliente';

export const fakeFixedPagesContasClientes = async (
  num: number,
  size: number
): Promise<PageResult<ContaCliente>> => ({
  items: [
    {
      id: 1,
      cliente: {
        id: 1,
        nome: 'Ana Souza',
        cpf: '12345678912',
        email: 'ana@hotmail.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: true
      },
      numero: '1111',
      agencia: '1212',
      saldo: '1000'
    },
    {
      id: 2,
      cliente: {
        id: 2,
        nome: 'Bruno Lima',
        cpf: '73542740987',
        email: 'bruno@gmail.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: true
      },
      numero: '2222',
      agencia: '1313',
      saldo: '2000'
    },
    {
      id: 3,
      cliente: {
        id: 3,
        nome: 'Carlos Cardoso',
        cpf: '97632457651',
        email: 'carlos@outlook.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: true
      },
      numero: '3333',
      agencia: '1414',
      saldo: '3000'
    },
    {
      id: 4,
      cliente: {
        id: 4,
        nome: 'Daniela Mercury',
        cpf: '85123412314',
        email: 'daniela@gmail.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: true
      },
      numero: '4444',
      agencia: '1515',
      saldo: '4000'
    },
    {
      id: 5,
      cliente: {
        id: 5,
        nome: 'Evandro Mesquita',
        cpf: '98642357898',
        email: 'evandro@hotmail.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: true
      },
      numero: '5555',
      agencia: '1616',
      saldo: '5000'
    }
  ],
  page: num,
  pageSize: size,
  total: 6
});
