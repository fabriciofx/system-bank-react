import { useState } from 'react';
import FormCliente from './FormCliente';
import type { Cliente } from '../../models/Cliente';
import Navbar from '../../components/navbar/Navbar';

function NovoCliente() {
  const [clienteEdit, setClienteEdit] = useState<Cliente>();

  function handleSave(): void {
    setClienteEdit(clienteEdit);
  }

  return (
    <div>
      <Navbar />
      <h1>Novo cliente</h1>
      <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
    </div>
  );
}

export default NovoCliente;
