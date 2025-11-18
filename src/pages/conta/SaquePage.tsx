import SaqueForm from '../../components/conta/SaqueForm';
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
          <SaqueForm withdrawal={useSaque} />
        </div>
      </div>
    </div>
  );
}
