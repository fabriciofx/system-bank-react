import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PageResult } from '../../core/PageResult';
import type { Cliente } from '../../models/Cliente';
import type { Conta } from '../../models/Conta';
import FormConta from './FormConta';

const createContaFake = async (_conta: Conta): Promise<Conta> => ({
  id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  cliente: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  numero: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1),
  agencia: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1),
  saldo: String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1)
});

const updateContaFake = async (id: number, conta: Conta): Promise<Conta> => ({
  id: id,
  cliente: conta.cliente,
  numero: conta.numero,
  agencia: conta.agencia,
  saldo: conta.saldo
});

const contaByIdFake = async (id: number): Promise<Conta> => ({
  id: id,
  cliente: 1,
  numero: '12345',
  agencia: '2222',
  saldo: '1000'
});

const pagesClientesFake = async (
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

const clienteByIdFake = async (id: number): Promise<Cliente[]> => [
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

describe('Componente FormConta', () => {
  it('verifica o nome do botão de submit', async () => {
    const { getByRole } = await render(
      <MemoryRouter>
        <FormConta
          create={createContaFake}
          update={updateContaFake}
          findById={contaByIdFake}
          pages={pagesClientesFake}
          clienteById={clienteByIdFake}
          buttonText="Criar"
        />
      </MemoryRouter>
    );
    await expect.element(getByRole('button')).toHaveTextContent('Criar');
  });
});
