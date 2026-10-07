import React from 'react';
import TarjetaProducto from '../molecule/TarjetaProducto';

function CatalogoGas({ cilindros }) {
  const manejarAgregar = (producto) => {
    console.log("Agregando al carrito:", producto.nombre);
  };

  return (
    <section className="catalogo-gas-seccion">
      <h2 className="mb-4">Nuestros Cilindros</h2>
      
      <div className="row g-4">
        {cilindros.map((cilindro) => (
          <div key={cilindro.id} className="col-12 col-md-6 col-lg-3">
            {/* Le pasamos el objeto completo a la molécula */}
            <TarjetaProducto 
              producto={cilindro}
              textoBoton="Agregar al carrito"
              onAgregar={manejarAgregar}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CatalogoGas;