import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import { CLIENTE_INVALIDO, type Cliente } from '../../models/Cliente';
import './FormCliente.css';

type FormClienteProps = {
  create: (cliente: Cliente) => Promise<Cliente>;
  update: (id: number, clienteAtualizado: Cliente) => Promise<Cliente>;
  findById: (id: number) => Promise<Cliente[]>;
  buttonText: string;
};

export default function FormCliente({
  create,
  update,
  findById,
  buttonText
}: FormClienteProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_INVALIDO);

  useEffect(() => {
    if (id) {
      (async () => {
        const clienteEdit = await findById(Number(id));
        if (clienteEdit.length > 0) {
          setCliente(clienteEdit[0]);
        }
      })();
    }
  }, [findById, id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      if (cliente.id) {
        await update(cliente.id, cliente);
        await new SuccessMessage(
          'Sucesso!',
          'Cliente atualizado com sucesso!'
        ).show();
      } else {
        const novoCliente = await create(cliente);
        if (novoCliente.id === 0) {
          throw new Error('o identificador do cliente não retornou');
        }
        await new SuccessMessage(
          'Sucesso!',
          'Cliente cadastrado com sucesso!'
        ).show();
      }
      await navigate('/clientes');
    } catch (error) {
      await new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar/atualizar o cliente: ${error}`
      ).show();
    }
  }

  return (
    <div>
      <form className="form-cliente" onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          required
          value={cliente.nome}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="CPF"
          name="cpf"
          required
          value={cliente.cpf}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          required
          value={cliente.email}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="Observações"
          name="observacoes"
          multiline
          minRows={3}
          maxRows={6}
          required
          value={cliente.observacoes}
          onChange={handleChange}
          variant="filled"
        />
        <FormControlLabel
          control={
            <Switch
              name="ativo"
              checked={cliente.ativo}
              required
              onChange={() => setCliente({ ...cliente, ativo: !cliente.ativo })}
            />
          }
          label={cliente.ativo ? 'Ativo' : 'Inativo'}
        />
        <Button type="submit" variant="contained">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
