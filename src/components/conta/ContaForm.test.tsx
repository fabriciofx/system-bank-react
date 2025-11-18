import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  fakeUseCreateConta,
  fakeUseUpdateConta
} from '../../hooks/fakeUseConta';
import {
  fakeClienteById,
  fakePagesClientes
} from '../../services/FakeClienteService';
import { fakeContaById } from '../../services/FakeContaService';
import ContaForm from './ContaForm';

describe('ContaForm', () => {
  it('deve aparecer o nome Criar no botão do formulário', async () => {
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ContaForm
            create={fakeUseCreateConta}
            update={fakeUseUpdateConta}
            findById={fakeContaById}
            pages={fakePagesClientes}
            clienteById={fakeClienteById}
            buttonText="Criar"
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
      await expect
        .element(screen.getByRole('button'))
        .toHaveTextContent('Criar');
    });
  });

  it('deve preencher e enviar o formulário com sucesso', async () => {
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ContaForm
            create={fakeUseCreateConta}
            update={fakeUseUpdateConta}
            findById={fakeContaById}
            pages={fakePagesClientes}
            clienteById={fakeClienteById}
            buttonText="Cadastrar"
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
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
});
