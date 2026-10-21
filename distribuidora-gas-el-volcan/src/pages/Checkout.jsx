import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import CampoFormulario from '../components/molecules/CampoFormulario';
import CampoSelector from '../components/molecules/CampoSelector';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';
import { usePedidos } from '../context/PedidosContext';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { validarEmail, validarObligatorio, validarTelefono } from '../utils/validaciones';

const zonas = [
  { valor: 'Zona Centro', texto: 'Zona Centro' },
  { valor: 'Zona Oriente', texto: 'Zona Oriente' },
  { valor: 'Zona Rural', texto: 'Zona Rural' },
  { valor: 'Zona Sur', texto: 'Zona Sur' },
  { valor: 'Zona Comercial', texto: 'Zona Comercial' }
];

const formularioInicial = { nombre: '', email: '', telefono: '', direccion: '', zona: '' };

function Checkout() {
  const navigate = useNavigate();
  const { lineas, total, vaciar } = useCarrito();
  const { crear } = usePedidos();
  const { productos, actualizar } = useProductos();
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  useTituloPagina('Confirmar solicitud');

  function cambiar(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  }

  function validar() {
    return {
      nombre: validarObligatorio(formulario.nombre, 'Ingresa tu nombre'),
      email: validarEmail(formulario.email),
      telefono: validarTelefono(formulario.telefono),
      direccion: validarObligatorio(formulario.direccion, 'Ingresa la dirección de entrega'),
      zona: formulario.zona ? '' : 'Selecciona una zona de despacho'
    };
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;
    if (lineas.length === 0) {
      navigate('/carrito');
      return;
    }

    const productosActuales = lineas.map((linea) => (
      productos.find((producto) => producto.id === linea.id)
    ));
    const sinStock = lineas.find((linea, indice) => (
      !productosActuales[indice] || linea.cantidad > productosActuales[indice].stock
    ));

    if (sinStock) {
      setErrorGeneral(`Stock insuficiente para ${sinStock.nombre}. Revisa tu solicitud.`);
      return;
    }

    try {
      const productosPedido = lineas.map((linea) => ({
        id: linea.id,
        nombre: linea.nombre,
        cantidad: linea.cantidad,
        precioUnitario: linea.precio
      }));
      const primero = productosPedido[0];
      const pedido = crear({
        ...formulario,
        cliente: formulario.nombre,
        tipoCliente: lineas[0].tipoCliente,
        productos: productosPedido,
        producto: { id: primero.id, nombre: primero.nombre },
        cantidad: productosPedido.reduce((suma, item) => suma + item.cantidad, 0),
        precioUnitario: primero.precioUnitario,
        total,
        metodoPago: 'efectivo al recibir'
      });

      lineas.forEach((linea, indice) => {
        actualizar(linea.id, {
          stock: productosActuales[indice].stock - linea.cantidad
        });
      });
      vaciar();
      navigate(`/pedido/resultado/${pedido.id}`);
    } catch (fallo) {
      setErrorGeneral(`No se pudo registrar la solicitud: ${fallo.message}`);
    }
  }

  if (lineas.length === 0) {
    return (
      <PlantillaPublica>
        <div className="container py-5">
          <h1 className="h2">No hay productos para confirmar</h1>
          <p>Agrega productos al carrito antes de continuar al checkout.</p>
          <Boton texto="Volver al catálogo" onClick={() => navigate('/catalogo')} />
        </div>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2">Confirmar solicitud</h1>
        <p className="text-muted">Revisa los productos y completa los datos de entrega.</p>
        {errorGeneral && <p className="alert alert-danger" role="alert">{errorGeneral}</p>}

        <div className="row g-4">
          <section className="col-12 col-lg-5" aria-labelledby="resumen-checkout">
            <div className="card p-3">
              <h2 className="h5" id="resumen-checkout">Resumen del pedido</h2>
              <ul className="list-group list-group-flush mb-3">
                {lineas.map((linea) => (
                  <li key={linea.id} className="list-group-item px-0 d-flex justify-content-between gap-3">
                    <span>{linea.cantidad} × {linea.nombre}</span>
                    <strong>${(linea.precio * linea.cantidad).toLocaleString('es-CL')}</strong>
                  </li>
                ))}
              </ul>
              <p className="h5">Total: ${total.toLocaleString('es-CL')}</p>
              <p className="small text-muted mb-0">Pago en efectivo al recibir el pedido.</p>
            </div>
          </section>

          <form className="col-12 col-lg-7" onSubmit={enviar} noValidate>
            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-nombre"
                  name="nombre"
                  label="Nombre completo"
                  value={formulario.nombre}
                  onChange={cambiar}
                  error={errores.nombre}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  value={formulario.email}
                  onChange={cambiar}
                  error={errores.email}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-telefono"
                  name="telefono"
                  type="tel"
                  label="Teléfono"
                  value={formulario.telefono}
                  onChange={cambiar}
                  error={errores.telefono}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoSelector
                  id="checkout-zona"
                  name="zona"
                  label="Zona de despacho"
                  value={formulario.zona}
                  onChange={cambiar}
                  opciones={zonas}
                  error={errores.zona}
                  required
                />
              </div>
              <div className="col-12">
                <CampoFormulario
                  id="checkout-direccion"
                  name="direccion"
                  label="Dirección de entrega"
                  value={formulario.direccion}
                  onChange={cambiar}
                  error={errores.direccion}
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Boton
                texto="Volver al carrito"
                variante="outline-secondary"
                onClick={() => navigate('/carrito')}
              />
              <Boton texto="Confirmar pedido" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default Checkout;
