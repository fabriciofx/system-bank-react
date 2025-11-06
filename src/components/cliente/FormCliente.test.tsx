import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  clienteByIdFake,
  createClienteFake,
  updateClienteFake
} from '../../services/ClienteServiceFake';
import FormCliente from './FormCliente';

describe('FormCliente', () => {
  it('deve aparecer o nome Cadastar no botão do formulário', async () => {
    const screen = await render(
      <MemoryRouter>
        <FormCliente
          create={createClienteFake}
          update={updateClienteFake}
          findById={clienteByIdFake}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await expect
      .element(screen.getByRole('button'))
      .toHaveTextContent('Cadastrar');
  });

  it('deve preencher e enviar o formulário com sucesso', async () => {
    const screen = await render(
      <MemoryRouter>
        <FormCliente
          create={createClienteFake}
          update={updateClienteFake}
          findById={clienteByIdFake}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await screen.getByLabelText(/nome/i).fill('Fabrício Cabral');
    await screen.getByLabelText(/cpf/i).fill('12345678900');
    await screen.getByLabelText(/e-mail/i).fill('fabricio@email.com');
    await screen.getByLabelText(/observações/i).fill('Cliente de teste');
    await screen.getByRole('button').click();
    const title = document.getElementsByClassName('swal2-title')[0];
    expect(title.textContent).toEqual('Sucesso!');
  });
});
