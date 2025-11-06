import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  clienteByIdFake,
  pagesClientesFake
} from '../../services/ClienteServiceFake';
import {
  contaByIdFake,
  createContaFake,
  updateContaFake
} from '../../services/ContaServiceFake';
import FormConta from './FormConta';

describe('FormConta', () => {
  it('deve aparecer o nome Criar no botão do formulário', async () => {
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

  it('deve preencher e enviar o formulário com sucesso', async () => {
    const { getByRole, getByLabelText } = await render(
      <MemoryRouter>
        <FormConta
          create={createContaFake}
          update={updateContaFake}
          findById={contaByIdFake}
          pages={pagesClientesFake}
          clienteById={clienteByIdFake}
          buttonText="Cadastrar"
        />
      </MemoryRouter>
    );
    await getByRole('combobox').click();
    await getByRole('option').nth(1).click();
    await getByLabelText(/número/i).fill('12345');
    await getByLabelText(/agência/i).fill('1234');
    await getByLabelText(/saldo/i).fill('1000');
    await getByRole('button').click();
    const title = document.getElementsByClassName('swal2-title')[0];
    expect(title.textContent).toEqual('Sucesso!');
  });
});
