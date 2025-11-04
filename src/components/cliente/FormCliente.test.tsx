import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import * as ClienteService from '../../services/ClienteService';
import FormCliente from './FormCliente';

vi.mock('../../services/ClienteService', () => ({
  createCliente: vi.fn(),
  updateCliente: vi.fn(),
  clienteById: vi.fn().mockResolvedValue([])
}));
vi.mock('../../components/message/Message', () => ({
  SuccessMessage: vi.fn().mockImplementation(() => ({
    show: vi.fn().mockResolvedValue(undefined)
  })),
  ErrorMessage: vi.fn().mockImplementation(() => ({
    show: vi.fn().mockResolvedValue(undefined)
  }))
}));
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: undefined })
  };
});

describe('Componente FormCliente', () => {
  it('verifica o nome do botão de submit', () => {
    render(
      <MemoryRouter>
        <FormCliente submitText="Cadastrar" />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Cadastrar');
  });

  it('preenche e envia o formulário com sucesso', async () => {
    const createMock = vi
      .spyOn(ClienteService, 'createCliente')
      .mockResolvedValueOnce({
        id: 1,
        nome: 'Fabrício Cabral',
        cpf: '12345678900',
        email: 'fabricio@email.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: false
      });
    render(
      <MemoryRouter>
        <FormCliente submitText="Cadastrar" />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Fabrício Cabral' }
    });
    fireEvent.change(screen.getByLabelText(/cpf/i), {
      target: { value: '12345678900' }
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'fabricio@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/observações/i), {
      target: { value: 'Cliente de teste' }
    });
    fireEvent.click(screen.getByRole('switch', { name: /ativo/i }));
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => {
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({
        id: 0,
        nome: 'Fabrício Cabral',
        cpf: '12345678900',
        email: 'fabricio@email.com',
        senha: '',
        observacoes: 'Cliente de teste',
        ativo: false
      });
    });
    const { SuccessMessage } = await import('../../components/message/Message');
    expect(SuccessMessage).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/clientes');
  });
});
