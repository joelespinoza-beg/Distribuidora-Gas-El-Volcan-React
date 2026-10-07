import React from 'react';

function EtiquetaEstadoPedido(props) {
  return (
    <span
      id={props.id}
      className={(props.className || '').trim()}
    >
      {props.estado}
    </span>
  );
}

export default EtiquetaEstadoPedido;