import type { AuthTokens } from '../models/Auth';
import type { Credentials } from '../models/Credentials';
import { useAuthStore } from '../store/authStore';
import api from './api';

export async function login(credentials: Credentials): Promise<boolean> {
  try {
    const setAccess = useAuthStore.getState().setAccess;
    const setRefresh = useAuthStore.getState().setRefresh;
    const response = await api.post<AuthTokens>('/token/', credentials);
    if (response.data.access) {
      setAccess(response.data.access);
      setRefresh(response.data.refresh);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Erro ao autenticar o usuário: ${error}`);
    throw error;
  }
}

export async function logout(): Promise<void> {
  const setAccess = useAuthStore.getState().setAccess;
  const setRefresh = useAuthStore.getState().setRefresh;
  setAccess('');
  setRefresh('');
}
