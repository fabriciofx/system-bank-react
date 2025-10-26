import { useState } from 'react';
import type { Saque } from '../../models/Saque';
import Navbar from '../../components/navbar/Navbar';
import FormSaque from '../../components/conta/FormSaque';
import './Saque.css';

function Saque() {
  const [saque, setSaque] = useState<Saque>();

  function handleSave(): void {
    setSaque(saque);
  }

  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-saque">
          <h1>Saque</h1>
          <FormSaque onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default Saque;
