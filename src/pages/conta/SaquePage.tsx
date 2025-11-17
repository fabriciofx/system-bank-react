import FormSaque from '../../components/conta/FormSaque';
import Navbar from '../../components/navbar/Navbar';
import { useSaque } from '../../hooks/useSaque';
import './conta.css';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className="box-com-titulo">
        <div className="box-conta">
          <h1>Saque</h1>
          <FormSaque withdrawal={useSaque} />
        </div>
      </div>
    </div>
  );
}
