import React, { useEffect, useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ListaPedidosDelDia from '../components/organisms/ListaPedidosDelDia';
import { usePedidos } from '../context/PedidosContext';
import { listarRepartidores } from '../services/repartidorService';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Operadora() {
  const { pedidos, asignar, cambiarEstado, error: errorPedidos } = usePedidos();
  const [repartidores, setRepartidores] = useState([]);
  const [asignaciones, setAsignaciones] = useState({});
  const [error, setError] = useState('');

  useTituloPagina('Operadora: pedidos del día');

  useEffect(() => {
    let activo = true;
    listarRepartidores()
      .then((lista) => {
        if (activo) setRepartidores(lista);
      })
      .catch((fallo) => {
        if (activo) setError(fallo.message);
      });

    return () => {
      activo = false;
    };
  }, []);

  function seleccionarRepartidor({ pedidoId, repartidorId }) {
    setAsignaciones((actual) => ({ ...actual, [pedidoId]: repartidorId }));
  }

  async function manejarAsignacion({ pedidoId, repartidorId }) {
    try {
      await asignar(pedidoId, repartidorId);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  async function manejarCambioEstado({ pedidoId, estado }) {
    try {
      await cambiarEstado(pedidoId, estado);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <PlantillaAdmin>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {errorPedidos && <div className="alert alert-danger" role="alert">{errorPedidos}</div>}
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