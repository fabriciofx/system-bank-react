import axios, { type AxiosRequestConfig } from 'axios';
import { STORAGE } from './AuthService';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const accessToken = STORAGE.value('access_token')[0] ?? '';
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshToken = STORAGE.value('refresh_token')[0] ?? '';
        const refreshResponse = await api.post('/token/refresh/', refreshToken);
        STORAGE.store('access_token', refreshResponse.data.access);
        config.headers!.Authorization = `Bearer ${refreshResponse.data.access}`;
        return api(config);
      } catch (refreshError) {
        console.error('Error to refresh access token: ', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
