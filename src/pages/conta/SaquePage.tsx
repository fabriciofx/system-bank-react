import FormSaque from '../../components/conta/FormSaque';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Saque</h1>
          <FormSaque />
        </div>
      </div>
    </div>
  );
}
