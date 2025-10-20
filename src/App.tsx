import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';
import FormLogin from './pages/FormLogin';
import NovoCliente from './pages/NovoCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
