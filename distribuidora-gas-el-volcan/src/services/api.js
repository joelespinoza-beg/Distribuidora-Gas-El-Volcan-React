// src/services/api.js
import axios from 'axios';

export const CLAVE_ACCESS_TOKEN = 'gas-el-volcan-access-token';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1').replace(/\/+$/, ''),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adjunta el JWT automáticamente en cada petición protegida
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(CLAVE_ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normaliza los mensajes de error que devuelve el backend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const datos = error.response?.data;
    const mensaje =
      datos?.message ||
      datos?.error ||
      (error.response ? `Error HTTP ${error.response.status}` : 'No se pudo conectar con el servidor');
    const errorNormalizado = new Error(mensaje);
    if (error.response?.status) {
      errorNormalizado.status = error.response.status;
    }
    return Promise.reject(errorNormalizado);
  }
);