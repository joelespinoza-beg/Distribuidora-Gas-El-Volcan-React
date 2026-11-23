import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaEntregas from '../components/organisms/ListaEntregas';
import CampoSelector from '../components/molecules/CampoSelector';
import { usePedidos } from '../context/PedidosContext';
import { repartidores } from '../data/repartidores';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Repartidor(props) {
  const { pedidos, cambiarEstado } = usePedidos();
  const [repartidorId, setRepartidorId] = useState(repartidores[0].id);

  useTituloPagina('Repartidor: mis entregas');

  const opciones = repartidores.map((repartidor) => ({
    valor: repartidor.id,
    texto: repartidor.nombre
  }));

  async function manejarCambioEstado({ pedidoId, estado }) {
    try {
      await cambiarEstado(pedidoId, estado);
    } catch (error) {
      console.error('Error al actualizar entrega:', error.message);
    }
  }

  return (
    <PlantillaAdmin>
      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <CampoSelector
            id="repartidor-actual"
            name="repartidor"
            label="¿Quién eres?"
            value={repartidorId}
            onChange={(evento) => setRepartidorId(evento.target.value)}
            opciones={opciones}
          />
        </div>
      </div>

      <ListaEntregas
        pedidos={pedidos}
        repartidorId={repartidorId}
        onCambiarEstado={manejarCambioEstado}
      />
    </PlantillaAdmin>
  );
}

export default Repartidor;