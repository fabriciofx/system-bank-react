import { useNavigate } from 'react-router-dom';
import FormLogin from '../../components/login/FormLogin';
import { login } from '../../services/AuthService';
import './Page.css';

export default function LoginTemplatePage() {
  return (
    <div className="container">
      <div className="form">
        <div className="logo">
          <span className="title">SystemBank</span>
          <img src="assets/logo.png" width="150px" alt="SystemBank logo" />
        </div>
        <div className="login-form">
          <FormLogin login={login} navigate={useNavigate()}></FormLogin>
        </div>
      </div>
    </div>
  );
}
