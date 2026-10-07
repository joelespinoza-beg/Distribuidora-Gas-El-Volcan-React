import React from 'react';

function Selector(props) {
  const opciones = props.opciones ?? [];
  const placeholder = props.placeholder ?? 'Seleccione una opción';

  return (
    <select
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      required={props.required}
      className={`form-select ${props.className || ''}`.trim()}
    >
      <option value="">{placeholder}</option>
      {opciones.map((opcion) => (
        <option key={opcion.val} value={opcion.val}>
          {opcion.label}
        </option>
      ))}
    </select>
  );
}

export default Selector;