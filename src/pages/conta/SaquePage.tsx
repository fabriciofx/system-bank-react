import { useNavigate } from 'react-router-dom';
import SaqueForm from '../../components/conta/SaqueForm';
import Navbar from '../../components/navbar/Navbar';
import { useSaque } from '../../hooks/useSaque';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import './conta.css';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Saque</h1>
          <SaqueForm
            withdrawal={useSaque}
            clientes={pagesClientes}
            contas={listContas}
            navigate={useNavigate()}
          />
        </div>
      </div>
    </div>
  );
}
