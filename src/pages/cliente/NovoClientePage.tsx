import { useNavigate } from 'react-router-dom';
import NovoClienteForm from '../../components/cliente/NovoClienteForm';
import Navbar from '../../components/navbar/Navbar';
import { useCreateCliente } from '../../hooks/useClientes';
import './cliente.css';

export default function NovoClientePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-cliente">
          <h1>Novo cliente</h1>
          <NovoClienteForm create={useCreateCliente} navigate={useNavigate()} />
        </div>
      </div>
    </div>
  );
}
