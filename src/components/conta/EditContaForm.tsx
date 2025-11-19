import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import type { NavigateFunction, Params } from 'react-router-dom';
import type { UpdateHook } from '../../hooks/types';
import { CLIENTE_INVALIDO, type Cliente } from '../../models/Cliente';
import { CONTA_INVALIDA, type Conta } from '../../models/Conta';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './EditContaForm.css';

type EditContaFormProps = {
  update: UpdateHook<Conta>;
  findById: (id: number) => Promise<Conta[]>;
  clienteById: (id: number) => Promise<Cliente[]>;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
};

export default function EditContaForm({
  update,
  findById,
  clienteById,
  navigate,
  params
}: EditContaFormProps) {
  const [conta, setConta] = useState<Conta>(CONTA_INVALIDA);
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_INVALIDO);
  const atualiza = update({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Conta atualizada com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao atualizar a conta: ${error.message}`
      ).show()
  });

  useEffect(() => {
    if (params.id) {
      const load = async () => {
        const contaEdit = await findById(Number(params.id));
        if (contaEdit.length > 0) {
          const clienteEdit = await clienteById(contaEdit[0].cliente);
          if (clienteEdit.length > 0) {
            setConta(contaEdit[0]);
            setCliente(clienteEdit[0]);
          }
        }
      };
      load();
    }
  }, [findById, clienteById, params.id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setConta({ ...conta, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    atualiza.mutate(conta);
    await navigate('/contas');
  }

  return (
    <div>
      <form className="form-conta" onSubmit={handleSubmit}>
        <Select
          id="select"
          variant="filled"
          label="Cliente"
          required
          value={cliente.id}
          onChange={(val) => setConta({ ...conta, cliente: Number(val) })}
        >
          <MenuItem
            value={cliente.id}
          >{`${cliente.nome} (${cliente.cpf})`}</MenuItem>
        </Select>
        <TextField
          label="Número"
          name="numero"
          required
          value={conta.numero}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="Agência"
          name="agencia"
          required
          value={conta.agencia}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="Saldo"
          name="saldo"
          required
          value={conta.saldo}
          onChange={handleChange}
          variant="filled"
        />
        <Button type="submit" variant="contained">
          Atualizar
        </Button>
      </form>
    </div>
  );
}
