import { type NavigateFunction } from 'react-router-dom';
import api from './api';
import type { Credentials } from '../models/Credentials';
import type { AuthTokens } from '../models/Auth';

export async function login(
  credentials: Credentials,
  navigate: NavigateFunction
): Promise<void> {
  try {
    const response = await api.post<AuthTokens>('/token/', credentials);
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      await navigate('/cliente');
    }
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
}

export async function logout(navigate: NavigateFunction): Promise<void> {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  await navigate('/auth');
}
