import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { CreateHook } from '../../hooks/types';
import type { Cliente } from '../../models/Cliente';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './NovoClienteForm.css';

type NovoClienteFormProps = {
  create: CreateHook<Cliente>;
  navigate: NavigateFunction;
};

export default function NovoClienteForm({
  create,
  navigate
}: NovoClienteFormProps) {
  const [ativo, setAtivo] = useState(true);
  const cadastra = create({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Cliente cadastrado com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar o cliente: ${error.message}`
      ).show()
  });

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const cliente: Cliente = {
      id: 0,
      nome: form.get('nome')?.toString() || '',
      cpf: form.get('cpf')?.toString() || '',
      email: form.get('email')?.toString() || '',
      senha: '',
      ativo: ativo,
      observacoes: form.get('observacoes')?.toString() || ''
    };
    cadastra.mutate(cliente);
    await navigate('/clientes');
  }

  return (
    <div>
      <form className="form-cliente" onSubmit={handleSubmit}>
        <TextField label="Nome" name="nome" required variant="filled" />
        <TextField label="CPF" name="cpf" required variant="filled" />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          required
          variant="filled"
        />
        <TextField
          label="Observações"
          name="observacoes"
          multiline
          minRows={3}
          maxRows={6}
          required
          variant="filled"
        />
        <FormControlLabel
          control={
            <Switch
              name="ativo"
              checked={ativo}
              required
              onChange={() => setAtivo(!ativo)}
            />
          }
          label={ativo ? 'Ativo' : 'Inativo'}
        />
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
