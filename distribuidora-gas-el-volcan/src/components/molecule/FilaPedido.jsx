import React from 'react';
import ContadorCantidad from '../atoms/ContadorCantidad';
import Precio from '../atoms/precio';

function FilaPedido(props) {
	const cantidad = props.cantidad ?? 1;
	const precioUnitario = props.precioUnitario ?? 0;
	const subtotal = precioUnitario * cantidad;

	return (
		<div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 border-bottom py-3">
			<div className="flex-grow-1">
				<h3 className="h6 mb-1">{props.nombreProducto}</h3>
				<div className="small text-muted">
					Precio unitario: <Precio monto={precioUnitario} />
				</div>
			</div>

			<div className="d-flex flex-wrap align-items-center gap-3">
				<ContadorCantidad
					cantidad={cantidad}
					min={props.min}
					max={props.max}
					onIncrementar={props.onIncrementar}
					onDecrementar={props.onDecrementar}
				/>
				<div className="text-md-end">
					<span className="small text-muted d-block">Subtotal</span>
					<Precio monto={subtotal} />
				</div>
			</div>
		</div>
	);
}

export default FilaPedido;
