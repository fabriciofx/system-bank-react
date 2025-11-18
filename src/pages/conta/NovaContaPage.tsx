import { useNavigate } from 'react-router-dom';
import NovaContaForm from '../../components/conta/NovaContaForm';
import Navbar from '../../components/navbar/Navbar';
import { useCreateConta } from '../../hooks/useConta';
import { pagesClientes } from '../../services/ClienteService';
import './conta.css';

export default function NovaContaPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Nova conta</h1>
          <NovaContaForm
            create={useCreateConta}
            clientes={pagesClientes}
            navigate={useNavigate()}
          />
        </div>
      </div>
    </div>
  );
}
