import { useState } from 'react';
import ListaClientes from '../components/ListaClientes';
import FormCliente from '../components/FormCliente';
import type { Cliente } from '../models/cliente';

const Clientes = () => {
  const [clienteEdit, setClienteEdit] = useState<Cliente>();

  const handleEdit = (cliente: Cliente) => {
    setClienteEdit(cliente);
  };

  const handleSave = () => {
    setClienteEdit();
  };

  return (
    <div>
      <ListaClientes onEdit={handleEdit} />
      <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
    </div>
  );
};

export default Clientes;
