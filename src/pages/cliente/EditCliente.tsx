import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import './NovoCliente.css';

const EditCliente: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-edit-cliente">
          <h1>Alterando dados do cliente</h1>
          <FormCliente submitText="Atualizar" />
        </div>
      </div>
    </div>
  );
};

export default EditCliente;
