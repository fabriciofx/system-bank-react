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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DeleteHook, PagesHook } from '../../hooks/types';
import type { Cliente } from '../../models/Cliente';
import type { Id } from '../../models/Id';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import Spinner from '../spinner/Spinner';

type ClientesListProps = {
  pages: PagesHook<Cliente>;
  remove: DeleteHook<Id>;
  rowsPage: number;
};

export default function ClientesList({
  pages,
  remove,
  rowsPage
}: ClientesListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const paginated = pages(page + 1, rowsPerPage);
  const deleta = remove({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Cliente apagado com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops!',
        `Erro ao apagar o cliente: ${error.message}`
      ).show()
  });

  function handleEdit(cliente: Cliente): void {
    navigate(`/clientes/${cliente.id}`);
  }

  async function handleDelete(id: number) {
    deleta.mutate({ id: id });
  }

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    event?.preventDefault();
    const total = paginated.data?.total || 0;
    const size = paginated.data?.pageSize || 1;
    const max = Math.ceil(total / size);
    const num = Math.max(0, Math.min(newPage, max));
    setPage(num);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  if (paginated.isPending || paginated.isFetching) {
    return <Spinner />;
  }

  if (paginated.isError) {
    new ErrorMessage(
      'Oops...',
      `Erro ao carregar os clientes: ${paginated.error.message}`
    ).show();
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
            {paginated.data?.items.map((cliente: Cliente) => (
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
          count={paginated.data?.total || 0}
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
