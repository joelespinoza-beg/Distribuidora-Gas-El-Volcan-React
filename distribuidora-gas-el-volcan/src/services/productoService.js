

import { productosCatalogo } from '../data/productos';


const CLAVE = 'productos';



function leer() {
  const guardado = localStorage.getItem(CLAVE);

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosCatalogo));
    return [...productosCatalogo];
  }

  return JSON.parse(guardado);
}


function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}


export function listarProductos() {
  return leer();
}


export function obtenerProducto(id) {
  return leer().find((p) => p.id === id) ?? null;
}


export function crearProducto(datos) {
  const lista = leer();

  if (!datos.id) {
    throw new Error('El producto necesita un código');
  }

  if (lista.some((p) => p.id === datos.id)) {
    throw new Error(`Ya existe un producto con el código ${datos.id}`);
  }

  guardar([...lista, datos]);
  return datos;
}


export function actualizarProducto(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios, id: p.id } : p));

  guardar(lista);
  return lista.find((p) => p.id === id) ?? null;
}


export function eliminarProducto(id) {
  guardar(leer().filter((p) => p.id !== id));
}
