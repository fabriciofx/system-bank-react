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
          <img src="assets/logo.png" width="150px" alt="SystemBank logo" />
        </div>
        <div className="login-form">
          <LoginForm login={login} navigate={useNavigate()}></LoginForm>
        </div>
      </div>
    </div>
  );
}
