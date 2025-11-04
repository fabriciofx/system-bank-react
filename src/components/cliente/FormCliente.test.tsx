import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FormCliente from './FormCliente';

describe('Componenten FormCliente', () => {
  it('renderiza o nome do botão de submit', () => {
    render(
      <MemoryRouter>
        <FormCliente submitText="Cadastrar" />
      </MemoryRouter>
    );
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Cadastrar');
  });
});
