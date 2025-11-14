import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import ClientesPage from './pages/cliente/ClientesPage';
import EditClientePage from './pages/cliente/EditClientePage';
import NovoClientePage from './pages/cliente/NovoClientePage';
import ContasPage from './pages/conta/ContasPage';
import DepositoPage from './pages/conta/DepositoPage';
import EditContaPage from './pages/conta/EditContaPage';
import NovaContaPage from './pages/conta/NovaContaPage';
import SaquePage from './pages/conta/SaquePage';
import TransferenciaPage from './pages/conta/TransferenciaPage';
import LoginTemplatePage from './pages/login-template/LoginTemplatePage';
import LogoutPage from './pages/logout/LogoutPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<LoginTemplatePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/novo" element={<NovoClientePage />} />
          <Route path="/clientes/:id" element={<EditClientePage />} />
          <Route path="/contas" element={<ContasPage />} />
          <Route path="/contas/:id" element={<EditContaPage />} />
          <Route path="/contas/nova" element={<NovaContaPage />} />
          <Route path="/contas/saque" element={<SaquePage />} />
          <Route path="/contas/deposito" element={<DepositoPage />} />
          <Route path="/contas/transferencia" element={<TransferenciaPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
