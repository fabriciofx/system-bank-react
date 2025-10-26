import { useEffect, useState, type JSX } from 'react';
import { deleteConta } from '../../services/ContaService';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { PageResult } from '../../core/PageResult';
import type { ContaCliente } from '../../models/ContaCliente';
import { pagesContasClientes } from '../../services/ContaClienteService';
import { Spinner } from '../../components/spinner/Spinner';

type ListaContasProps = {
  onEdit: (contaCliente: ContaCliente) => void;
};

const ListaContas: React.FC<ListaContasProps> = ({ onEdit }) => {
  const [page, setPage] = useState(1);
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
        const result = await pagesContasClientes(page, rowsPerPage);
        setPageResult(result);
      } catch (error) {
        console.error('Erro ao carregar as contas: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContas();
  }, [page, rowsPerPage]);

  async function handleDelete(id: number) {
    try {
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
    } catch (error) {
      console.error('Erro ao deletar a conta:', error);
    }
  }

  function handleChangePage(_event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
                    onClick={() => onEdit(contaCliente)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(contaCliente.id!)}
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
