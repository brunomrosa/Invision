import axios from 'axios';

const api = axios.create({
  baseURL: 'http://mock/',
});

export default api;
