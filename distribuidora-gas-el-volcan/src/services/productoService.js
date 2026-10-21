// productoService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de productos.
// Son funciones de JavaScript puro: no usan React, así que se pueden probar solas.
import { productosCatalogo } from '../data/productos';

// Nombre bajo el que se guarda la lista en localStorage
const CLAVE = 'productos';

// Devuelve la lista actual. La primera vez (cuando no hay nada guardado)
// guarda los datos de partida del catálogo.
function leer() {
  const guardado = localStorage.getItem(CLAVE);

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosCatalogo));
    return [...productosCatalogo];
  }

  return JSON.parse(guardado);
}

// Reemplaza lo guardado por la lista nueva
function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ: todos los productos
export function listarProductos() {
  return leer();
}

// READ: un producto por su código (o null si no existe)
export function obtenerProducto(id) {
  return leer().find((p) => p.id === id) ?? null;
}

// CREATE: agrega un producto nuevo. El código (id) es obligatorio y no puede repetirse.
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

// UPDATE: cambia solo los campos indicados en "cambios" (el código no se modifica)
export function actualizarProducto(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios, id: p.id } : p));

  guardar(lista);
  return lista.find((p) => p.id === id) ?? null;
}

// DELETE: quita el producto con ese código
export function eliminarProducto(id) {
  guardar(leer().filter((p) => p.id !== id));
}
