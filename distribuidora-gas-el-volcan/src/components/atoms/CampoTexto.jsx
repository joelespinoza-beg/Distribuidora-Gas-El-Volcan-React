import React from 'react';

function CampoTexto(props) {
  const type = props.type || 'text';
  const placeholder = props.placeholder || '';
  const error = props.error || '';
  const required = props.required || false;

  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="form-label">
          {props.label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        id={props.id}
        type={type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={placeholder}
        disabled={props.disabled}
        required={required}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default CampoTexto;