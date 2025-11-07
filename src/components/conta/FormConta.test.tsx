import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  fakeClienteById,
  fakePagesClientes
} from '../../services/FakeClienteService';
import {
  fakeContaById,
  fakeCreateConta,
  fakeUpdateConta
} from '../../services/FakeContaService';
import FormConta from './FormConta';

describe('FormConta', () => {
  it('deve aparecer o nome Criar no botão do formulário', async () => {
    const screen = await render(
      <MemoryRouter>
        <FormConta
          create={fakeCreateConta}
          update={fakeUpdateConta}
          findById={fakeContaById}
          pages={fakePagesClientes}
          clienteById={fakeClienteById}
          buttonText="Criar"
        />
      </MemoryRouter>
    );
    await expect.element(screen.getByRole('button')).toHaveTextContent('Criar');
  });

  it('deve preencher e enviar o formulário com sucesso', async () => {
    const screen = await render(
      <MemoryRouter>
        <FormConta
          create={fakeCreateConta}
          update={fakeUpdateConta}
          findById={fakeContaById}
          pages={fakePagesClientes}
          clienteById={fakeClienteById}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await screen.getByRole('combobox').click();
    await screen.getByRole('option').nth(1).click();
    await screen.getByLabelText(/número/i).fill('12345');
    await screen.getByLabelText(/agência/i).fill('1234');
    await screen.getByLabelText(/saldo/i).fill('1000');
    await screen.getByRole('button').click();
    const title = document.getElementsByClassName('swal2-title')[0];
    expect(title.textContent).toEqual('Sucesso!');
  });
});
