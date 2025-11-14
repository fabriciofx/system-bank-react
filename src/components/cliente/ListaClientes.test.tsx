import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  fakeUseDeleteCliente,
  fakeUsePagesClientes
} from '../../hooks/fakeUseClientes';
import ListaClientes from './ListaClientes';

describe('ListaClientes', () => {
  // Silencia o aviso do React sobre act()
  const consoleError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('not wrapped in act')
      ) {
        return;
      }
      consoleError(...args);
    };
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('deve mostrar a listagem de clientes', async () => {
    const queryClient = new QueryClient();
    const screen = await render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ListaClientes
            pages={fakeUsePagesClientes}
            remove={fakeUseDeleteCliente}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('tr');
      expect(rows.length).toBeGreaterThan(5);
      expect(rows[1].textContent).toContain(
        '1Ana Souza12345678912ana@hotmail.comSim'
      );
      expect(rows[5].textContent).toContain(
        '5Evandro Mesquita98642357898evandro@hotmail.comSim'
      );
    });
  });
});
