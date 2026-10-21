import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import TablaProductos from '../components/organisms/TablaProductos';
import FormularioProducto from '../components/organisms/FormularioProducto';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página del administrador: CRUD de productos (listar, crear, editar y eliminar).
function AdminProductos() {
  const { productos, crear, actualizar, eliminar } = useProductos();

  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [enEdicion, setEnEdicion] = useState(null); // producto que se edita (null = nuevo)
  const [aEliminar, setAEliminar] = useState(null); // producto pendiente de confirmar
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useTituloPagina('Admin: productos');

  function abrirNuevo() {
    setEnEdicion(null);
    setFormularioAbierto(true);
    setMensaje('');
    setError('');
  }

  function abrirEdicion(producto) {
    setEnEdicion(producto);
    setFormularioAbierto(true);
    setMensaje('');
    setError('');
  }

  function cerrarFormulario() {
    setFormularioAbierto(false);
    setEnEdicion(null);
  }

  function guardar(datos) {
    try {
      if (enEdicion) {
        actualizar(enEdicion.id, datos);
        setMensaje(`Producto ${datos.id} actualizado.`);
      } else {
        crear(datos);
        setMensaje(`Producto ${datos.id} creado.`);
      }
      setError('');
      cerrarFormulario();
    } catch (fallo) {
      // Por ejemplo: ya existe un producto con ese código
      setError(fallo.message);
    }
  }

  function confirmarEliminar() {
    eliminar(aEliminar.id);
    setMensaje(`Producto ${aEliminar.nombre} eliminado.`);
    setAEliminar(null);
  }

  return (
    <PlantillaAdmin>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Administración de productos</h1>
        <Boton texto="Nuevo producto" onClick={abrirNuevo} />
      </div>

      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {aEliminar && (
        <div className="alert alert-warning" role="alert">
          <p className="mb-2">¿Seguro que quieres eliminar <strong>{aEliminar.nombre}</strong>?</p>
          <div className="d-flex flex-wrap gap-2">
            <Boton texto="Sí, eliminar" variante="danger" onClick={confirmarEliminar} />
            <Boton texto="Cancelar" variante="outline-secondary" onClick={() => setAEliminar(null)} />
          </div>
        </div>
      )}

      {formularioAbierto && (
        <FormularioProducto
          key={enEdicion ? enEdicion.id : 'nuevo'}
          producto={enEdicion}
          onEnviar={guardar}
          onCancelar={cerrarFormulario}
        />
      )}

      <TablaProductos
        productos={productos}
        onEditar={abrirEdicion}
        onEliminar={setAEliminar}
      />
    </PlantillaAdmin>
  );
}

export default AdminProductos;
