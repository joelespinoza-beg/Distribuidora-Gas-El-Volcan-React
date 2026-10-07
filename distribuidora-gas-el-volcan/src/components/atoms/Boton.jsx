import React from 'react';

function Boton({ children, type = 'button', className = '', ...restoProps }) {
  return (
    <button
      type={type}
      className={className.trim()}
      {...restoProps}
    >
      {children}
    </button>
  );
}

export default Boton;