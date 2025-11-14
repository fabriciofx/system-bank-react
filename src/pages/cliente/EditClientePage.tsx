import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import {
  clienteById,
  createCliente,
  updateCliente
} from '../../services/ClienteService';
import './NovoCliente.css';

export default function EditClientePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-edit-cliente">
          <h1>Alterando dados do cliente</h1>
          <FormCliente
            create={createCliente}
            update={updateCliente}
            findById={clienteById}
            buttonText="Atualizar"
          />
        </div>
      </div>
    </div>
  );
}
