import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FormCliente from './FormCliente';

describe('Componente FormCliente', () => {
  it('verifica o nome do botão de submit', () => {
    render(
      <MemoryRouter>
        <FormCliente submitText="Cadastrar" />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Cadastrar');
  });
});
