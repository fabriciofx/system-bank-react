import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, type NavigateFunction } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeUseCreateCliente } from '../../hooks/fakeUseClientes';
import FormNovoCliente from './FormNovoCliente';

describe('FormNovoCliente', () => {
  it('deve aparecer o nome Cadastar no botão do formulário', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormNovoCliente
            create={fakeUseCreateCliente}
            navigate={fakeNavigate}
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
      await expect
        .element(screen.getByRole('button'))
        .toHaveTextContent('Cadastrar');
    });
  });

  it('deve preencher e enviar o formulário com sucesso', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormNovoCliente
            create={fakeUseCreateCliente}
            navigate={fakeNavigate}
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
      await screen.getByLabelText(/nome/i).fill('Fabrício Cabral');
      await screen.getByLabelText(/cpf/i).fill('12345678900');
      await screen.getByLabelText(/e-mail/i).fill('fabricio@email.com');
      await screen.getByLabelText(/observações/i).fill('Cliente de teste');
      await screen.getByRole('button').click();
      const title = document.getElementsByClassName('swal2-title')[0];
      expect(title.textContent).toEqual('Sucesso!');
    });
  });
});
