import { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../services/ClienteService';
import type { Cliente } from '../models/Cliente';

type FormClienteProps = {
  clienteAtual?: Cliente;
  onSave: () => void;
};

const FormCliente: React.FC<FormClienteProps> = ({ clienteAtual, onSave }) => {
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
      } else {
        await createCliente(cliente);
      }
      onSave();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
        />
      </label>
      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Observações:
        <textarea
          name="observacoes"
          value={cliente.observacoes}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Ativo:
        <input
          type="checkbox"
          name="ativo"
          checked={cliente.ativo}
          onChange={() => setCliente({ ...cliente, ativo: !cliente.ativo })}
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default FormCliente;
