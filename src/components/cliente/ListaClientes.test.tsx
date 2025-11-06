import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  deleteClienteFake,
  pagesClientesFakeFixed
} from '../../services/ClienteServiceFake';
import ListaClientes from './ListaClientes';

describe('Componente ListaClientes', () => {
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

  it('mostra a listagem de clientes', async () => {
    const screen = await render(
      <MemoryRouter>
        <ListaClientes
          pages={pagesClientesFakeFixed}
          remove={deleteClienteFake}
        />
      </MemoryRouter>
    );
    const rows = screen.container.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(5);
  });
});
