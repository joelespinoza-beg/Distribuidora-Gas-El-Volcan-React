// src/services/pedidoService.js
import { api } from './api';

export const ESTADOS_PEDIDO = ['pendiente', 'asignado', 'en_camino', 'entregado'];

export async function listarPedidos() {
  const { data } = await api.get('/pedidos');
  return data;
}

export async function obtenerPedido(id) {
  const { data } = await api.get(`/pedidos/${id}`);
  return data;
}

export async function crearPedido(datos) {
  // DTO limpio: el backend calcula totales y descuenta stock
  const payload = {
    cliente: datos.cliente.trim(),
    telefono: datos.telefono.trim(),
    direccion: datos.direccion.trim(),
    zona: datos.zona,
    tipoCliente: datos.tipoCliente || 'residencial',
    metodoPago: datos.metodoPago || 'efectivo al recibir',
    productos: datos.productos.map((item) => ({
      id: item.id,
      cantidad: Number(item.cantidad)
    }))
  };
  const { data } = await api.post('/pedidos', payload);
  return data;
}

export async function asignarRepartidor(id, repartidorId) {
  const { data } = await api.patch(`/pedidos/${id}/asignar`, { repartidorId });
  return data;
}

export async function cambiarEstado(id, estado) {
  const { data } = await api.patch(`/pedidos/${id}/estado`, { estado });
  return data;
}