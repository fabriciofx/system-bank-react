import Navbar from '../../components/navbar/Navbar';
import FormDeposito from '../../components/conta/FormDeposito';
import './Deposito.css';

function Deposito() {
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
}

export default Deposito;
