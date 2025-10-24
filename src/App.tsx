import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Clientes from './pages/cliente/Clientes';
import NovoCliente from './pages/cliente/NovoCliente';
import LoginTemplate from './pages/auth/login-template/LoginTemplate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<LoginTemplate />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
