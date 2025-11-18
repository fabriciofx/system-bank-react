import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  MemoryRouter,
  type NavigateFunction,
  type Params
} from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeUseUpdateConta } from '../../hooks/fakeUseConta';
import { fakeClienteById } from '../../services/FakeClienteService';
import { fakeContaById } from '../../services/FakeContaService';
import EditContaForm from './EditContaForm';

describe('EditContaForm', () => {
  it('deve editar e atualizar o formulário com sucesso', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const fakeParams: Readonly<Params<string>> = {
      id: '1'
    };
    const queryClient = new QueryClient();
    const screen = await render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <EditContaForm
            update={fakeUseUpdateConta}
            findById={fakeContaById}
            clienteById={fakeClienteById}
            navigate={fakeNavigate}
            params={fakeParams}
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
      await screen.getByLabelText(/número/i).fill('12345');
      await screen.getByLabelText(/agência/i).fill('1234');
      await screen.getByLabelText(/saldo/i).fill('1000');
      await screen.getByRole('button').click();
      const title = document.getElementsByClassName('swal2-title')[0];
      expect(title.textContent).toEqual('Sucesso!');
    });
  });
});
