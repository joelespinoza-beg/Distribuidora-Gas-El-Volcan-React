import { createContext, useContext, useState } from 'react';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService';


const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {


  const [productos, setProductos] = useState(() => listarProductos());

  function crear(datos) {
    const nuevo = crearProducto(datos);
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


export function useProductos() {
  const contexto = useContext(ProductosContext);

  if (contexto === null) {
    throw new Error('useProductos debe usarse dentro de <ProductosProvider>');
  }

  return contexto;
}
