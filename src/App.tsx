import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Clientes from './pages/cliente/Clientes';
import NovoCliente from './pages/cliente/NovoCliente';
import LoginTemplate from './pages/auth/login-template/LoginTemplate';
import Contas from './pages/conta/Contas';
import NovaConta from './pages/conta/NovaConta';

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
      </Routes>
    </Router>
  );
}

export default App;
