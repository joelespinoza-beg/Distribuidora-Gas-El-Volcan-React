import React from 'react';

const estilosPorEstado = {
  'Pendiente': 'bg-warning text-dark',
  'Asignado': 'bg-info text-dark',
  'En camino': 'bg-primary text-white',
  'Entregado': 'bg-success text-white',
  'Cancelado': 'bg-danger text-white'
};

function EtiquetaEstadoPedido(props) {
  const estado = props.estado || 'Pendiente';
  const estilo = estilosPorEstado[estado] || 'bg-secondary text-white';

  return (
    <span
      id={props.id}
      className={`badge ${estilo} px-3 py-2 text-uppercase fw-bold ${props.className || ''}`.trim()}
    >
      {estado}
    </span>
  );
}

export default EtiquetaEstadoPedido;