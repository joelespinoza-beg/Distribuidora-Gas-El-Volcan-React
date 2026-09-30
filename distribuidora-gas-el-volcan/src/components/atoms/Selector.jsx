import React from 'react';

function Selector(props) {
  const opciones = props.opciones || [];
  const placeholder = props.placeholder || 'Seleccione una opción';
  const error = props.error || '';
  const required = props.required || false;

  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="form-label">
          {props.label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={required}
        className={`form-select ${error ? 'is-invalid' : ''}`}
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.val}>
            {opcion.label}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default Selector;