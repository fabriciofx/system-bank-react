import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { pagesClientes } from '../../services/ClienteService';
import { listContas, saqueConta } from '../../services/ContaService';
import type { Saque } from '../../models/Saque';
import './FormSaque.css';

type FormContaProps = {
  onSave: () => void;
};

const FormSaque: React.FC<FormContaProps> = ({ onSave }) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<string>('');
  const [saque, setSaque] = useState<Saque>({ conta: 0, valor: 0 });

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
    try {
      await saqueConta(saque);
      new SuccessMessage('Sucesso!', 'Saque realizado com sucesso!').show();
      onSave();
      await navigate('/contas');
    } catch (error) {
      new ErrorMessage('Oops...', `Erro ao sacar da conta: ${error}`).show();
    }
  }

  async function clientes(page: number): Promise<Option[]> {
    try {
      const result = await pagesClientes(page, 5);
      const opts = result.items.map((client) => ({
        label: `${client.nome} (${client.cpf})`,
        value: String(client.id)
      }));
      return opts;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return [];
    }
  }

  async function contas(): Promise<Option[]> {
    const contas = await listContas();
    const opts = contas
      .filter((conta) => conta.cliente == Number(cliente))
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
          label="valor"
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
};

export default FormSaque;
