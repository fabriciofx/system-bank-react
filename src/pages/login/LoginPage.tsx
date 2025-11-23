import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login/LoginForm';
import { login } from '../../services/AuthService';
import './login.css';

export default function LoginPage() {
  return (
    <div className="container">
      <div className="form">
        <div className="logo">
          <span className="title">SystemBank</span>
          <img src="/assets/logo.png" alt="SystemBank logo" />
        </div>
        <LoginForm login={login} navigate={useNavigate()}></LoginForm>
      </div>
    </div>
  );
}
