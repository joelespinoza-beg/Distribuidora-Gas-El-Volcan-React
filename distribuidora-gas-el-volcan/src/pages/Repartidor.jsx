import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaEntregas from '../components/organisms/ListaEntregas';
import { usePedidos } from '../context/PedidosContext';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Repartidor() {
  const { pedidos, cambiarEstado, error: errorPedidos } = usePedidos();
  const { usuario } = useAutenticacion();
  const [errorAccion, setErrorAccion] = useState('');

  useTituloPagina('Repartidor: mis entregas');

  async function manejarCambioEstado({ pedidoId, estado }) {
    try {
      await cambiarEstado(pedidoId, estado);
      setErrorAccion('');
    } catch (error) {
      setErrorAccion(error.message);
    }
  }

  return (
    <PlantillaAdmin>
      {errorPedidos && <div className="alert alert-danger" role="alert">{errorPedidos}</div>}
      {errorAccion && <div className="alert alert-danger" role="alert">{errorAccion}</div>}

      <ListaEntregas
        pedidos={pedidos}
        repartidorId={usuario?.repartidorCodigo}
        onCambiarEstado={manejarCambioEstado}
      />
    </PlantillaAdmin>
  );
}

export default Repartidor;