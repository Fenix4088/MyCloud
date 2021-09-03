import axios from 'axios';
import { LS } from '../utils/localStorage';

export const $instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export const $instanceWithToken = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

$instanceWithToken.interceptors.request.use(
  (config) => {
    const token = LS.get('cloudToken');
    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
