import FormDeposito from '../../components/conta/FormDeposito';
import Navbar from '../../components/navbar/Navbar';
import './Deposito.css';

const Deposito: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-deposito">
          <h1>Depósito</h1>
          <FormDeposito />
        </div>
      </div>
    </div>
  );
};

export default Deposito;
