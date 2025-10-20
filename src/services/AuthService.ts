import { type NavigateFunction } from 'react-router-dom';
import api from './api';
import type { Credentials } from '../models/Credentials';
import type { AuthTokens } from '../models/Auth';
import { MemoryStorage } from '../core/storage';

export const STORAGE = new MemoryStorage();

export async function login(credentials: Credentials): Promise<boolean> {
  try {
    const response = await api.post<AuthTokens>('/token/', credentials);
    if (response.data.access) {
      STORAGE.store('access_token', response.data.access);
      STORAGE.store('refresh_token', response.data.refresh);
      return true;
    }
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
  return false;
}

export async function logout(): Promise<void> {
  STORAGE.remove('access_token');
  STORAGE.remove('refresh_token');
}
