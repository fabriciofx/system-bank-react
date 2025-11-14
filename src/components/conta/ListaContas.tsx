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
import { Spinner } from '../../components/spinner/Spinner';
import type { PageResult } from '../../core/PageResult';
import type { ContaCliente } from '../../models/ContaCliente';
import type { Id } from '../../models/Id';
import { ErrorMessage, SuccessMessage } from '../message/Message';

type ListaContasProp = {
  pages: (
    num: number,
    size: number
  ) => UseQueryResult<PageResult<ContaCliente>, Error>;
  remove: (options: {
    onSuccess: () => void;
    onError: () => void;
  }) => UseMutationResult<void, Error, Id, unknown>;
};

const ListaContas: React.FC<ListaContasProp> = ({ pages, remove }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isPending, isFetching, isError, error } = pages(
    page + 1,
    rowsPerPage
  );
  const { mutate } = remove({
    onSuccess: async () =>
      await new SuccessMessage('Sucesso!', 'Conta apagada com sucesso!').show(),
    onError: async () =>
      await new ErrorMessage('Oops!', 'Erro ao deletar a conta!').show()
  });

  function handleEdit(contaCliente: ContaCliente): void {
    navigate(`/contas/${contaCliente.id}`);
  }

  async function handleDelete(id: number) {
    mutate({ id: id });
  }

  function handleChangePage(_event: unknown, newPage: number) {
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
              <TableCell>Cliente</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Agência</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items.map((contaCliente: ContaCliente) => (
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
};

export default ListaContas;
