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
import type { Cliente } from '../../models/Cliente';
import { deleteCliente, pagesClientes } from '../../services/ClienteService';

const ListaClientes: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageResult, setPageResult] = useState<PageResult<Cliente>>({
    items: [],
    page: 1,
    pageSize: 5,
    total: 5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      try {
        setLoading(true);
        const result = await pagesClientes(page + 1, rowsPerPage);
        setPageResult(result);
      } catch (error) {
        console.error('Erro ao carregar clientes: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, [page, rowsPerPage]);

  function handleEdit(cliente: Cliente): void {
    navigate(`/clientes/${cliente.id}`);
  }

  async function handleDelete(id: number) {
    try {
      await deleteCliente(id);
      const result: PageResult<Cliente> = {
        items: pageResult.items.filter((cliente: Cliente) => cliente.id !== id),
        page: pageResult.page,
        pageSize: pageResult.pageSize,
        total: pageResult.total - 1
      };
      setPageResult(result);
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
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
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageResult.items.map((cliente: Cliente) => (
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

export default ListaClientes;
