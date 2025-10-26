import Navbar from '../../components/navbar/Navbar';
import FormSaque from '../../components/conta/FormSaque';
import './Saque.css';

function Saque() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-saque">
          <h1>Saque</h1>
          <FormSaque />
        </div>
      </div>
    </div>
  );
}

export default Saque;
