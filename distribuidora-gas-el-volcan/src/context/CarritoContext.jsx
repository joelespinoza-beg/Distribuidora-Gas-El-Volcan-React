import { createContext, useContext, useState } from 'react';
import {
  agregarAlCarrito,
  cambiarCantidadCarrito,
  listarCarrito,
  quitarDelCarrito,
  vaciarCarrito
} from '../services/carritoService';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [lineas, setLineas] = useState(() => listarCarrito());

  function agregar(producto, precio, tipoCliente) {
    agregarAlCarrito(producto, precio, tipoCliente);
    setLineas(listarCarrito());
  }

  function cambiarCantidad(id, cantidad) {
    setLineas(cambiarCantidadCarrito(id, cantidad));
  }

  function quitar(id) {
    setLineas(quitarDelCarrito(id));
  }

  function vaciar() {
    vaciarCarrito();
    setLineas([]);
  }

  const cantidadTotal = lineas.reduce((total, linea) => total + linea.cantidad, 0);
  const total = lineas.reduce((suma, linea) => suma + linea.precio * linea.cantidad, 0);

  return (
    <CarritoContext.Provider value={{
      lineas,
      cantidadTotal,
      total,
      agregar,
      cambiarCantidad,
      quitar,
      vaciar
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (contexto === null) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  }
  return contexto;
}
