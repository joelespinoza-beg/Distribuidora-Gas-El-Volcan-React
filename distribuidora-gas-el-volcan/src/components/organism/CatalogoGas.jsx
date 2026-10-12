import React from 'react';
import TarjetaProducto from '../molecule/TarjetaProducto';

function CatalogoGas({ cilindros = [], onAgregar }) {
  return (
    <section>
      <h2 className="mb-4">Nuestros Cilindros</h2>

      <div className="row g-4">
        {cilindros.map((cilindro) => (
          <div key={cilindro.id} className="col-12 col-md-6 col-lg-3">
            <TarjetaProducto
              producto={cilindro}
              textoBoton="Agregar al carrito"
              onAgregar={onAgregar}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CatalogoGas;