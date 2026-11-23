// src/context/ProductosContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    try {
      setCargando(true);
      const lista = await listarProductos();
      setProductos(lista);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  async function crear(datos) {
    const nuevo = await crearProducto(datos);
    await recargar();
    return nuevo;
  }

  async function actualizar(id, cambios) {
    const actualizado = await actualizarProducto(id, cambios);
    await recargar();
    return actualizado;
  }

  async function eliminar(id) {
    await eliminarProducto(id);
    await recargar();
  }

  return (
    <ProductosContext.Provider value={{ productos, cargando, error, recargar, crear, actualizar, eliminar }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (contexto === null) {
    throw new Error('useProductos debe usarse dentro de <ProductosProvider>');
  }
  return contexto;
}