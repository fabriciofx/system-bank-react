import { useEffect, useState, type JSX } from 'react';
import { deleteConta, pagesContas } from '../../services/ContaService';
import type { Conta } from '../../models/Conta';
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

type ListaContasProps = {
  onEdit: (conta: Conta) => void;
};

function ListaContas({ onEdit }: ListaContasProps): JSX.Element {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageResult, setPageResult] = useState<PageResult<Conta>>({
    items: [],
    page: 1,
    pageSize: 5,
    total: 5
  });

  useEffect(() => {
    async function fetchContas() {
      try {
        const result = await pagesContas(page, rowsPerPage);
        setPageResult(result);
      } catch (error) {
        console.error('Erro ao carregar as contas: ', error);
      }
    }
    fetchContas();
  }, [page, rowsPerPage]);

  async function handleDelete(id: number) {
    try {
      await deleteConta(id);
      const result: PageResult<Conta> = {
        items: pageResult.items.filter((conta: Conta) => conta.id !== id),
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
    setPage(0);
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
            {pageResult.items.map((conta: Conta) => (
              <TableRow key={conta.id}>
                <TableCell>{conta.id}</TableCell>
                <TableCell>{conta.cliente}</TableCell>
                <TableCell>{conta.numero}</TableCell>
                <TableCell>{conta.agencia}</TableCell>
                <TableCell>{conta.saldo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(conta)} aria-label="Editar">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(conta.id!)}
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
}

export default ListaContas;
