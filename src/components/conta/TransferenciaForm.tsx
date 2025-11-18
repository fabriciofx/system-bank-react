import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { PageResult } from '../../core/PageResult';
import type { OperationHook } from '../../hooks/types';
import type { Cliente } from '../../models/Cliente';
import type { Conta } from '../../models/Conta';
import type { Transferencia } from '../../models/Transferencia';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './TransferenciaForm.css';

type FormTransferenciaProps = {
  transfer: OperationHook<Transferencia>;
  clientes: (num: number, size: number) => Promise<PageResult<Cliente>>;
  contas: () => Promise<Conta[]>;
  navigate: NavigateFunction;
};

export default function FormTransferencia({
  transfer,
  clientes,
  contas,
  navigate
}: FormTransferenciaProps) {
  const [cliente, setCliente] = useState<number>(0);
  const [origem, setOrigem] = useState<number>(0);
  const [destino, setDestino] = useState<number>(0);
  const trans = transfer({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Transferência realizada com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao transferir entre contas: ${error.message}`
      ).show()
  });

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const transferencia: Transferencia = {
      conta_origem: origem,
      conta_destino: destino,
      valor: Number(form.get('valor')?.toString())
    };
    trans.mutate(transferencia);
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
          label="Origem"
          required
          options={contasOptions}
          onChange={(val) => setOrigem(Number(val))}
          key={`origem-${cliente}`}
        />
        <InfiniteSelect
          label="Destino"
          required
          options={contasOptions}
          onChange={(val) => setDestino(Number(val))}
          key={`destino-${cliente}`}
        />
        <TextField label="Valor" name="valor" variant="filled" required />
        <Button type="submit" variant="contained">
          Transferir
        </Button>
      </form>
    </div>
  );
}
