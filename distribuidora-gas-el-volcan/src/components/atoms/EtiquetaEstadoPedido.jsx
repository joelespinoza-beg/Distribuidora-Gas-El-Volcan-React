import React from 'react';

function EtiquetaEstadoPedido(props) {
  const estado = props.estado || 'Pendiente';

  const configuracionEstado = {
    'Pendiente': 'bg-warning text-dark',
    'Asignado': 'bg-info text-dark',
    'En camino': 'bg-primary text-white',
    'Entregado': 'bg-success text-white',
    'Cancelado': 'bg-danger text-white'
  };

  const estiloClase = configuracionEstado[estado] || 'bg-secondary text-white';

  return (
    <span className={`badge ${estiloClase} px-3 py-2 text-uppercase fw-bold`}>
      {estado}
    </span>
  );
}

export default EtiquetaEstadoPedido;