import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { PageResult } from '../../core/PageResult';
import type { CreateHook } from '../../hooks/types';
import type { Cliente } from '../../models/Cliente';
import type { Conta } from '../../models/Conta';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './NovaContaForm.css';

type NovaContaFormProps = {
  create: CreateHook<Conta>;
  clientes: (num: number, size: number) => Promise<PageResult<Cliente>>;
  navigate: NavigateFunction;
};

export default function NovaContaForm({
  create,
  clientes,
  navigate
}: NovaContaFormProps) {
  const [cliente, setCliente] = useState<number>(0);
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const conta: Conta = {
      id: 0,
      cliente: cliente,
      numero: form.get('numero')?.toString() ?? '',
      agencia: form.get('agencia')?.toString() ?? '',
      saldo: form.get('saldo')?.toString() ?? ''
    };
    cadastra.mutate(conta);
    await navigate('/contas');
  }

  async function clientesOptions(page: number): Promise<Option[]> {
    try {
      const result = await clientes(page, 5);
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
        <InfiniteSelect
          label="Cliente"
          required
          options={clientesOptions}
          onChange={(val) => setCliente(Number(val))}
        />
        <TextField label="Número" name="numero" required variant="filled" />
        <TextField label="Agência" name="agencia" required variant="filled" />
        <TextField label="Saldo" name="saldo" required variant="filled" />
        <Button type="submit" variant="contained">
          Criar
        </Button>
      </form>
    </div>
  );
}
