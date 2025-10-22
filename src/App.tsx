import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/cliente/Clientes';
import NovoCliente from './pages/cliente/NovoCliente';
import LoginTemplate from './pages/auth/login-template/LoginTemplate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginTemplate />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
