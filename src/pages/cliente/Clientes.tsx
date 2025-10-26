import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListaClientes from '../../components/cliente/ListaClientes';
import Navbar from '../../components/navbar/Navbar';
import type { Cliente } from '../../models/Cliente';
import './Clientes.css';

function Clientes() {
  const setClienteEdit = useState<Cliente>()[1];

  function handleEdit(cliente: Cliente): void {
    setClienteEdit(cliente);
  }

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
      <ListaClientes onEdit={handleEdit} />
    </div>
  );
}

export default Clientes;
