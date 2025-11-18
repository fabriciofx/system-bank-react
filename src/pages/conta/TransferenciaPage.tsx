import { useNavigate } from 'react-router-dom';
import FormTransferencia from '../../components/conta/TransferenciaForm';
import Navbar from '../../components/navbar/Navbar';
import { useTransferencia } from '../../hooks/useTransferencia';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import './conta.css';

export default function TransferenciaPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Transferência</h1>
          <FormTransferencia
            transfer={useTransferencia}
            clientes={pagesClientes}
            contas={listContas}
            navigate={useNavigate()}
          />
        </div>
      </div>
    </div>
  );
}
