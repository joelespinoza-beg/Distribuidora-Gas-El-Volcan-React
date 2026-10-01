import React from 'react';

function CampoTexto(props) {
  const type = props.type || 'text';
  const placeholder = props.placeholder || '';
  const required = props.required || false;

  return (
    <input
      id={props.id}
      type={type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={placeholder}
      disabled={props.disabled}
      required={required}
      className={`form-control ${props.className || ''}`}
    />
  );
}

export default CampoTexto;