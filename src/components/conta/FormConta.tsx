import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { Conta } from '../../models/Conta';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import './FormConta.css';
import type { PageResult } from '../../core/PageResult';
import type { Cliente } from '../../models/Cliente';

type FormContaProps = {
  create: (conta: Conta) => Promise<Conta>;
  update: (id: number, contaAtualizada: Conta) => Promise<Conta>;
  findById: (id: number) => Promise<Conta>;
  pages: (num: number, size: number) => Promise<PageResult<Cliente>>;
  clienteById: (id: number) => Promise<Cliente[]>;
  buttonText: string;
};

const FormConta: React.FC<FormContaProps> = ({
  create,
  update,
  findById,
  pages,
  clienteById,
  buttonText
}) => {
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
    try {
      if (conta.id) {
        await update(conta.id, conta);
        await new SuccessMessage(
          'Sucesso!',
          'Conta atualizada com sucesso!'
        ).show();
      } else {
        const novaConta = await create(conta);
        if (novaConta.id === 0) {
          throw new Error('o identificador da conta não retornou');
        }
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
};

export default FormConta;
