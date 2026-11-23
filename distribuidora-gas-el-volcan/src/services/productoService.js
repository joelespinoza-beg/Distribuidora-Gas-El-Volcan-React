// src/services/productoService.js
import { api } from './api';

export async function listarProductos() {
  const { data } = await api.get('/productos');
  return data;
}

export async function obtenerProducto(id) {
  const { data } = await api.get(`/productos/${id}`);
  return data;
}

export async function crearProducto(datos) {
  const { data } = await api.post('/productos', {
    id: String(datos.id).trim().toUpperCase(),
    categoria: datos.categoria.trim(),
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion?.trim() || '',
    unidad: datos.unidad?.trim() || 'Unidad',
    precioResidencial: Number(datos.precioResidencial),
    precioComercial: Number(datos.precioComercial),
    stock: Number(datos.stock)
  });
  return data;
}

export async function actualizarProducto(id, cambios) {
  const { data } = await api.put(`/productos/${id}`, cambios);
  return data;
}

export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`);
}