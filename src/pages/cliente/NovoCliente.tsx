import FormCliente from '../../components/cliente/FormCliente';
import Navbar from '../../components/navbar/Navbar';
import './NovoCliente.css';

const NovoCliente: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-novo-cliente">
          <h1>Novo cliente</h1>
          <FormCliente submitText="Cadastrar" />
        </div>
      </div>
    </div>
  );
};

export default NovoCliente;
