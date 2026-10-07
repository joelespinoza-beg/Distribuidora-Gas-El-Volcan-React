import React from 'react';

function Boton(props) {
  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type || 'button'}
      className={(props.className || '').trim()}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Boton;