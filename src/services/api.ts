import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const access = useAuthStore.getState().access;
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      const refresh = useAuthStore.getState().refresh;
      if (refresh) {
        const refreshResponse = await api.post('/token/refresh/', {
          refresh: refresh
        });
        const setAccess = useAuthStore.getState().setAccess;
        setAccess(refreshResponse.data.access);
        if (config.headers) {
          config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        }
      } else {
        throw new Error('Verifique se o username e password estão corretos');
      }
      return api(config);
    }
    return Promise.reject(error);
  }
);

export default api;
