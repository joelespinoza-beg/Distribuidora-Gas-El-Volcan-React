import React from 'react';
import CampoSelector from './CampoSelector';

const tiposCliente = [
  { valor: 'residencial', texto: 'Residencial' },
  { valor: 'comercial', texto: 'Comercial' }
];

function SelectorTipoClient(props) {
  return (
    <CampoSelector
      id={props.id || 'tipo-cliente'}
      name={props.name || 'tipoCliente'}
      label={props.label || 'Tipo de cliente'}
      value={props.value}
      onChange={props.onChange}
      opciones={props.opciones || tiposCliente}
      placeholder={props.placeholder || 'Selecciona un tipo de cliente'}
      error={props.error}
      required={props.required}
      disabled={props.disabled}
    />
  );
}

export default SelectorTipoClient;