import React, { useState } from 'react';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import { validarObligatorio, validarNumero } from '../../utils/validaciones';

const VACIO = {
  id: '',
  categoria: '',
  nombre: '',
  descripcion: '',
  unidad: 'Unidad',
  precioResidencial: '',
  precioComercial: '',
  stock: ''
};

// Crea o edita un producto. Si recibe "producto", está en modo edición.
// El estado y los errores viven aquí; al estar todo correcto avisa con onEnviar.
function FormularioProducto({ producto = null, onEnviar, onCancelar }) {
  const editando = producto !== null;
  const [campos, setCampos] = useState(editando ? { ...producto } : VACIO);
  const [errores, setErrores] = useState({});

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setCampos((actual) => ({ ...actual, [name]: value }));
  }

  function validar() {
    return {
      id: validarObligatorio(campos.id, 'Ingresa el código'),
      categoria: validarObligatorio(campos.categoria, 'Ingresa la categoría'),
      nombre: validarObligatorio(campos.nombre, 'Ingresa el nombre'),
      precioResidencial: validarNumero(campos.precioResidencial, 1),
      precioComercial: validarNumero(campos.precioComercial, 1),
      stock: validarNumero(campos.stock, 0)
    };
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (hayErrores) return;

    onEnviar?.({
      ...campos,
      id: String(campos.id).trim(),
      precioResidencial: Number(campos.precioResidencial),
      precioComercial: Number(campos.precioComercial),
      stock: Number(campos.stock)
    });
  }

  return (
    <section aria-labelledby="titulo-formulario-producto" className="card p-4 mb-4">
      <h3 id="titulo-formulario-producto" className="h5 mb-3">
        {editando ? 'Editar producto' : 'Nuevo producto'}
      </h3>

      <form onSubmit={enviar} noValidate>
        <div className="row">
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-id"
              name="id"
              label="Código"
              value={campos.id}
              onChange={cambiarCampo}
              error={errores.id}
              disabled={editando}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-categoria"
              name="categoria"
              label="Categoría"
              value={campos.categoria}
              onChange={cambiarCampo}
              error={errores.categoria}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-unidad"
              name="unidad"
              label="Unidad"
              value={campos.unidad}
              onChange={cambiarCampo}
            />
          </div>
          <div className="col-12 col-md-6">
            <CampoFormulario
              id="producto-nombre"
              name="nombre"
              label="Nombre"
              value={campos.nombre}
              onChange={cambiarCampo}
              error={errores.nombre}
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <CampoFormulario
              id="producto-descripcion"
              name="descripcion"
              label="Descripción"
              value={campos.descripcion}
              onChange={cambiarCampo}
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-precio-residencial"
              name="precioResidencial"
              type="number"
              label="Precio residencial"
              value={campos.precioResidencial}
              onChange={cambiarCampo}
              error={errores.precioResidencial}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-precio-comercial"
              name="precioComercial"
              type="number"
              label="Precio comercial"
              value={campos.precioComercial}
              onChange={cambiarCampo}
              error={errores.precioComercial}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="producto-stock"
              name="stock"
              type="number"
              label="Stock"
              value={campos.stock}
              onChange={cambiarCampo}
              error={errores.stock}
              required
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Boton texto={editando ? 'Guardar cambios' : 'Crear producto'} type="submit" />
          {onCancelar && (
            <Boton texto="Cancelar" variante="outline-secondary" onClick={onCancelar} />
          )}
        </div>
      </form>
    </section>
  );
}

export default FormularioProducto;
