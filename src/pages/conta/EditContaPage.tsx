import { useNavigate, useParams } from 'react-router-dom';
import EditContaForm from '../../components/conta/EditContaForm';
import Navbar from '../../components/navbar/Navbar';
import { useUpdateConta } from '../../hooks/useConta';
import { clienteById } from '../../services/ClienteService';
import { contaById } from '../../services/ContaService';
import './conta.css';

export default function EditContaPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Alterando dados da conta</h1>
          <EditContaForm
            update={useUpdateConta}
            findById={contaById}
            clienteById={clienteById}
            navigate={useNavigate()}
            params={useParams()}
          />
        </div>
      </div>
    </div>
  );
}
