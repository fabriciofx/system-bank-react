import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Clientes from './pages/cliente/Clientes';
import NovoCliente from './pages/cliente/NovoCliente';
import Contas from './pages/conta/Contas';
import Deposito from './pages/conta/Deposito';
import NovaConta from './pages/conta/NovaConta';
import Saque from './pages/conta/Saque';
import LoginTemplate from './pages/login-template/LoginTemplate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginTemplate />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
        <Route path="/contas" element={<Contas />} />
        <Route path="/contas/nova" element={<NovaConta />} />
        <Route path="/contas/saque" element={<Saque />} />
        <Route path="/contas/deposito" element={<Deposito />} />
      </Routes>
    </Router>
  );
}

export default App;
