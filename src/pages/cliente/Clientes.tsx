import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ListaClientes from '../../components/cliente/ListaClientes';
import Navbar from '../../components/navbar/Navbar';
import './Clientes.css';

const Clientes: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Listagem de clientes</h1>
      <div className="buttons-clientes">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/clientes/novo"
        >
          Novo cliente
        </Button>
      </div>
      <ListaClientes />
    </div>
  );
};

export default Clientes;
