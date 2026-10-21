import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogoGas from '../components/organisms/CatalogoGas';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

const descuentosPorProducto = {
  CL002: 10,
  RG001: 10,
  MG001: 15,
  AC002: 10
};

function Ofertas() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { agregar } = useCarrito();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useTituloPagina('Ofertas');

  const ofertas = productos
    .filter((producto) => descuentosPorProducto[producto.id] && producto.stock > 0)
    .map((producto) => {
      const descuento = descuentosPorProducto[producto.id];
      const precioOriginal = producto.precioResidencial;
      return {
        ...producto,
        precioOriginal,
        descuento,
        precio: Math.round(precioOriginal * (1 - descuento / 100)),
        tipoCliente: `Oferta ${descuento}%`
      };
    });

  function agregarOferta(producto) {
    try {
      agregar(producto, producto.precio, producto.tipoCliente);
      setError('');
      setMensaje(`${producto.nombre} se agregó al carrito.`);
    } catch (fallo) {
      setMensaje('');
      setError(fallo.message);
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2">Ofertas</h1>
        <p className="text-muted">
          Productos seleccionados con precios promocionales de demostración.
        </p>
        {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        {ofertas.length ? (
          <CatalogoGas
            titulo="Promociones disponibles"
            textoBoton="Agregar al carrito"
            cilindros={ofertas}
            onAgregar={agregarOferta}
            onVer={(producto) => navigate(`/producto/${producto.id}`)}
          />
        ) : (
          <p role="status">No hay ofertas disponibles en este momento.</p>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Ofertas;
