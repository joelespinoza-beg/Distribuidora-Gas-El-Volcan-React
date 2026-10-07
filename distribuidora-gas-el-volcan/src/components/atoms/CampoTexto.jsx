import React from 'react';

function CampoTexto({ type = 'text', value, onChange, placeholder, className = '', ...restoProps }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className.trim()}
      {...restoProps}
    />
  );
}

export default CampoTexto;