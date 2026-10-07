import React from 'react';

function Selector({ value, onChange, opciones = [], className = '', ...restoProps }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={className.trim()}
      {...restoProps}
    >
      {/* Opción por defecto opcional */}
      <option value="" disabled>Seleccione una opción</option>
      
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  );
}

export default Selector;