import FormTransferencia from '../../components/conta/FormTransferencia';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

const Transferencia: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Transferência</h1>
          <FormTransferencia />
        </div>
      </div>
    </div>
  );
};

export default Transferencia;
