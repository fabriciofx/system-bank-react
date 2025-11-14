import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import type { PageResult } from '../../core/PageResult';
import type { Cliente } from '../../models/Cliente';
import type { Id } from '../../models/Id';
import { ErrorMessage, SuccessMessage } from '../message/Message';

type ListaClientesProps = {
  pages: (
    num: number,
    size: number
  ) => UseQueryResult<PageResult<Cliente>, Error>;
  remove: (options: {
    onSuccess: () => void;
    onError: () => void;
  }) => UseMutationResult<void, Error, Id, unknown>;
};

export default function ListaClientes({ pages, remove }: ListaClientesProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isPending, isFetching, isError, error } = pages(
    page + 1,
    rowsPerPage
  );
  const { mutate } = remove({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Cliente apagado com sucesso!'
      ).show(),
    onError: async () =>
      await new ErrorMessage('Oops!', 'Erro ao apagar cliente!').show()
  });

  function handleEdit(cliente: Cliente): void {
    navigate(`/clientes/${cliente.id}`);
  }

  async function handleDelete(id: number) {
    mutate({ id: id });
  }

  function handleChangePage(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    const total = data?.total || 0;
    const size = data?.pageSize || 1;
    const max = Math.ceil(total / size);
    const num = Math.max(0, Math.min(newPage, max));
    setPage(num);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  if (isPending || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Erro: {error.message}</p>;
  }

  return (
    <div>
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
            {data?.items.map((cliente: Cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.ativo ? 'Sim' : 'Não'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(cliente)}
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
        <TablePagination
          component="div"
          count={data?.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </div>
  );
}
