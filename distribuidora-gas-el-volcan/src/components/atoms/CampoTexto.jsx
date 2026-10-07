import React from 'react';

function CampoTexto(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type || 'text'}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
      required={props.required}
      className={(props.className || '').trim()}
    />
  );
}

export default CampoTexto;