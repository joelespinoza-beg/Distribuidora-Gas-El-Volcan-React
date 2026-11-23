import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePedidos } from '../context/PedidosContext';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';

function Checkout(props) {
  const navigate = useNavigate();
  
  const { crear } = usePedidos();
  const { recargar } = useProductos();
  const { lineas, vaciar } = useCarrito();

  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    zona: ''
  });
  
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  function cambiarFormulario(evento) {
    setFormulario({
      ...formulario,
      [evento.target.name]: evento.target.value
    });
  }

  function validar() {
    const nuevosErrores = {};
    if (!formulario.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formulario.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio';
    if (!formulario.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria';
    if (!formulario.zona.trim()) nuevosErrores.zona = 'La zona es obligatoria';
    return nuevosErrores;
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    
    if (Object.values(nuevosErrores).some(Boolean)) return;
    
    if (lineas.length === 0) {
      navigate('/carrito');
      return;
    }

    try {
      const pedido = await crear({
        cliente: formulario.nombre,
        telefono: formulario.telefono,
        direccion: formulario.direccion,
        zona: formulario.zona,
        tipoCliente: lineas.length > 0 ? lineas[0].tipoCliente : 'residencial',
        metodoPago: 'efectivo al recibir',
        productos: lineas.map((linea) => ({
          id: linea.id,
          cantidad: linea.cantidad
        }))
      });

      await recargar(); 
      vaciar();
      navigate(`/pedido/resultado/${pedido.id}`);

    } catch (fallo) {
      setErrorGeneral(fallo.message);
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-5">
        <h1 className="mb-4 text-center">Finalizar Pedido</h1>
        
        {errorGeneral && (
          <div className="alert alert-danger" role="alert">
            {errorGeneral}
          </div>
        )}
        
        <form onSubmit={enviar} className="card p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <CampoFormulario
              id="nombre"
              name="nombre"
              label="Nombre completo"
              value={formulario.nombre}
              onChange={cambiarFormulario}
              error={errores.nombre}
            />
          </div>
          
          <div className="mb-3">
            <CampoFormulario
              id="telefono"
              name="telefono"
              label="Teléfono de contacto"
              value={formulario.telefono}
              onChange={cambiarFormulario}
              error={errores.telefono}
            />
          </div>
          
          <div className="mb-3">
            <CampoFormulario
              id="direccion"
              name="direccion"
              label="Dirección de entrega"
              value={formulario.direccion}
              onChange={cambiarFormulario}
              error={errores.direccion}
            />
          </div>
          
          <div className="mb-4">
            <CampoFormulario
              id="zona"
              name="zona"
              label="Zona / Comuna"
              value={formulario.zona}
              onChange={cambiarFormulario}
              error={errores.zona}
            />
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <Boton 
              type="button" 
              texto="Volver al carrito" 
              variante="outline-secondary" 
              onClick={() => navigate('/carrito')} 
            />
            <Boton 
              type="submit" 
              texto="Confirmar Pedido" 
              variante="primary" 
            />
          </div>
        </form>
      </div>
    </PlantillaPublica>
  );
}

export default Checkout;