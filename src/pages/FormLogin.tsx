import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, styled, TextField } from '@mui/material';
import type { Credentials } from '../models/Credentials';
import { login } from '../services/AuthService';

const FormBox = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: 400,
  padding: theme.spacing(2)
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
    <FormBox onSubmit={handleSubmit}>
      <TextField
        label="E-mail ou Nome de Usuário"
        id="username"
        name="username"
        variant="filled"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <TextField
        type="password"
        label="password"
        id="password"
        name="password"
        variant="filled"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <Button type="submit">Enviar</Button>
    </FormBox>
  );
}
