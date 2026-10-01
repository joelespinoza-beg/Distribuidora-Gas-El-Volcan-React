import React from 'react';
import EtiquetaEstadoPedido from '../atoms/EtiquetaEstadoPedido';
import Precio from '../atoms/Precio';

function ItemPedido(props) {
	const pedido = props.pedido || {};
	const productos = pedido.productos || [];

	return (
		<article className="card">
			<div className="card-body">
				<div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
					<div>
						<h3 className="h6 mb-1">Pedido #{pedido.id}</h3>
						{pedido.hora && <p className="small text-muted mb-0">{pedido.hora}</p>}
					</div>
					<EtiquetaEstadoPedido estado={pedido.estado} />
				</div>

				<p className="mb-1"><strong>Cliente:</strong> {pedido.cliente}</p>
				<p className="text-muted mb-3">{pedido.direccion}</p>

				{productos.length > 0 && (
					<ul className="list-unstyled small mb-3">
						{productos.map((producto, index) => (
							<li key={producto.id || `${producto.nombre}-${index}`}>
								{producto.cantidad} x {producto.nombre}
							</li>
						))}
					</ul>
				)}

				<div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 border-top pt-3">
					<div>
						<span className="small text-muted d-block">Total</span>
						<Precio monto={pedido.total ?? 0} />
					</div>
					{props.acciones && <div className="d-flex flex-wrap gap-2">{props.acciones}</div>}
				</div>
			</div>
		</article>
	);
}

export default ItemPedido;
