import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { Cliente } from '../../models/Cliente';
import FormCliente from './FormCliente';

const createClienteFake = async (cliente: Cliente): Promise<Cliente> => ({
  id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  nome: cliente.nome,
  cpf: cliente.cpf,
  email: cliente.email,
  senha: cliente.senha,
  observacoes: cliente.observacoes,
  ativo: cliente.ativo
});

const updateClienteFake = async (
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

const clienteByIdFake = async (id: number): Promise<Cliente[]> => [
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

describe('Componente FormCliente', () => {
  it('verifica o nome do botão de submit', async () => {
    const { getByRole } = await render(
      <MemoryRouter>
        <FormCliente
          create={createClienteFake}
          update={updateClienteFake}
          findById={clienteByIdFake}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await expect.element(getByRole('button')).toHaveTextContent('Cadastrar');
  });

  it('preenche e envia o formulário com sucesso', async () => {
    const { getByRole, getByLabelText } = await render(
      <MemoryRouter>
        <FormCliente
          create={createClienteFake}
          update={updateClienteFake}
          findById={clienteByIdFake}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await getByLabelText(/nome/i).fill('Fabrício Cabral');
    await getByLabelText(/cpf/i).fill('12345678900');
    await getByLabelText(/e-mail/i).fill('fabricio@email.com');
    await getByLabelText(/observações/i).fill('Cliente de teste');
    await getByRole('button').click();
    const title = document.getElementsByClassName('swal2-title')[0];
    expect(title.textContent).toEqual('Sucesso!');
  });
});
