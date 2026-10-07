import React from 'react';
import Selector from '../atoms/Selector';

function CampoSelector(props) {
  const error = props.error || '';
  const required = props.required || false;

  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="form-label">
          {props.label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Selector
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        opciones={props.opciones}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={required}
        className={error ? 'is-invalid' : ''}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default CampoSelector;