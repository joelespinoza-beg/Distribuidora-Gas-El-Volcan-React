import { api } from './api';

export async function obtenerPerfilCliente() {
  const { data } = await api.get('/clientes/me');
  return data;
}

export async function actualizarPerfilCliente(datos) {
  const { data } = await api.patch('/clientes/me', datos);
  return data;
}
