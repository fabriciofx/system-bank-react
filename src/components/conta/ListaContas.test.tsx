import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { pagesContasClientesFakeFixed } from '../../services/ContaClienteServiceFake';
import { deleteContaFake } from '../../services/ContaServiceFake';
import ListaContas from './ListaContas';

describe('ListaContas', () => {
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
    const screen = await render(
      <MemoryRouter>
        <ListaContas
          pages={pagesContasClientesFakeFixed}
          remove={deleteContaFake}
        />
      </MemoryRouter>
    );
    const rows = screen.container.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(5);
    expect(rows[1].textContent).toContain('1Ana Souza111112121000');
    expect(rows[5].textContent).toContain('5Evandro Mesquita555516165000');
  });
});
