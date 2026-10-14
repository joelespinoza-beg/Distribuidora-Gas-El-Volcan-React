import React, { useState } from 'react';

const estadosPedido = [
  { valor: 'pendiente', texto: 'Pendiente' },
  { valor: 'asignado', texto: 'Asignado' },
  { valor: 'en_camino', texto: 'En camino' },
  { valor: 'entregado', texto: 'Entregado' }
];

function ListaPedidosDelDia({ pedidos = [], repartidores = [], onAsignar, onCambiarEstado }) {
  const [asignaciones, setAsignaciones] = useState({});

  function seleccionarRepartidor(pedidoId, repartidorId) {
    setAsignaciones((actuales) => ({ ...actuales, [pedidoId]: repartidorId }));
  }

  function asignarPedido(pedidoId) {
    const repartidorId = asignaciones[pedidoId];
    if (repartidorId) onAsignar?.({ pedidoId, repartidorId });
  }

  return (
    <section aria-labelledby="titulo-pedidos-del-dia">
      <h2 id="titulo-pedidos-del-dia" className="mb-3">Pedidos del día</h2>
      {pedidos.length === 0 ? (
        <p role="status" className="text-muted">No hay pedidos registrados para hoy.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <caption className="visually-hidden">Pedidos recibidos durante el día</caption>
            <thead>
              <tr>
                <th scope="col">Pedido</th>
                <th scope="col">Cliente y dirección</th>
                <th scope="col">Producto</th>
                <th scope="col">Estado</th>
                <th scope="col">Repartidor</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <th scope="row">#{pedido.id}</th>
                  <td>
                    <strong>{pedido.cliente}</strong>
                    <span className="d-block small text-muted">{pedido.direccion}</span>
                  </td>
                  <td>{pedido.producto?.nombre || pedido.producto}</td>
                  <td>
                    <label className="visually-hidden" htmlFor={`estado-${pedido.id}`}>
                      Estado del pedido {pedido.id}
                    </label>
                    <select
                      id={`estado-${pedido.id}`}
                      className="form-select"
                      value={pedido.estado}
                      onChange={(evento) => onCambiarEstado?.({
                        pedidoId: pedido.id,
                        estado: evento.target.value
                      })}
                    >
                      {estadosPedido.map((estado) => (
                        <option key={estado.valor} value={estado.valor}>{estado.texto}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <label className="visually-hidden" htmlFor={`repartidor-${pedido.id}`}>
                        Repartidor del pedido {pedido.id}
                      </label>
                      <select
                        id={`repartidor-${pedido.id}`}
                        className="form-select"
                        value={asignaciones[pedido.id] || ''}
                        onChange={(evento) => seleccionarRepartidor(pedido.id, evento.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        {repartidores.map((repartidor) => (
                          <option key={repartidor.id} value={repartidor.id}>
                            {repartidor.nombre}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn btn-outline-primary text-nowrap"
                        onClick={() => asignarPedido(pedido.id)}
                        disabled={!asignaciones[pedido.id]}
                      >
                        Asignar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListaPedidosDelDia;
