import { useState } from 'react';
import type { Deposito } from '../../models/Deposito';
import Navbar from '../../components/navbar/Navbar';
import FormDeposito from '../../components/conta/FormDeposito';
import './Deposito.css';

function Deposito() {
  const [deposito, setDeposito] = useState<Deposito>();

  function handleSave(): void {
    setDeposito(deposito);
  }

  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-deposito">
          <h1>Depósito</h1>
          <FormDeposito onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default Deposito;
