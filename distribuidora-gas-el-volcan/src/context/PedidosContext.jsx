// src/context/PedidosContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  asignarRepartidor,
  cambiarEstado as cambiarEstadoPedido
} from '../services/pedidoService';
import { useAutenticacion } from '../hooks/useAutenticacion';

const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
  const { usuario } = useAutenticacion();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    if (!usuario) {
      setPedidos([]);
      setError('');
      return;
    }
    try {
      setCargando(true);
      const lista = await listarPedidos();
      setPedidos(lista);
      setError('');
    } catch (fallo) {
      setPedidos([]);
      setError(fallo.message || 'No se pudieron cargar los pedidos.');
    } finally {
      setCargando(false);
    }
  }, [usuario]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  async function crear(datos) {
    const nuevo = await crearPedido(datos);
    await recargar();
    return nuevo;
  }

  async function asignar(id, repartidorId) {
    await asignarRepartidor(id, repartidorId);
    await recargar();
  }

  async function cambiarEstado(id, estado) {
    await cambiarEstadoPedido(id, estado);
    await recargar();
  }

  async function buscarPorId(id) {
    return obtenerPedido(id);
  }

  return (
    <PedidosContext.Provider value={{ pedidos, cargando, error, recargar, crear, asignar, cambiarEstado, buscarPorId }}>
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const contexto = useContext(PedidosContext);
  if (contexto === null) {
    throw new Error('usePedidos debe usarse dentro de <PedidosProvider>');
  }
  return contexto;
}