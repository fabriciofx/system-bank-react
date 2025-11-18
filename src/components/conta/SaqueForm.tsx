import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OperationHook } from '../../hooks/types';
import type { Saque } from '../../models/Saque';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './SaqueForm.css';

type SaqueFormProps = {
  withdrawal: OperationHook<Saque>;
};

export default function SaqueForm({ withdrawal }: SaqueFormProps) {
  const navigate = useNavigate();
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

  async function clientes(page: number): Promise<Option[]> {
    try {
      const result = await pagesClientes(page, 5);
      const opts = result.items.map((client) => ({
        label: `${client.nome} (${client.cpf})`,
        value: String(client.id)
      }));
      return opts;
    } catch {
      return [];
    }
  }

  async function contas(): Promise<Option[]> {
    const contas = await listContas();
    const opts = contas
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
          options={clientes}
          onChange={(val) => setCliente(Number(val))}
        />
        <InfiniteSelect
          label="Conta"
          required
          options={contas}
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
