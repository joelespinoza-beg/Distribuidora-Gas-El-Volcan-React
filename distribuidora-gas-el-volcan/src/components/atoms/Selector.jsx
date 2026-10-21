import React from 'react';

function Selector(props) {
  return (
    <select
      id={props.id}
      name={props.name}
      value={props.value ?? ''}
      onChange={props.onChange}
      disabled={props.disabled}
      required={props.required}
      className={`form-select ${props.className || ''}`.trim()}
    >
      {props.placeholder && <option value="">{props.placeholder}</option>}
      {(props.opciones || []).map((opcion) => {
        const valor = typeof opcion === 'string' ? opcion : opcion.valor;
        const texto = typeof opcion === 'string' ? opcion : opcion.texto;

        return <option key={valor} value={valor}>{texto}</option>;
      })}
    </select>
  );
}

export default Selector;