import React from 'react';

function Precio({ valor, moneda = '$', className = '', ...restoProps }) {
  const valorFormateado = typeof valor === 'number' 
    ? valor.toLocaleString('es-CL') 
    : valor;

  return (
    <span className={className.trim()} {...restoProps}>
      {moneda} {valorFormateado}
    </span>
  );
}

export default Precio;