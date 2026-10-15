import React, { useState } from 'react';
import Boton from '../atoms/Boton';

const zonasDespacho = [
  'Zona Centro',
  'Zona Oriente',
  'Zona Rural',
  'Zona Sur',
  'Zona Comercial'
];

function FormularioNuevoPedido(props) {
  const {
    productos = [],
    zonasDespacho: zonas = zonasDespacho,
    onEnviar,
    textoBoton,
    claseBoton,
    id,
    className,
    ...atributosSeccion
  } = props;
  const [formulario, setFormulario] = useState({
    cliente: '',
    telefono: '',
    direccion: '',
    zona: '',
    tipoCliente: 'residencial',
    productoId: '',
    cantidad: 1
  });

  const productoSeleccionado = productos.find(
    (producto) => producto.id === formulario.productoId
  );
  const precioUnitario = productoSeleccionado
    ? formulario.tipoCliente === 'comercial'
      ? productoSeleccionado.precioComercial
      : productoSeleccionado.precioResidencial
    : 0;

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: name === 'cantidad' ? Number(value) : value
    }));
  }

  function enviar(evento) {
    evento.preventDefault();
    if (!productoSeleccionado) return;

    onEnviar?.({
      ...formulario,
      producto: productoSeleccionado,
      precioUnitario,
      total: precioUnitario * formulario.cantidad,
      metodoPago: 'efectivo'
    });
  }

  return (
    <section
      {...atributosSeccion}
      id={id}
      className={className}
      aria-labelledby="titulo-nuevo-pedido"
    >
      <h2 id="titulo-nuevo-pedido" className="mb-4">Solicitar un pedido</h2>
      <form onSubmit={enviar} className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="pedido-cliente" className="form-label">Nombre del cliente</label>
          <input
            id="pedido-cliente"
            name="cliente"
            className="form-control"
            value={formulario.cliente}
            onChange={cambiarCampo}
            autoComplete="name"
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="pedido-telefono" className="form-label">Teléfono</label>
          <input
            id="pedido-telefono"
            name="telefono"
            type="tel"
            className="form-control"
            value={formulario.telefono}
            onChange={cambiarCampo}
            autoComplete="tel"
            required
          />
        </div>
        <div className="col-12 col-md-8">
          <label htmlFor="pedido-direccion" className="form-label">Dirección de entrega</label>
          <input
            id="pedido-direccion"
            name="direccion"
            className="form-control"
            value={formulario.direccion}
            onChange={cambiarCampo}
            autoComplete="street-address"
            required
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="pedido-zona" className="form-label">Zona de despacho</label>
          <select
            id="pedido-zona"
            name="zona"
            className="form-select"
            value={formulario.zona}
            onChange={cambiarCampo}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonas.map((zona) => <option key={zona}>{zona}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="pedido-tipo-cliente" className="form-label">Tipo de cliente</label>
          <select
            id="pedido-tipo-cliente"
            name="tipoCliente"
            className="form-select"
            value={formulario.tipoCliente}
            onChange={cambiarCampo}
          >
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="pedido-producto" className="form-label">Cilindro de gas</label>
          <select
            id="pedido-producto"
            name="productoId"
            className="form-select"
            value={formulario.productoId}
            onChange={cambiarCampo}
            required
          >
            <option value="">Selecciona un cilindro</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="pedido-cantidad" className="form-label">Cantidad</label>
          <input
            id="pedido-cantidad"
            name="cantidad"
            type="number"
            className="form-control"
            min="1"
            max={productoSeleccionado?.stock}
            value={formulario.cantidad}
            onChange={cambiarCampo}
            required
          />
        </div>
        <div className="col-12 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <p className="mb-0" aria-live="polite">
            Total estimado: <strong>${totalFormateado(precioUnitario * formulario.cantidad)}</strong>
          </p>
          <Boton
            type="submit"
            texto={textoBoton || 'Confirmar pedido'}
            className={claseBoton}
          />
        </div>
      </form>
    </section>
  );
}

function totalFormateado(total) {
  return total.toLocaleString('es-CL');
}

export default FormularioNuevoPedido;
