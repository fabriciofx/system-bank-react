import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import ListaContas from './ListaContas';
import type { Conta } from '../../models/Conta';

function Contas() {
  const setContaEdit = useState<Conta>()[1];

  function handleEdit(conta: Conta): void {
    setContaEdit(conta);
  }

  return (
    <div>
      <Navbar />
      <h1>Listagem de contas</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/contas/novo"
      >
        Nova conta
      </Button>
      <ListaContas onEdit={handleEdit} />
    </div>
  );
}

export default Contas;
