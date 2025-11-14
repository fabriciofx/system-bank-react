import FormDeposito from '../../components/conta/FormDeposito';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

export default function Deposito() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Depósito</h1>
          <FormDeposito />
        </div>
      </div>
    </div>
  );
}
