import FormLogin from '../../components/login-form/FormLogin';
import './LoginTemplate.css';

function LoginTemplate() {
  return (
    <div className="container">
      <div className="form">
        <div className="logo">
          <span className="title">SystemBank</span>
          <img src="assets/logo.png" width="150px" alt="SystemBank logo" />
        </div>
        <div className="login-form">
          <FormLogin></FormLogin>
        </div>
      </div>
    </div>
  );
}

export default LoginTemplate;
