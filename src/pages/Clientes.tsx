import { useState } from 'react';
import ListaClientes from '../components/ListaClientes';
import FormCliente from '../components/FormCliente';
import type { Cliente } from '../models/Cliente';

function Clientes() {
  const [clienteEdit, setClienteEdit] = useState<Cliente>();

  function handleEdit(cliente: Cliente): void {
    setClienteEdit(cliente);
  }

  function handleSave(): void {
    setClienteEdit(clienteEdit);
  }

  return (
    <div>
      <ListaClientes onEdit={handleEdit} />
      <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
    </div>
  );
}

export default Clientes;
