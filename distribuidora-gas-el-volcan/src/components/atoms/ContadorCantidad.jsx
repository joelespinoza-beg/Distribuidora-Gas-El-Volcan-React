import React from 'react';

function ContadorCantidad(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      type="number"
      value={props.value ?? props.cantidad}
      onChange={props.onChange}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      required={props.required}
      className={(props.className || '').trim()}
    />
  );
}

export default ContadorCantidad;