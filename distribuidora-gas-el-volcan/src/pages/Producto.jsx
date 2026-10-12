import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import Precio from '../components/atoms/Precio';
import { cilindros } from '../data/cilindros';
import { useTituloPagina } from '../hooks/useTituloPagina';


function Producto() {
  const navigate = useNavigate();
  const params = useParams();


  const id = Number(params.id);
  const producto = cilindros.find((c) => c.id === id);

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
        <h2>{producto.nombre}</h2>
        <p className="text-muted">{producto.descripcion}</p>
        <p>Tipo de cliente: {producto.tipoCliente}</p>
        <p><Precio monto={producto.precio} /></p>

        {/* navigate(-1) vuelve a la página anterior del historial */}
        <Boton texto="Volver" variante="outline-secondary" onClick={() => navigate(-1)} />
      </div>
    </PlantillaPublica>
  );
}

export default Producto;