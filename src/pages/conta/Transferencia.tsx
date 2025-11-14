import FormTransferencia from '../../components/conta/FormTransferencia';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

export default function Transferencia() {
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
}
