import React from 'react';

function Boton(props) {
  const variante = props.variante || 'primary';

  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type || 'button'}
      className={`btn btn-${variante} ${props.className || ''}`.trim()}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children ?? props.texto}
    </button>
  );
}

export default Boton;