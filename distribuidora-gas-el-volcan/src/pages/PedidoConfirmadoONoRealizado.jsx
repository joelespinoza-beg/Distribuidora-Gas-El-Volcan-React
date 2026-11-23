import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { usePedidos } from '../context/PedidosContext';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function PedidoConfirmadoONoRealizado(props) {
  const { id } = useParams();
  const { buscarPorId } = usePedidos();
  
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useTituloPagina('Resultado del pedido');

  useEffect(() => {
    if (!id) {
      setCargando(false);
      return;
    }
    
    buscarPorId(id)
      .then(setPedido)
      .catch(() => setPedido(null))
      .finally(() => setCargando(false));
  }, [id, buscarPorId]);

  if (cargando) {
    return (
      <PlantillaPublica>
        <div className="container py-5 text-center">
          <p>Cargando información del pedido...</p>
        </div>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <div className="container py-5 text-center">
        {pedido ? (
          <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
            <h1 className="h3 text-success mb-3">¡Pedido Confirmado!</h1>
            <p className="mb-4">
              Tu pedido <strong>#{pedido.id}</strong> ha sido ingresado correctamente.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to={`/seguimiento/${pedido.id}`}>
                <Boton texto="Seguir mi pedido" variante="primary" />
              </Link>
              <Link to="/">
                <Boton texto="Volver al inicio" variante="outline-secondary" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
            <h1 className="h3 text-danger mb-3">Pedido no encontrado</h1>
            <p className="mb-4">No logramos encontrar el pedido que buscas. Verifica el ID ingresado.</p>
            <Link to="/">
              <Boton texto="Volver al inicio" variante="primary" />
            </Link>
          </div>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default PedidoConfirmadoONoRealizado;