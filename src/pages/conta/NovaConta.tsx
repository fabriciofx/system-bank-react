import FormConta from '../../components/conta/FormConta';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

const NovaConta: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Nova conta</h1>
          <FormConta />
        </div>
      </div>
    </div>
  );
};

export default NovaConta;
