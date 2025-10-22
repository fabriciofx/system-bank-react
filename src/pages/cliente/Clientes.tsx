import { useState } from 'react';
import ListaClientes from './ListaClientes';
import type { Cliente } from '../../models/Cliente';

function Clientes() {
  const setClienteEdit = useState<Cliente>()[1];

  function handleEdit(cliente: Cliente): void {
    setClienteEdit(cliente);
  }

  return (
    <div>
      <ListaClientes onEdit={handleEdit} />
    </div>
  );
}

export default Clientes;
