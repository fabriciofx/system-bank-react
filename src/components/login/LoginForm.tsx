import { Button, TextField } from '@mui/material';
import type { NavigateFunction } from 'react-router-dom';
import type { Credentials } from '../../models/Credentials';
import { ErrorMessage } from '../message/Message';
import './LoginForm.css';

type LoginFormProps = {
  login: (credentials: Credentials) => Promise<boolean>;
  navigate: NavigateFunction;
};

export default function LoginForm({ login, navigate }: LoginFormProps) {
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const credentials: Credentials = {
      username: form.get('username')?.toString() ?? '',
      password: form.get('password')?.toString() ?? ''
    };
    try {
      await login(credentials);
      navigate('/clientes');
    } catch (error) {
      await new ErrorMessage('Autenticação inválida', `${error}`).show();
    }
  }

  return (
    <div>
      <div className="title">
        <h1>Login</h1>
        <p className="subtitle">
          Faça login na área administrativa do sistema. Solicite um acesso à
          equipe técnica.
        </p>
      </div>
      <div>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">E-mail ou Nome de Usuário</label>
            <TextField
              id="username"
              name="username"
              variant="outlined"
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Senha</label>
            <TextField
              type="password"
              id="password"
              name="password"
              variant="outlined"
              required
            />
          </div>
          <p className="reset-password">Esqueci minha senha</p>
          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
