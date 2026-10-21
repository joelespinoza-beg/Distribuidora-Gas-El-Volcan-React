import { createContext, useContext, useState } from 'react';
import {
  listarPedidos,
  crearPedido,
  asignarRepartidor,
  cambiarEstado as cambiarEstadoPedido
} from '../services/pedidoService';

const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => listarPedidos());

  function crear(datos) {
    const nuevo = crearPedido(datos);
    setPedidos(listarPedidos());
    return nuevo;
  }

  function asignar(id, repartidorId) {
    asignarRepartidor(id, repartidorId);
    setPedidos(listarPedidos());
  }

  function cambiarEstado(id, estado) {
    cambiarEstadoPedido(id, estado);
    setPedidos(listarPedidos());
  }

  function obtener(id) {
    return pedidos.find((pedido) => pedido.id === id) ?? null;
  }

  const valor = { pedidos, crear, asignar, cambiarEstado, obtener };

  return <PedidosContext.Provider value={valor}>{children}</PedidosContext.Provider>;
}

export function usePedidos() {
  const contexto = useContext(PedidosContext);

  if (contexto === null) {
    throw new Error('usePedidos debe usarse dentro de <PedidosProvider>');
  }

  return contexto;
}
