import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  deleteClienteFake,
  pagesClientesFakeFixed
} from '../../services/ClienteServiceFake';
import ListaClientes from './ListaClientes';

describe('Componente ListaClientes', () => {
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
