import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { Conta } from '../../models/Conta';
import { clienteById, pagesClientes } from '../../services/ClienteService';
import {
  contaById,
  createConta,
  updateConta
} from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import './FormConta.css';
import type { Cliente } from '../../models/Cliente';

type FormContaProps = {
  submitText: string;
};

const FormConta: React.FC<FormContaProps> = ({ submitText }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [conta, setConta] = useState<Conta>({
    id: 0,
    cliente: 0,
    numero: '',
    agencia: '',
    saldo: ''
  });
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    ativo: false,
    observacoes: ''
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const contaEdit = await contaById(Number(id));
        const result = await clienteById(contaEdit.cliente);
        setConta(contaEdit);
        setCliente(result[0]);
      })();
    }
  }, [id]);

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
        await new SuccessMessage(
          'Sucesso!',
          'Conta atualizada com sucesso!'
        ).show();
      } else {
        await createConta(conta);
        await new SuccessMessage(
          'Sucesso!',
          'Conta cadastrada com sucesso!'
        ).show();
      }
      await navigate('/contas');
    } catch (error) {
      await new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar/atualizar a conta: ${error}`
      ).show();
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
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default FormConta;
