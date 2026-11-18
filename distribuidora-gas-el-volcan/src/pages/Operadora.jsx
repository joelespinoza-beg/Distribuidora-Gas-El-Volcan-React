import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaPedidosDelDia from '../components/organisms/ListaPedidosDelDia';
import { usePedidos } from '../context/PedidosContext';
import { repartidores } from '../data/repartidores';
import { useTituloPagina } from '../hooks/useTituloPagina';


function Operadora() {
  const { pedidos, asignar, cambiarEstado } = usePedidos();
  const [asignaciones, setAsignaciones] = useState({});

  useTituloPagina('Operadora: pedidos del día');

  function seleccionarRepartidor({ pedidoId, repartidorId }) {
    setAsignaciones((actual) => ({ ...actual, [pedidoId]: repartidorId }));
  }

  return (
    <PlantillaAdmin>
      <ListaPedidosDelDia
        pedidos={pedidos}
        repartidores={repartidores}
        asignaciones={asignaciones}
        onSeleccionarRepartidor={seleccionarRepartidor}
        onAsignar={({ pedidoId, repartidorId }) => asignar(pedidoId, repartidorId)}
        onCambiarEstado={({ pedidoId, estado }) => cambiarEstado(pedidoId, estado)}
      />
    </PlantillaAdmin>
  );
}

export default Operadora;
