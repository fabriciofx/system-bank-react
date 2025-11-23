import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { Credentials } from '../../models/Credentials';
import { ErrorMessage } from '../message/Message';
import './LoginForm.css';

type LoginFormProps = {
  login: (credentials: Credentials) => Promise<boolean>;
  navigate: NavigateFunction;
};

export default function LoginForm({ login, navigate }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const credentials: Credentials = {
      username: username,
      password: password
    };
    try {
      await login(credentials);
      navigate('/clientes');
    } catch (error) {
      await new ErrorMessage('Autenticação inválida', `${error}`).show();
      setUsername('');
      setPassword('');
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
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
