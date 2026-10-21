import React from 'react';
import TarjetaProducto from '../molecules/TarjetaProducto';

function CatalogoGas({
  titulo = 'Nuestros Cilindros',
  textoBoton = 'Agregar al carrito',
  cilindros = [],
  onAgregar,
  onVer
}) {
  return (
    <section>
      <h2 className="mb-4">{titulo}</h2>

      <div className="row g-4">
        {cilindros.map((cilindro) => (
          <div key={cilindro.id} className="col-12 col-md-6 col-lg-3">
            <TarjetaProducto
              producto={cilindro}
              textoBoton={textoBoton}
              onAgregar={onAgregar}
              onVer={onVer}
              disabled={cilindro.stock !== undefined && cilindro.stock < 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CatalogoGas;
