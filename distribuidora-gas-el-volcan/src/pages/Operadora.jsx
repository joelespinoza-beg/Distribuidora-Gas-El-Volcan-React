import React from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaPedidosDelDia from '../components/organisms/ListaPedidosDelDia';
import { usePedidos } from '../context/PedidosContext';
import { repartidores } from '../data/repartidores';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página de la operadora: ve los pedidos, asigna repartidor y cambia estados.
function Operadora() {
  const { pedidos, asignar, cambiarEstado } = usePedidos();

  useTituloPagina('Operadora: pedidos del día');

  return (
    <PlantillaAdmin>
      <ListaPedidosDelDia
        pedidos={pedidos}
        repartidores={repartidores}
        onAsignar={({ pedidoId, repartidorId }) => asignar(pedidoId, repartidorId)}
        onCambiarEstado={({ pedidoId, estado }) => cambiarEstado(pedidoId, estado)}
      />
    </PlantillaAdmin>
  );
}

export default Operadora;
