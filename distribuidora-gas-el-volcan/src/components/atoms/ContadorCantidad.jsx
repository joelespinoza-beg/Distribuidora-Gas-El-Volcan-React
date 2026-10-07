import React from 'react';

function ContadorCantidad({ value, onChange, min = 1, max, className = '', ...restoProps }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={className.trim()}
      {...restoProps}
    />
  );
}

export default ContadorCantidad;