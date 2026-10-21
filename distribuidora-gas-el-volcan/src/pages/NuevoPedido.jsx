import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoGas from '../components/organisms/CatalogoGas';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { precioSegunCliente } from '../utils/precios';
import { useTituloPagina } from '../hooks/useTituloPagina';

function NuevoPedido() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { agregar } = useCarrito();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useTituloPagina('Nuevo pedido');

  const productosParaPedido = productos.map((producto) => ({
    ...producto,
    precio: precioSegunCliente(producto, 'residencial'),
    tipoCliente: 'residencial'
  }));

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2">Iniciar solicitud</h1>
        <p className="text-muted">Selecciona productos; podrás revisar y editar la solicitud antes de confirmarla.</p>
        {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        <CatalogoGas
          titulo="Productos disponibles"
          textoBoton="Agregar"
          cilindros={productosParaPedido}
          onAgregar={(producto) => {
            try {
              agregar(producto, producto.precio, producto.tipoCliente);
              setError('');
              setMensaje(`${producto.nombre} se agregó a la solicitud.`);
            } catch (fallo) {
              setMensaje('');
              setError(fallo.message);
            }
          }}
        />
        <div className="mt-4">
          <Boton texto="Revisar solicitud" onClick={() => navigate('/carrito')} />
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default NuevoPedido;
