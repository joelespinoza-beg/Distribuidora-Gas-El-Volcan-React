import React from 'react';
import Boton from '../atoms/Boton';
import Precio from '../atoms/Precio';

function TarjetaProducto(props) {
  const producto = props.producto || {};

  return (
    <article className="card h-100">
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{producto.nombre || 'Producto'}</h3>
        {producto.descripcion && (
          <p className="card-text text-muted">{producto.descripcion}</p>
        )}

        <div className="mt-auto d-flex flex-wrap align-items-center justify-content-between gap-3">
          <Precio monto={producto.precio ?? 0} tipoCliente={producto.tipoCliente} />
          <div className="d-flex flex-wrap gap-2">
            {props.onVer && (
              <Boton
                texto="Ver detalle"
                variante="outline-secondary"
                onClick={() => props.onVer(producto)}
              />
            )}
            <Boton
              texto={props.textoBoton || 'Agregar'}
              onClick={() => props.onAgregar?.(producto)}
              disabled={props.disabled}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;