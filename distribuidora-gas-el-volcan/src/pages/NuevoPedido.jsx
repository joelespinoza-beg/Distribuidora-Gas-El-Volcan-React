import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioNuevoPedido from '../components/organisms/FormularioNuevoPedido';
import { useProductos } from '../context/ProductosContext';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: el cliente pide gas. Decide qué pasa cuando el formulario avisa que está completo.
function NuevoPedido() {
  const navigate = useNavigate();
  const { productos, actualizar } = useProductos();
  const { crear } = usePedidos();

  useTituloPagina('Nuevo pedido');

  const cilindros = productos.filter((producto) => producto.categoria === 'Cilindros de Gas');

  function manejarEnvio(datos) {
    const producto = productos.find((item) => item.id === datos.productoId);

    // Camino con error: no hay producto o no alcanza el stock
    if (!producto || datos.cantidad > producto.stock) {
      navigate('/pedido/resultado', {
        state: { motivo: 'No hay stock suficiente para completar tu pedido.' }
      });
      return;
    }

    try {
      const pedido = crear({
        cliente: datos.cliente,
        telefono: datos.telefono,
        direccion: datos.direccion,
        zona: datos.zona,
        tipoCliente: datos.tipoCliente,
        producto: { id: producto.id, nombre: producto.nombre },
        cantidad: datos.cantidad,
        precioUnitario: datos.precioUnitario,
        total: datos.total,
        metodoPago: datos.metodoPago
      });

      // Se descuenta el stock y se muestra la pantalla de éxito
      actualizar(producto.id, { stock: producto.stock - datos.cantidad });
      navigate(`/pedido/resultado/${pedido.id}`);
    } catch {
      navigate('/pedido/resultado', {
        state: { motivo: 'Ocurrió un problema al registrar el pedido.' }
      });
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <FormularioNuevoPedido productos={cilindros} onEnviar={manejarEnvio} />
      </div>
    </PlantillaPublica>
  );
}

export default NuevoPedido;
