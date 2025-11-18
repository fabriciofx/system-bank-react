import ContaForm from '../../components/conta/ContaForm';
import Navbar from '../../components/navbar/Navbar';
import { useCreateConta, useUpdateConta } from '../../hooks/useConta';
import { clienteById, pagesClientes } from '../../services/ClienteService';
import { contaById } from '../../services/ContaService';
import './conta.css';

export default function EditContaPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Alterando dados da conta</h1>
          <ContaForm
            create={useCreateConta}
            update={useUpdateConta}
            findById={contaById}
            pages={pagesClientes}
            clienteById={clienteById}
            buttonText="Atualizar"
          />
        </div>
      </div>
    </div>
  );
}
