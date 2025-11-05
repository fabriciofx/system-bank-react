import FormConta from '../../components/conta/FormConta';
import Navbar from '../../components/navbar/Navbar';
import { clienteById, pagesClientes } from '../../services/ClienteService';
import {
  contaById,
  createConta,
  updateConta
} from '../../services/ContaService';
import './BoxConta.css';

const NovaConta: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Nova conta</h1>
          <FormConta
            create={createConta}
            update={updateConta}
            findById={contaById}
            pages={pagesClientes}
            clienteById={clienteById}
            buttonText="Criar"
          />
        </div>
      </div>
    </div>
  );
};

export default NovaConta;
