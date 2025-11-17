import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import { useCreateCliente, useUpdateCliente } from '../../hooks/useClientes';
import { clienteById } from '../../services/ClienteService';
import './cliente.css';

export default function EditClientePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-cliente">
          <h1>Alterando dados do cliente</h1>
          <FormCliente
            create={useCreateCliente}
            update={useUpdateCliente}
            findById={clienteById}
            buttonText="Atualizar"
          />
        </div>
      </div>
    </div>
  );
}
