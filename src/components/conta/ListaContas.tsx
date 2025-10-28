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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/spinner/Spinner';
import type { PageResult } from '../../core/PageResult';
import type { ContaCliente } from '../../models/ContaCliente';
import { pagesContasClientes } from '../../services/ContaClienteService';
import { deleteConta } from '../../services/ContaService';
import { SuccessMessage } from '../message/Message';

const ListaContas: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageResult, setPageResult] = useState<PageResult<ContaCliente>>({
    items: [],
    page: 1,
    pageSize: 5,
    total: 5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContas() {
      try {
        setLoading(true);
        const result = await pagesContasClientes(page + 1, rowsPerPage);
        setPageResult(result);
      } catch (error) {
        console.error('Erro ao carregar as contas: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContas();
  }, [page, rowsPerPage]);

  function handleEdit(contaCliente: ContaCliente): void {
    navigate(`/contas/${contaCliente.id}`);
  }

  async function handleDelete(id: number) {
    try {
      setLoading(true);
      await deleteConta(id);
      const result: PageResult<ContaCliente> = {
        items: pageResult.items.filter(
          (conta: ContaCliente) => conta.id !== id
        ),
        page: pageResult.page,
        pageSize: pageResult.pageSize,
        total: pageResult.total - 1
      };
      setPageResult(result);
      setLoading(false);
      await new SuccessMessage('Sucesso!', 'Conta apagada com sucesso!').show();
    } catch (error) {
      console.error('Erro ao deletar a conta:', error);
    }
  }

  function handleChangePage(_event: unknown, newPage: number) {
    const max = Math.ceil(pageResult.total / pageResult.pageSize);
    const num = Math.max(0, Math.min(newPage, max));
    setPage(num);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <div>
      {loading && <Spinner />}
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
            {pageResult.items.map((contaCliente: ContaCliente) => (
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
          count={pageResult.total}
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
