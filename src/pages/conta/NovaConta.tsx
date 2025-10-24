import { useState } from 'react';
import FormConta from './FormConta';
import type { Conta } from '../../models/Conta';
import Navbar from '../../components/navbar/Navbar';
import './NovaConta.css';

function NovaConta() {
  const [contaEdit, setContaEdit] = useState<Conta>();

  function handleSave(): void {
    setContaEdit(contaEdit);
  }

  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-nova-conta">
          <h1>Nova conta</h1>
          <FormConta contaAtual={contaEdit} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default NovaConta;
