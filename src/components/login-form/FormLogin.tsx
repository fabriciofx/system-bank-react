import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, styled, TextField } from '@mui/material';
import type { Credentials } from '../../models/Credentials';
import { login } from '../../services/AuthService';
import './FormLogin.css';

const FormBox = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export default function FormLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });

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
      <div style={{ marginBottom: '52px' }}>
        <h1>Login</h1>
        <p className="subtitle">
          Faça login na área administrativa do sistema. Solicite um acesso à
          equipe técnica.
        </p>
      </div>
      <div>
        <FormBox onSubmit={handleSubmit}>
          <div className="form-login" style={{ marginBottom: '40px' }}>
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
          <div className="form-login">
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
          <p className="reset_password">Esqueci minha senha</p>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
          >
            Entrar
          </Button>
        </FormBox>
      </div>
    </div>
  );
}
