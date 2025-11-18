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
import type { ContaCliente } from '../../models/ContaCliente';
import type { Id } from '../../models/Id';
import { ErrorMessage, SuccessMessage } from '../message/Message';
import Spinner from '../spinner/Spinner';

type ContasListProps = {
  pages: PagesHook<ContaCliente>;
  remove: DeleteHook<Id>;
  rowsPage: number;
};

export default function ContasList({
  pages,
  remove,
  rowsPage
}: ContasListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const paginated = pages(page + 1, rowsPerPage);
  const deleta = remove({
    onSuccess: async () =>
      await new SuccessMessage('Sucesso!', 'Conta apagada com sucesso!').show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops!',
        `Erro ao deletar a conta: ${error.message}`
      ).show()
  });

  function handleEdit(contaCliente: ContaCliente): void {
    navigate(`/contas/${contaCliente.id}`);
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
      `Erro ao carregar as contas: ${paginated.error.message}`
    ).show();
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Agência</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.data?.items.map((contaCliente: ContaCliente) => (
              <TableRow key={contaCliente.id}>
                <TableCell>{contaCliente.id}</TableCell>
                <TableCell>{contaCliente.cliente.nome}</TableCell>
                <TableCell>{contaCliente.numero}</TableCell>
                <TableCell>{contaCliente.agencia}</TableCell>
                <TableCell>{contaCliente.saldo}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(contaCliente)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(contaCliente.id)}
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
