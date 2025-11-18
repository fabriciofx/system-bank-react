import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { PageResult } from '../../core/PageResult';
import type { OperationHook } from '../../hooks/types';
import type { Cliente } from '../../models/Cliente';
import type { Conta } from '../../models/Conta';
import type { Saque } from '../../models/Saque';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './SaqueForm.css';

type SaqueFormProps = {
  withdrawal: OperationHook<Saque>;
  clientes: (num: number, size: number) => Promise<PageResult<Cliente>>;
  contas: () => Promise<Conta[]>;
  navigate: NavigateFunction;
};

export default function SaqueForm({
  withdrawal,
  clientes,
  contas,
  navigate
}: SaqueFormProps) {
  const [cliente, setCliente] = useState<number>(0);
  const [conta, setConta] = useState<number>(0);
  const saq = withdrawal({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Saque realizado com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao sacar na conta: ${error.message}`
      ).show()
  });

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const saque: Saque = {
      conta: conta,
      valor: Number(form.get('valor')?.toString())
    };
    saq.mutate(saque);
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

  async function contasOptions(): Promise<Option[]> {
    const conts = await contas();
    const opts = conts
      .filter((conta) => conta.cliente === cliente)
      .map((conta) => ({
        label: `${conta.numero} (${conta.agencia})`,
        value: String(conta.id)
      }));
    return opts;
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
        <InfiniteSelect
          label="Conta"
          required
          options={contasOptions}
          onChange={(val) => setConta(Number(val))}
          key={cliente}
        />
        <TextField label="Valor" name="valor" variant="filled" required />
        <Button type="submit" variant="contained">
          Sacar
        </Button>
      </form>
    </div>
  );
}
