import { useState } from 'react';
import FormCliente from './FormCliente';
import type { Cliente } from '../../models/Cliente';

function NovoCliente() {
  const [clienteEdit, setClienteEdit] = useState<Cliente>();

  function handleSave(): void {
    setClienteEdit(clienteEdit);
  }

  return (
    <div>
      <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
    </div>
  );
}

export default NovoCliente;
