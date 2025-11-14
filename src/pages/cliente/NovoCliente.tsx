import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import {
  clienteById,
  createCliente,
  updateCliente
} from '../../services/ClienteService';
import './NovoCliente.css';

export default function NovoCliente() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-novo-cliente">
          <h1>Novo cliente</h1>
          <FormCliente
            create={createCliente}
            update={updateCliente}
            findById={clienteById}
            buttonText="Cadastrar"
          />
        </div>
      </div>
    </div>
  );
}
