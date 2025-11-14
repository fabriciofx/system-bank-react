import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { YesNoMessage } from '../../components/message/Message';
import { logout } from '../../services/AuthService';

export default function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let ativo = true;
    (async () => {
      const answer = await new YesNoMessage(
        'Sair',
        'Deseja realmente sair do sistema?'
      ).show();
      if (!ativo) {
        return;
      }
      if (answer.yes()) {
        logout();
        navigate('/auth');
      } else {
        navigate(-1);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [navigate]);
  return null;
}
