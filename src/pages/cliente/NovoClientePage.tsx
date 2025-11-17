import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import { useCreateCliente, useUpdateCliente } from '../../hooks/useClientes';
import { clienteById } from '../../services/ClienteService';
import './cliente.css';

export default function NovoClientePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-cliente">
          <h1>Novo cliente</h1>
          <FormCliente
            create={useCreateCliente}
            update={useUpdateCliente}
            findById={clienteById}
            buttonText="Cadastrar"
          />
        </div>
      </div>
    </div>
  );
}
