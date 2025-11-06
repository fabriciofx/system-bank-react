import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ListaContas from '../../components/conta/ListaContas';
import Navbar from '../../components/navbar/Navbar';
import './Contas.css';
import { pagesContasClientes } from '../../services/ContaClienteService';
import { deleteConta } from '../../services/ContaService';

const Contas: React.FC = () => {
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
      <ListaContas pages={pagesContasClientes} remove={deleteConta} />
    </div>
  );
};

export default Contas;
