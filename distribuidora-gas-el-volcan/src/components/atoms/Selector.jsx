import React from 'react';

function Selector(props) {
  const opciones = props.opciones || [];

  return (
    <select
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      required={props.required}
      className={(props.className || '').trim()}
    >
      <option value="" disabled>
        {props.placeholder || 'Seleccione una opción'}
      </option>
      
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  );
}

export default Selector;