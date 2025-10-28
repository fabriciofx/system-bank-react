import FormConta from '../../components/conta/FormConta';
import Navbar from '../../components/navbar/Navbar';
import './EditConta.css';

const EditConta: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-edit-conta">
          <h1>Alterando dados da conta</h1>
          <FormConta />
        </div>
      </div>
    </div>
  );
};

export default EditConta;
