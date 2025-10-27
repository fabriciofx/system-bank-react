import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListaContas from '../../components/conta/ListaContas';
import Navbar from '../../components/navbar/Navbar';
import type { ContaCliente } from '../../models/ContaCliente';
import './Contas.css';

const Contas: React.FC = () => {
  const setContaEdit = useState<ContaCliente>()[1];

  function handleEdit(contaCliente: ContaCliente): void {
    setContaEdit(contaCliente);
  }

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
      <ListaContas onEdit={handleEdit} />
    </div>
  );
};

export default Contas;
