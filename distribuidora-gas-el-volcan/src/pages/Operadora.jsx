import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaPedidosDelDia from '../components/organisms/ListaPedidosDelDia';
import { usePedidos } from '../context/PedidosContext';
import { repartidores } from '../data/repartidores';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Operadora(props) {
  const { pedidos, asignar, cambiarEstado } = usePedidos();
  const [asignaciones, setAsignaciones] = useState({});

  useTituloPagina('Operadora: pedidos del día');

  function seleccionarRepartidor({ pedidoId, repartidorId }) {
    setAsignaciones((actual) => ({ ...actual, [pedidoId]: repartidorId }));
  }

  async function manejarAsignacion({ pedidoId, repartidorId }) {
    try {
      await asignar(pedidoId, repartidorId);
    } catch (error) {
      console.error('Error al asignar:', error.message);
    }
  }

  async function manejarCambioEstado({ pedidoId, estado }) {
    try {
      await cambiarEstado(pedidoId, estado);
    } catch (error) {
      console.error('Error al cambiar estado:', error.message);
    }
  }

  return (
    <PlantillaAdmin>
      <ListaPedidosDelDia
        pedidos={pedidos}
        repartidores={repartidores}
        asignaciones={asignaciones}
        onSeleccionarRepartidor={seleccionarRepartidor}
        onAsignar={manejarAsignacion}
        onCambiarEstado={manejarCambioEstado}
      />
    </PlantillaAdmin>
  );
}

export default Operadora;