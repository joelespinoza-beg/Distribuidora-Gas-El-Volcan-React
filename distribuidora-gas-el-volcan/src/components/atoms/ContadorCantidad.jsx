import React from 'react';

function ContadorCantidad(props) {
  // ?? solo reemplaza null/undefined, así min={0} se respeta
  const cantidad = props.cantidad ?? 1;
  const min = props.min ?? 1;
  const max = props.max ?? 10;

  return (
    <div className="input-group" style={{ maxWidth: '130px' }}>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={props.onDecrementar}
        disabled={cantidad <= min}
      >
        -
      </button>

      <span className="form-control text-center fw-bold bg-light">
        {cantidad}
      </span>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={props.onIncrementar}
        disabled={cantidad >= max}
      >
        +
      </button>
    </div>
  );
}

export default ContadorCantidad;