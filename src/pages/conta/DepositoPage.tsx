import FormDeposito from '../../components/conta/FormDeposito';
import Navbar from '../../components/navbar/Navbar';
import { useDeposito } from '../../hooks/useDeposito';
import './conta.css';

export default function DepositoPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Depósito</h1>
          <FormDeposito deposit={useDeposito} />
        </div>
      </div>
    </div>
  );
}
