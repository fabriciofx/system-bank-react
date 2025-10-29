import FormSaque from '../../components/conta/FormSaque';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

const Saque: React.FC = () => {
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
};

export default Saque;
