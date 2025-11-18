import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { type NavigateFunction, useParams } from 'react-router-dom';
import type { UpdateHook } from '../../hooks/types';
import { CLIENTE_INVALIDO, type Cliente } from '../../models/Cliente';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './EditClienteForm.css';

type EditClienteFormProps = {
  update: UpdateHook<Cliente>;
  findById: (id: number) => Promise<Cliente[]>;
  navigate: NavigateFunction;
};

export default function EditClienteForm({
  update,
  findById,
  navigate
}: EditClienteFormProps) {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_INVALIDO);
  const atualiza = update({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Cliente atualizado com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao atualizar o cliente: ${error.message}`
      ).show()
  });
  useEffect(() => {
    if (id) {
      (async () => {
        const clienteEdit = await findById(Number(id));
        if (clienteEdit.length > 0) {
          setCliente(clienteEdit[0]);
        }
      })();
    }
  }, [findById, id]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCliente((cliente) => ({ ...cliente, [name]: value }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    atualiza.mutate(cliente);
    await navigate('/clientes');
  }

  return (
    <div>
      <form className="form-cliente" onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          required
          value={cliente.nome}
          onChange={handleOnChange}
          variant="filled"
        />
        <TextField
          label="CPF"
          name="cpf"
          required
          value={cliente.cpf}
          onChange={handleOnChange}
          variant="filled"
        />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          required
          value={cliente.email}
          onChange={handleOnChange}
          variant="filled"
        />
        <TextField
          label="Observações"
          name="observacoes"
          multiline
          minRows={3}
          maxRows={6}
          required
          value={cliente.observacoes}
          onChange={handleOnChange}
          variant="filled"
        />
        <FormControlLabel
          control={
            <Switch
              name="ativo"
              checked={cliente.ativo}
              required
              onChange={() => setCliente({ ...cliente, ativo: !cliente.ativo })}
            />
          }
          label={cliente.ativo ? 'Ativo' : 'Inativo'}
        />
        <Button type="submit" variant="contained">
          Atualiza
        </Button>
      </form>
    </div>
  );
}
