import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import {
  clienteById,
  createCliente,
  updateCliente
} from '../../services/ClienteService';
import './NovoCliente.css';

const EditCliente: React.FC = () => {
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
};

export default EditCliente;
