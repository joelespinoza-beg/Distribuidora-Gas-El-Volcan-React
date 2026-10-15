import React from 'react';
import Boton from '../atoms/Boton';
import EtiquetaEstadoPedido from '../atoms/EtiquetaEstadoPedido';

function normalizarEstado(estado = '') {
  return String(estado)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

function ListaEntregas(props) {
  const {
    pedidos = [],
    repartidorId,
    onCambiarEstado,
    id,
    className,
    ...atributosSeccion
  } = props;
  const entregasAsignadas = repartidorId === undefined
    ? pedidos
    : pedidos.filter((pedido) => String(pedido.repartidorId) === String(repartidorId));

  function avanzarEntrega(pedido) {
    const estadoActual = normalizarEstado(pedido.estado);
    const estado = estadoActual === 'en_camino' ? 'entregado' : 'en_camino';
    onCambiarEstado?.({ pedidoId: pedido.id, estado });
  }

  return (
    <section
      {...atributosSeccion}
      id={id}
      className={className}
      aria-labelledby="titulo-entregas"
    >
      <h2 id="titulo-entregas" className="mb-3">Mis entregas</h2>
      {entregasAsignadas.length === 0 ? (
        <p role="status" className="text-muted">No tienes entregas asignadas.</p>
      ) : (
        <ul className="list-unstyled d-grid gap-3">
          {entregasAsignadas.map((pedido) => {
            const estado = normalizarEstado(pedido.estado);
            const entregado = estado === 'entregado';
            return (
              <li key={pedido.id} className="card">
                <div className="card-body">
                  <div className="d-flex flex-wrap justify-content-between gap-2">
                    <h3 className="h5">Pedido #{pedido.id}</h3>
                    <EtiquetaEstadoPedido
                      estado={entregado ? 'Entregado' : estado === 'en_camino' ? 'En camino' : 'Pendiente'}
                      className="align-self-start"
                    />
                  </div>
                  <p className="mb-1"><strong>{pedido.cliente}</strong></p>
                  <p className="mb-1">{pedido.direccion}</p>
                  <p className="text-muted mb-3">
                    {pedido.producto?.nombre || pedido.producto}
                    {pedido.cantidad ? ` · Cantidad: ${pedido.cantidad}` : ''}
                  </p>
                  {!entregado && (
                    <Boton
                      type="button"
                      className="w-100"
                      texto={estado === 'en_camino' ? 'Confirmar entrega' : 'Marcar en camino'}
                      onClick={() => avanzarEntrega(pedido)}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ListaEntregas;
