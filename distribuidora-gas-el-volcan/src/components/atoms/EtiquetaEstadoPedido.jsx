import React from 'react';

function EtiquetaEstadoPedido({ estado, className = '', ...restoProps }) {
  return (
    <span className={className.trim()} {...restoProps}>
      {estado}
    </span>
  );
}

export default EtiquetaEstadoPedido;