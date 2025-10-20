import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !request._retry) {
      request._retry = true;
      const accessToken = localStorage.getItem('access_token');
      if (accessToken && request.headers) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(request);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
