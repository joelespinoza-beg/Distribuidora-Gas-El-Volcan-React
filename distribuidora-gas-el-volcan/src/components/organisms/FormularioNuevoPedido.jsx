import React, { useState } from 'react';
import { productosCilindros } from '../../data/productos';
import {
  validarObligatorio,
  validarTelefono,
  validarNumero
} from '../../utils/validaciones';

const zonasDespacho = [
  'Zona Centro',
  'Zona Oriente',
  'Zona Rural',
  'Zona Sur',
  'Zona Comercial'
];

function FormularioNuevoPedido({ productos = productosCilindros, onEnviar }) {
  const [formulario, setFormulario] = useState({
    cliente: '',
    telefono: '',
    direccion: '',
    zona: '',
    tipoCliente: 'residencial',
    productoId: '',
    cantidad: 1
  });
  const [errores, setErrores] = useState({});

  const productoSeleccionado = productos.find(
    (producto) => producto.id === formulario.productoId
  );
  const precioUnitario = productoSeleccionado
    ? formulario.tipoCliente === 'comercial'
      ? productoSeleccionado.precioComercial
      : productoSeleccionado.precioResidencial
    : 0;

  function validar(datos) {
    const producto = productos.find((item) => item.id === datos.productoId);

    let errorCantidad = validarNumero(datos.cantidad, 1);
    if (errorCantidad === '' && producto && datos.cantidad > producto.stock) {
      errorCantidad = `Solo quedan ${producto.stock} unidades disponibles`;
    }

    return {
      cliente: validarObligatorio(datos.cliente, 'Ingresa el nombre del cliente'),
      telefono: validarTelefono(datos.telefono),
      direccion: validarObligatorio(datos.direccion, 'Ingresa la dirección de entrega'),
      zona: validarObligatorio(datos.zona, 'Selecciona una zona de despacho'),
      productoId: validarObligatorio(datos.productoId, 'Elige el cilindro que necesitas'),
      cantidad: errorCantidad
    };
  }

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    const nuevo = {
      ...formulario,
      [name]: name === 'cantidad' ? Number(value) : value
    };

    setFormulario(nuevo);

    if (errores[name]) {
      setErrores({ ...errores, [name]: validar(nuevo)[name] });
    }
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validar(formulario);
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (hayErrores || !productoSeleccionado) return;

    onEnviar?.({
      ...formulario,
      producto: productoSeleccionado,
      precioUnitario,
      total: precioUnitario * formulario.cantidad,
      metodoPago: 'efectivo'
    });
  }

  function clase(base, campo) {
    return errores[campo] ? `${base} is-invalid` : base;
  }

  return (
    <section aria-labelledby="titulo-nuevo-pedido">
      <h2 id="titulo-nuevo-pedido" className="mb-4">Solicitar un pedido</h2>
      {/* noValidate: desactiva los mensajes del navegador para que se vean los de React */}
      <form onSubmit={enviar} noValidate className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="pedido-cliente" className="form-label">Nombre del cliente</label>
          <input
            id="pedido-cliente"
            name="cliente"
            className={clase('form-control', 'cliente')}
            value={formulario.cliente}
            onChange={cambiarCampo}
            autoComplete="name"
            required
          />
          {errores.cliente && <div className="invalid-feedback">{errores.cliente}</div>}
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="pedido-telefono" className="form-label">Teléfono</label>
          <input
            id="pedido-telefono"
            name="telefono"
            type="tel"
            className={clase('form-control', 'telefono')}
            value={formulario.telefono}
            onChange={cambiarCampo}
            autoComplete="tel"
            required
          />
          {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
        </div>
        <div className="col-12 col-md-8">
          <label htmlFor="pedido-direccion" className="form-label">Dirección de entrega</label>
          <input
            id="pedido-direccion"
            name="direccion"
            className={clase('form-control', 'direccion')}
            value={formulario.direccion}
            onChange={cambiarCampo}
            autoComplete="street-address"
            required
          />
          {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="pedido-zona" className="form-label">Zona de despacho</label>
          <select
            id="pedido-zona"
            name="zona"
            className={clase('form-select', 'zona')}
            value={formulario.zona}
            onChange={cambiarCampo}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonasDespacho.map((zona) => <option key={zona}>{zona}</option>)}
          </select>
          {errores.zona && <div className="invalid-feedback">{errores.zona}</div>}
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
            className={clase('form-select', 'productoId')}
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
          {errores.productoId && <div className="invalid-feedback">{errores.productoId}</div>}
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="pedido-cantidad" className="form-label">Cantidad</label>
          <input
            id="pedido-cantidad"
            name="cantidad"
            type="number"
            className={clase('form-control', 'cantidad')}
            min="1"
            max={productoSeleccionado?.stock}
            value={formulario.cantidad}
            onChange={cambiarCampo}
            required
          />
          {errores.cantidad && <div className="invalid-feedback">{errores.cantidad}</div>}
        </div>
        <div className="col-12 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <p className="mb-0" aria-live="polite">
            Total estimado: <strong>${totalFormateado(precioUnitario * formulario.cantidad)}</strong>
          </p>
          <button type="submit" className="btn btn-primary">Confirmar pedido</button>
        </div>
      </form>
    </section>
  );
}

function totalFormateado(total) {
  return total.toLocaleString('es-CL');
}

export default FormularioNuevoPedido;