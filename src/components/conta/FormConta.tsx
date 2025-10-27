import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { Conta } from '../../models/Conta';
import { pagesClientes } from '../../services/ClienteService';
import { createConta, updateConta } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import './FormConta.css';

type FormContaProps = {
  contaAtual?: Conta;
  onSave: () => void;
};

const FormConta: React.FC<FormContaProps> = ({ contaAtual, onSave }) => {
  const navigate = useNavigate();
  const [conta, setConta] = useState<Conta>({
    id: 0,
    cliente: 0,
    numero: '',
    agencia: '',
    saldo: ''
  });

  useEffect(() => {
    if (contaAtual) {
      setConta(contaAtual);
    }
  }, [contaAtual]);

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
    try {
      if (conta.id) {
        await updateConta(conta.id, conta);
        new SuccessMessage('Sucesso!', 'Conta atualizada com sucesso!').show();
      } else {
        await createConta(conta);
        new SuccessMessage('Sucesso!', 'Conta cadastrada com sucesso!').show();
      }
      onSave();
      await navigate('/contas');
    } catch (error) {
      new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar/atualizar a conta: ${error}`
      ).show();
    }
  }

  async function clientes(page: number): Promise<Option[]> {
    const clientes = await pagesClientes(page, 5);
    const opts = clientes.items.map((cliente) => ({
      label: `${cliente.nome} (${cliente.cpf})`,
      value: String(cliente.id)
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
          value={String(conta.cliente)}
          onChange={(val) => setConta({ ...conta, cliente: Number(val) })}
        />
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
          Criar
        </Button>
      </form>
    </div>
  );
};

export default FormConta;
