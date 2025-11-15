import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ListaContas from '../../components/conta/ListaContas';
import Navbar from '../../components/navbar/Navbar';
import './Page.css';
import {
  useDeleteConta,
  usePagesContasClientes
} from '../../hooks/useContasClientes';

export default function ContasPage() {
  return (
    <div>
      <Navbar />
      <h1>Listagem de contas</h1>
      <div className="buttons-conta">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contas/nova"
        >
          Nova conta
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contas/saque"
        >
          Saque
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contas/deposito"
        >
          Depósito
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contas/transferencia"
        >
          Transferência
        </Button>
      </div>
      <ListaContas
        pages={usePagesContasClientes}
        remove={useDeleteConta}
        rowsPage={10}
      />
    </div>
  );
}
