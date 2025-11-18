import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { PageResult } from '../../core/PageResult';
import type { CreateHook, UpdateHook } from '../../hooks/types';
import { CLIENTE_INVALIDO, type Cliente } from '../../models/Cliente';
import { CONTA_INVALIDA, type Conta } from '../../models/Conta';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './ContaForm.css';

type ContaFormProps = {
  create: CreateHook<Conta>;
  update: UpdateHook<Conta>;
  findById: (id: number) => Promise<Conta>;
  pages: (num: number, size: number) => Promise<PageResult<Cliente>>;
  clienteById: (id: number) => Promise<Cliente[]>;
  buttonText: string;
};

export default function ContaForm({
  create,
  update,
  findById,
  pages,
  clienteById,
  buttonText
}: ContaFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [conta, setConta] = useState<Conta>(CONTA_INVALIDA);
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_INVALIDO);
  const cadastra = create({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Conta cadastrada com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar a conta: ${error.message}`
      ).show()
  });
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
    if (id) {
      (async () => {
        const contaEdit = await findById(Number(id));
        const result = await clienteById(contaEdit.cliente);
        setConta(contaEdit);
        setCliente(result[0]);
      })();
    }
  }, [findById, clienteById, id]);

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
    if (conta.id) {
      atualiza.mutate(conta);
    } else {
      cadastra.mutate(conta);
    }
    await navigate('/contas');
  }

  async function clientes(page: number): Promise<Option[]> {
    try {
      const result = await pages(page, 5);
      const opts = result.items.map((client) => ({
        label: `${client.nome} (${client.cpf})`,
        value: String(client.id)
      }));
      return opts;
    } catch {
      return [];
    }
  }

  return (
    <div>
      <form className="form-conta" onSubmit={handleSubmit}>
        {cliente.id ? (
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
        ) : (
          <InfiniteSelect
            label="Cliente"
            required
            options={clientes}
            value={conta.cliente ? String(conta.cliente) : ''}
            onChange={(val) => setConta({ ...conta, cliente: Number(val) })}
          />
        )}
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
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
