import { useEffect, useState, type JSX } from 'react';
import { getClientes, deleteCliente } from '../services/ClienteService';
import type { Cliente } from '../models/Cliente';

type ListaClientesProps = {
  onEdit: (cliente: Cliente) => void;
};

function ListaClientes({ onEdit }: ListaClientesProps): JSX.Element {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes: ', error);
      }
    }
    fetchClientes();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter((cliente: Cliente) => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }

  return (
    <div>
      <h2>Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente: Cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;
