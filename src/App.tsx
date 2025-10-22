import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';
import NovoCliente from './pages/NovoCliente';
import LoginTemplate from './pages/LoginTemplate';

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
