import FormConta from '../../components/conta/FormConta';
import Navbar from '../../components/navbar/Navbar';
import { clienteById, pagesClientes } from '../../services/ClienteService';
import {
  contaById,
  createConta,
  updateConta
} from '../../services/ContaService';
import './BoxConta.css';

export default function EditConta() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Alterando dados da conta</h1>
          <FormConta
            create={createConta}
            update={updateConta}
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
