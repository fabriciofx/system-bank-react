import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, type NavigateFunction } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeUseUpdateCliente } from '../../hooks/fakeUseClientes';
import { fakeClienteById } from '../../services/FakeClienteService';
import FormEditCliente from './FormEditCliente';

describe('FormEditCliente', () => {
  it('deve preencher e enviar o formulário com sucesso', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormEditCliente
            update={fakeUseUpdateCliente}
            findById={fakeClienteById}
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
