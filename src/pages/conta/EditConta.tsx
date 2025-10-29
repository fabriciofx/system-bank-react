import FormConta from '../../components/conta/FormConta';
import Navbar from '../../components/navbar/Navbar';
import './BoxConta.css';

const EditConta: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Alterando dados da conta</h1>
          <FormConta />
        </div>
      </div>
    </div>
  );
};

export default EditConta;
