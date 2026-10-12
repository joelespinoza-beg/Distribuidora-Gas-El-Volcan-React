import React from 'react';

function Precio(props) {
  const valor = props.valor !== undefined ? props.valor : props.monto;
  const valorFormateado = typeof valor === 'number'
    ? valor.toLocaleString('es-CL')
    : valor;

  return (
    <span
      id={props.id}
      className={(props.className || '').trim()}
    >
      {props.moneda || '$'} {valorFormateado}
      {props.tipoCliente && (
        <small className="text-muted ms-1">({props.tipoCliente})</small>
      )}
    </span>
  );
}

export default Precio;