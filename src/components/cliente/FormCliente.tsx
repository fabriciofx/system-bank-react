import { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../../services/ClienteService';
import type { Cliente } from '../../models/Cliente';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import './FormCliente.css';

type FormClienteProps = {
  clienteAtual?: Cliente;
  onSave: () => void;
};

const FormCliente: React.FC<FormClienteProps> = ({ clienteAtual, onSave }) => {
  const navigate = useNavigate();
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
    if (clienteAtual) {
      setCliente(clienteAtual);
    }
  }, [clienteAtual]);

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
        new SuccessMessage(
          'Sucesso!',
          'Cliente atualizado com sucesso!'
        ).show();
      } else {
        await createCliente(cliente);
        new SuccessMessage(
          'Sucesso!',
          'Cliente cadastrado com sucesso!'
        ).show();
      }
      onSave();
      await navigate('/clientes');
    } catch (error) {
      new ErrorMessage(
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
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default FormCliente;
