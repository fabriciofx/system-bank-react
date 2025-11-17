import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import { SAQUE_INVALIDO, type Saque } from '../../models/Saque';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import './FormConta.css';
import type { UseMutationResult } from '@tanstack/react-query';

type FormSaqueProps = {
  withdrawal: (options: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }) => UseMutationResult<void, Error, Saque, unknown>;
};

export default function FormSaque({ withdrawal }: FormSaqueProps) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<string>('');
  const [saque, setSaque] = useState<Saque>(SAQUE_INVALIDO);
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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setSaque({ ...saque, [name]: value });
  }

  function handleCliente(value: React.SetStateAction<string>): void {
    setCliente(value.toString());
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
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
          label="Conta"
          required
          options={contas}
          onChange={(val) => setSaque({ ...saque, conta: Number(val) })}
          key={cliente}
        />
        <TextField
          label="Valor"
          name="valor"
          variant="filled"
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Sacar
        </Button>
      </form>
    </div>
  );
}
