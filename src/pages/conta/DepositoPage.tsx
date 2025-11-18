import { useNavigate } from 'react-router-dom';
import DepositoForm from '../../components/conta/DepositoForm';
import Navbar from '../../components/navbar/Navbar';
import { useDeposito } from '../../hooks/useDeposito';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import './conta.css';

export default function DepositoPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Depósito</h1>
          <DepositoForm
            deposit={useDeposito}
            clientes={pagesClientes}
            contas={listContas}
            navigate={useNavigate()}
          />
        </div>
      </div>
    </div>
  );
}
