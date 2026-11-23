// src/services/usuarioService.js
import { api, CLAVE_ACCESS_TOKEN } from './api';

export async function registrarUsuario({ nombre, email, clave }) {
  const { data } = await api.post('/auth/register', {
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    clave
  });
  return data;
}

export async function autenticar({ email, clave }) {
  const { data } = await api.post('/auth/login', {
    email: email.trim().toLowerCase(),
    clave
  });
  return data;
}

export async function obtenerPerfil() {
  const { data } = await api.get('/auth/me');
  return data;
}

// Endpoints para el CRUD de Usuarios exigido en la rúbrica EP3
export async function listarUsuarios() {
  const { data } = await api.get('/usuarios');
  return data;
}

export async function crearUsuarioAdmin(datos) {
  const { data } = await api.post('/usuarios', {
    nombre: datos.nombre.trim(),
    email: datos.email.trim().toLowerCase(),
    clave: datos.clave,
    rol: datos.rol
  });
  return data;
}

export async function actualizarUsuario(id, cambios) {
  const { data } = await api.put(`/usuarios/${id}`, cambios);
  return data;
}

export async function eliminarUsuario(id) {
  await api.delete(`/usuarios/${id}`);
}

export function leerAccessToken() {
  return localStorage.getItem(CLAVE_ACCESS_TOKEN);
}

export function guardarAccessToken(token) {
  localStorage.setItem(CLAVE_ACCESS_TOKEN, token);
}

export function eliminarAccessToken() {
  localStorage.removeItem(CLAVE_ACCESS_TOKEN);
}