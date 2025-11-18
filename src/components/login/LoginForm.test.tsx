import { MemoryRouter, type NavigateFunction } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeLogin } from '../../services/FakeAuthService';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('deve autenticar o usuário', async () => {
    const fakeNavigate = vi.fn() as unknown as NavigateFunction;
    const screen = await render(
      <MemoryRouter>
        <LoginForm login={fakeLogin} navigate={fakeNavigate} />
      </MemoryRouter>
    );
    await vi.waitFor(async () => {
      await screen.getByLabelText(/e-mail ou nome de usuário/i).fill('teste');
      await screen.getByLabelText(/senha/i).fill('12345678');
      await screen.getByRole('button').click();
      expect(fakeNavigate).toHaveBeenCalledWith('/clientes');
    });
  });
});
