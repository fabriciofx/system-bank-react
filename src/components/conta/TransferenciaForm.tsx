import { Button, TextField } from '@mui/material';
import type { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TRANSFERENCIA_INVALIDA,
  type Transferencia
} from '../../models/Transferencia';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import './TransferenciaForm.css';

type FormTransferenciaProps = {
  transfer: (options: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }) => UseMutationResult<void, Error, Transferencia, unknown>;
};

export default function FormTransferencia({
  transfer
}: FormTransferenciaProps) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<string>('');
  const [transferencia, setTransferencia] = useState<Transferencia>(
    TRANSFERENCIA_INVALIDA
  );
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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setTransferencia({ ...transferencia, [name]: value });
  }

  function handleCliente(value: React.SetStateAction<string>): void {
    setCliente(value.toString());
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    trans.mutate(transferencia);
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
      .filter((conta) => conta.cliente === Number(cliente))
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
          onChange={(val) => handleCliente(val)}
        />
        <InfiniteSelect
          label="Origem"
          required
          options={contas}
          onChange={(val) =>
            setTransferencia({ ...transferencia, conta_origem: Number(val) })
          }
          key={`origem-${cliente}`}
        />
        <InfiniteSelect
          label="Destino"
          required
          options={contas}
          onChange={(val) =>
            setTransferencia({ ...transferencia, conta_destino: Number(val) })
          }
          key={`destino-${cliente}`}
        />
        <TextField
          label="Valor"
          name="valor"
          variant="filled"
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Transferir
        </Button>
      </form>
    </div>
  );
}
