import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: resultado del pedido.
//   /pedido/resultado/:id  -> pedido confirmado (se busca por su número)
//   /pedido/resultado      -> pedido no realizado (el motivo llega en location.state)
function PedidoConfirmadoONoRealizado() {
  const navigate = useNavigate();
  const params = useParams();
  const ubicacion = useLocation();
  const { obtener } = usePedidos();

  const pedido = params.id ? obtener(Number(params.id)) : null;

  useTituloPagina(pedido ? 'Pedido confirmado' : 'Pedido no realizado');

  if (!pedido) {
    const motivo = ubicacion.state?.motivo ?? 'No encontramos el pedido que buscas.';

    return (
      <PlantillaPublica>
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            <h2 className="h4 alert-heading">No pudimos registrar tu pedido</h2>
            <p className="mb-0">{motivo}</p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Boton texto="Intentar de nuevo" onClick={() => navigate('/pedido/nuevo')} />
            <Boton texto="Volver al inicio" variante="outline-secondary" onClick={() => navigate('/')} />
          </div>
        </div>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <div className="container py-5">
        <div className="alert alert-success" role="status">
          <h2 className="h4 alert-heading">¡Pedido confirmado!</h2>
          <p className="mb-0">Tu pedido #{pedido.id} fue registrado correctamente.</p>
        </div>

        <ul className="list-unstyled mb-4">
          <li>Cliente: <strong>{pedido.cliente}</strong></li>
          <li>Dirección: {pedido.direccion} ({pedido.zona})</li>
          <li>Producto: {pedido.producto.nombre} · Cantidad: {pedido.cantidad}</li>
          <li>Total: <Precio valor={pedido.total} /></li>
          <li>Pago: {pedido.metodoPago}</li>
        </ul>

        <div className="d-flex flex-wrap gap-2">
          <Boton texto="Ver seguimiento" onClick={() => navigate(`/seguimiento/${pedido.id}`)} />
          <Boton texto="Volver al inicio" variante="outline-secondary" onClick={() => navigate('/')} />
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default PedidoConfirmadoONoRealizado;
