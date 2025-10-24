import { useState } from 'react';
import FormCliente from '../../components/cliente/FormCliente';
import type { Cliente } from '../../models/Cliente';
import Navbar from '../../components/navbar/Navbar';
import './NovoCliente.css';

function NovoCliente() {
  const [clienteEdit, setClienteEdit] = useState<Cliente>();

  function handleSave(): void {
    setClienteEdit(clienteEdit);
  }

  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-novo-cliente">
          <h1>Novo cliente</h1>
          <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default NovoCliente;
