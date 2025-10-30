import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { Cliente } from '../../models/Cliente';
import {
  clienteById,
  createCliente,
  updateCliente
} from '../../services/ClienteService';
import './FormCliente.css';

type FormClienteProps = {
  submitText: string;
};

const FormCliente: React.FC<FormClienteProps> = ({ submitText }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    observacoes: '',
    ativo: true
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const clienteEdit = await clienteById(Number(id));
        if (clienteEdit.length > 0) {
          setCliente(clienteEdit[0]);
        }
      })();
    }
  }, [id]);

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
        await updateCliente(cliente.id, cliente);
        await new SuccessMessage(
          'Sucesso!',
          'Cliente atualizado com sucesso!'
        ).show();
      } else {
        await createCliente(cliente);
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
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default FormCliente;
