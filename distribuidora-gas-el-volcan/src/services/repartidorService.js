import { api } from './api';

export async function listarRepartidores() {
  const { data } = await api.get('/repartidores');
  return data;
}
