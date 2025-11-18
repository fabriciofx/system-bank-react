import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, type NavigateFunction } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeUseCreateConta } from '../../hooks/fakeUseConta';
import { fakePagesClientes } from '../../services/FakeClienteService';
import NovaContaForm from './NovaContaForm';

describe('NovaContaForm', () => {
  it('deve preencher e enviar o formulário com sucesso', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <NovaContaForm
            create={fakeUseCreateConta}
            clientes={fakePagesClientes}
            navigate={fakeNavigate}
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
