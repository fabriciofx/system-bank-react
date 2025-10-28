import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Clientes from './pages/cliente/Clientes';
import EditCliente from './pages/cliente/EditCliente';
import NovoCliente from './pages/cliente/NovoCliente';
import Contas from './pages/conta/Contas';
import Deposito from './pages/conta/Deposito';
import EditConta from './pages/conta/EditConta';
import NovaConta from './pages/conta/NovaConta';
import Saque from './pages/conta/Saque';
import Transferencia from './pages/conta/Transferencia';
import LoginTemplate from './pages/login-template/LoginTemplate';
import Logout from './pages/logout/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginTemplate />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
        <Route path="/clientes/:id" element={<EditCliente />} />
        <Route path="/contas" element={<Contas />} />
        <Route path="/contas/:id" element={<EditConta />} />
        <Route path="/contas/nova" element={<NovaConta />} />
        <Route path="/contas/saque" element={<Saque />} />
        <Route path="/contas/deposito" element={<Deposito />} />
        <Route path="/contas/transferencia" element={<Transferencia />} />
      </Routes>
    </Router>
  );
}

export default App;
