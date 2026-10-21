import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: detalle de un producto. Ruta: /producto/:id (el id es el código, por ejemplo CL002)
function Producto() {
  const navigate = useNavigate();
  const params = useParams();
  const { productos } = useProductos();
  const { agregar } = useCarrito();
  const [error, setError] = useState('');

  // Los códigos son texto, así que se comparan tal cual (sin Number)
  const producto = productos.find((item) => item.id === params.id);

  useTituloPagina(producto ? producto.nombre : 'Producto no encontrado');

  if (!producto) {
    return (
      <PlantillaPublica>
        <div className="container py-4">
          <h2>Producto no encontrado</h2>
          <p className="text-muted">No existe un producto con el código "{params.id}".</p>
          <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
        </div>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <span className="badge text-bg-secondary mb-2">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <p className="text-muted">{producto.descripcion}</p>

        <ul className="list-unstyled mb-4">
          <li>Código: <strong>{producto.id}</strong></li>
          <li>Unidad: {producto.unidad}</li>
          <li>Precio residencial: <Precio valor={producto.precioResidencial} /></li>
          <li>Precio comercial: <Precio valor={producto.precioComercial} /></li>
          <li>Stock disponible: {producto.stock}</li>
        </ul>

        <div className="d-flex flex-wrap gap-2">
          {/* navigate(-1) vuelve a la página anterior del historial */}
          <Boton texto="Volver" variante="outline-secondary" onClick={() => navigate(-1)} />
          <Boton
            texto="Agregar al carrito"
            disabled={producto.stock < 1}
            onClick={() => {
              try {
                agregar(producto, producto.precioResidencial, 'residencial');
                navigate('/carrito');
              } catch (fallo) {
                setError(fallo.message);
              }
            }}
          />
        </div>
        {error && <p role="alert" className="alert alert-danger mt-3">{error}</p>}
      </div>
    </PlantillaPublica>
  );
}

export default Producto;
