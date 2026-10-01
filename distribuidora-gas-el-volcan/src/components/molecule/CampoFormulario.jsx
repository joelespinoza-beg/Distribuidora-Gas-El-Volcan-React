import React from 'react';
import CampoTexto from '../atoms/CampoTexto';

function CampoFormulario(props) {
	const error = props.error || '';
	const required = props.required || false;

	return (
		<div className="mb-3">
			{props.label && (
				<label htmlFor={props.id} className="form-label">
					{props.label} {required && <span className="text-danger">*</span>}
				</label>
			)}
			<CampoTexto
				id={props.id}
				type={props.type}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				disabled={props.disabled}
				required={required}
				className={error ? 'is-invalid' : ''}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
}

export default CampoFormulario;
