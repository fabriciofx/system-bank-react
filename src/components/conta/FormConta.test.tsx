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
