import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeFixedPagesContasClientes } from '../../services/FakeContaClienteService';
import { fakeDeleteConta } from '../../services/FakeContaService';
import ListaContas from './ListaContas';

describe('ListaContas', () => {
  it('deve mostrar a listagem de clientes', async () => {
    const screen = await render(
      <MemoryRouter>
        <ListaContas
          pages={fakeFixedPagesContasClientes}
          remove={fakeDeleteConta}
        />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('tr');
      expect(rows.length).toBeGreaterThan(5);
      expect(rows[1].textContent).toContain('1Ana Souza111112121000');
      expect(rows[5].textContent).toContain('5Evandro Mesquita555516165000');
    });
  });
});
