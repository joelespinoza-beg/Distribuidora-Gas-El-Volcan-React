import React from 'react';
import EtiquetaEstadoPedido from '../atoms/EtiquetaEstadoPedido';

const estadosPorDefecto = [
  { valor: 'pendiente', texto: 'Pendiente' },
  { valor: 'asignado', texto: 'Asignado a repartidor' },
  { valor: 'en_camino', texto: 'En camino' },
  { valor: 'entregado', texto: 'Entregado' }
];

function normalizarEstado(estado = '') {
  return String(estado)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

function SeguimientoPedido(props) {
  const { pedido, estados = estadosPorDefecto, id, className, ...atributosSeccion } = props;
  if (!pedido) {
    return <p {...atributosSeccion} id={id} className={className} role="status">
      No hay un pedido para mostrar.
    </p>;
  }

  const estadoActual = normalizarEstado(pedido.estado);
  const indiceActual = estados.findIndex((estado) => estado.valor === estadoActual);
  const etiquetaEstado = estados.find((estado) => estado.valor === estadoActual)?.texto
    || pedido.estado
    || 'Estado no informado';

  return (
    <section
      {...atributosSeccion}
      id={id}
      className={className}
      aria-labelledby="titulo-seguimiento"
    >
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h2 id="titulo-seguimiento" className="h4 mb-1">Seguimiento de pedido</h2>
          {pedido.id && <p className="text-muted mb-0">Pedido #{pedido.id}</p>}
        </div>
        <EtiquetaEstadoPedido estado={etiquetaEstado} />
      </div>
      <ol className="list-group list-group-numbered">
        {estados.map((estado, indice) => {
          const completado = indiceActual >= indice && indiceActual !== -1;
          return (
            <li
              key={estado.valor}
              className={`list-group-item ${completado ? 'list-group-item-success' : ''}`}
              aria-current={indice === indiceActual ? 'step' : undefined}
            >
              {estado.texto}
            </li>
          );
        })}
      </ol>
      {pedido.direccion && (
        <p className="mt-3 mb-0">
          Dirección de entrega: <strong>{pedido.direccion}</strong>
        </p>
      )}
    </section>
  );
}

export default SeguimientoPedido;
