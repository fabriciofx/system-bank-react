import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  fakeUseDeleteConta,
  fakeUsePagesContasClientes
} from '../../hooks/fakeUseContasClientes';
import ListaContas from './ListaContas';

describe('ListaContas', () => {
  it('deve mostrar a listagem de clientes', async () => {
    const queryClient = new QueryClient();
    const screen = await render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ListaContas
            pages={fakeUsePagesContasClientes}
            remove={fakeUseDeleteConta}
            rowsPage={5}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await vi.waitFor(async () => {
      const rows = screen.container.querySelectorAll('tr');
      expect(rows.length).toBeGreaterThan(5);
      expect(rows[1].textContent).toContain('1Ana Souza111112121000');
      expect(rows[5].textContent).toContain('5Evandro Mesquita555516165000');
    });
  });
});
