import axios, { type AxiosRequestConfig } from 'axios';
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
  async (error) => {
    const setAccess = useAuthStore.getState().setAccess;
    const refresh = useAuthStore.getState().refresh;
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshResponse = await api.post('/token/refresh/', {
          refresh: refresh
        });
        setAccess(refreshResponse.data.access);
        if (config.headers) {
          config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        }
        return api(config);
      } catch (refreshError) {
        console.error('Error to refresh access token: ', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
