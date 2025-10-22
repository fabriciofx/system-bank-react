import { useEffect, useState, type JSX } from 'react';
import { getClientes, deleteCliente } from '../services/ClienteService';
import type { Cliente } from '../models/Cliente';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
      <h1>Listagem de clientes</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente: Cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.ativo ? 'Sim' : 'Não'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onEdit(cliente)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(cliente.id)}
                    aria-label="Excluir"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListaClientes;
