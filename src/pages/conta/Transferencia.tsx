import FormTransferencia from '../../components/conta/FormTransferencia';
import Navbar from '../../components/navbar/Navbar';
import './Transferencia.css';

function Transferencia() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-transferencia">
          <h1>Transferência</h1>
          <FormTransferencia />
        </div>
      </div>
    </div>
  );
}

export default Transferencia;
