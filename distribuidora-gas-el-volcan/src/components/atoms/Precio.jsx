import React from 'react';

function Precio(props) {
  const monto = props.monto ?? 0;
  const tipoCliente = props.tipoCliente || '';
  const destacado = props.destacado ?? false;

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(monto);

  return (
    <div className="d-inline-flex align-items-baseline gap-1">
      <span className={`fw-bold ${destacado ? 'fs-4 text-primary' : 'fs-5 text-dark'}`}>
        {precioFormateado}
      </span>
      {tipoCliente && (
        <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>
          ({tipoCliente})
        </small>
      )}
    </div>
  );
}

export default Precio;