import { useNavigate, useParams } from 'react-router-dom';
import EditClienteForm from '../../components/cliente/EditClienteForm';
import Navbar from '../../components/navbar/Navbar';
import { useUpdateCliente } from '../../hooks/useClientes';
import { clienteById } from '../../services/ClienteService';
import './cliente.css';

export default function EditClientePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-cliente">
          <h1>Alterando dados do cliente</h1>
          <EditClienteForm
            update={useUpdateCliente}
            findById={clienteById}
            navigate={useNavigate()}
            params={useParams()}
          />
        </div>
      </div>
    </div>
  );
}
