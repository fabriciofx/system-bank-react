import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import {
  CREDENTIALS_INVALIDAS,
  type Credentials
} from '../../models/Credentials';
import './FormLogin.css';

type FormLoginProps = {
  login: (credentials: Credentials) => Promise<boolean>;
  navigate: NavigateFunction;
};

export default function FormLogin({ login, navigate }: FormLoginProps) {
  const [credentials, setCredentials] = useState<Credentials>(
    CREDENTIALS_INVALIDAS
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const response = await login(credentials);
    if (response) {
      navigate('/clientes');
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
              value={credentials.username}
              onChange={handleChange}
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
              value={credentials.password}
              onChange={handleChange}
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
