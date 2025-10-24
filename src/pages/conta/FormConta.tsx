import { useState, useEffect } from 'react';
import { createConta, updateConta } from '../../services/ContaService';
import type { Conta } from '../../models/Conta';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
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

  return (
    <div>
      <form className="form-conta" onSubmit={handleSubmit}>
        <TextField
          label="Cliente"
          name="cliente"
          required
          value={conta.cliente}
          onChange={handleChange}
          variant="filled"
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
        <Button type="submit">Criar</Button>
      </form>
    </div>
  );
};

export default FormConta;
