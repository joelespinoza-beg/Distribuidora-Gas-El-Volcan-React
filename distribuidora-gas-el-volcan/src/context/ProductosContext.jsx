import { createContext, useContext, useState } from 'react';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService';

// Un context es una caja compartida: cualquier componente la abre y todos ven lo mismo.
const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  // La lista vive en el estado de React; el service la guarda en localStorage.
  // Pasar una función a useState hace que se lea del service solo la primera vez.
  const [productos, setProductos] = useState(() => listarProductos());

  function crear(datos) {
    const nuevo = crearProducto(datos); // si el código está repetido, aquí se lanza el error
    setProductos(listarProductos());
    return nuevo;
  }

  function actualizar(id, cambios) {
    const actualizado = actualizarProducto(id, cambios);
    setProductos(listarProductos());
    return actualizado;
  }

  function eliminar(id) {
    eliminarProducto(id);
    setProductos(listarProductos());
  }

  const valor = { productos, crear, actualizar, eliminar };

  return <ProductosContext.Provider value={valor}>{children}</ProductosContext.Provider>;
}

// Hook propio para abrir la caja desde cualquier componente
export function useProductos() {
  const contexto = useContext(ProductosContext);

  if (contexto === null) {
    throw new Error('useProductos debe usarse dentro de <ProductosProvider>');
  }

  return contexto;
}
