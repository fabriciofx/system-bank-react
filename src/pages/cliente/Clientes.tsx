import { useState } from 'react';
import ListaClientes from '../cliente/ListaClientes';
import type { Cliente } from '../../models/Cliente';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';

function Clientes() {
  const setClienteEdit = useState<Cliente>()[1];

  function handleEdit(cliente: Cliente): void {
    setClienteEdit(cliente);
  }

  return (
    <>
      <Navbar />
      <h1>Listagem de clientes</h1>
      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/clientes/novo"
        >
          Novo cliente
        </Button>
      </div>
      <div>
        <ListaClientes onEdit={handleEdit} />
      </div>
    </>
  );
}

export default Clientes;
