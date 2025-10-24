import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import ListaContas from '../../components/conta/ListaContas';
import type { ContaCliente } from '../../models/ContaCliente';

function Contas() {
  const setContaEdit = useState<ContaCliente>()[1];

  function handleEdit(contaCliente: ContaCliente): void {
    setContaEdit(contaCliente);
  }

  return (
    <div>
      <Navbar />
      <h1>Listagem de contas</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/contas/nova"
      >
        Nova conta
      </Button>
      <ListaContas onEdit={handleEdit} />
    </div>
  );
}

export default Contas;
