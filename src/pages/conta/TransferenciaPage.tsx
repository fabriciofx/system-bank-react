import FormTransferencia from '../../components/conta/FormTransferencia';
import Navbar from '../../components/navbar/Navbar';
import { useTransferencia } from '../../hooks/useTransferencia';
import './conta.css';

export default function TransferenciaPage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Transferência</h1>
          <FormTransferencia transfer={useTransferencia} />
        </div>
      </div>
    </div>
  );
}
