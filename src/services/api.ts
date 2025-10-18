import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
