// src/pages/AdminUsuarios.jsx
import React, { useEffect, useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import Boton from '../components/atoms/Boton';
import CampoFormulario from '../components/molecules/CampoFormulario';
import CampoSelector from '../components/molecules/CampoSelector';
import {
  listarUsuarios,
  crearUsuarioAdmin,
  actualizarUsuario,
  cambiarRolUsuario,
  eliminarUsuario
} from '../services/usuarioService';
import { listarRepartidores } from '../services/repartidorService';
import { useTituloPagina } from '../hooks/useTituloPagina';

const ROLES = [
  { valor: 'cliente', texto: 'Cliente' },
  { valor: 'operadora', texto: 'Operadora' },
  { valor: 'repartidor', texto: 'Repartidor' },
  { valor: 'admin', texto: 'Administrador' }
];

const FORM_INICIAL = {
  nombre: '',
  email: '',
  clave: '',
  rol: 'cliente',
  repartidorCodigo: ''
};

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [formulario, setFormulario] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useTituloPagina('Admin: usuarios');

  async function cargar() {
    try {
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    let activo = true;
    listarUsuarios()
      .then((lista) => {
        if (activo) setUsuarios(lista);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      });
    listarRepartidores()
      .then((lista) => {
        if (activo) setRepartidores(lista);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      });

    return () => {
      activo = false;
    };
  }, []);

  function cambiar(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  function iniciarEdicion(usuario) {
    setEditandoId(usuario.id);
    setFormulario({
      nombre: usuario.nombre,
      email: usuario.email,
      clave: '',
      rol: String(usuario.rol).toLowerCase(),
      repartidorCodigo: usuario.repartidorCodigo || ''
    });
    setMensaje('');
    setError('');
  }

  function cancelar() {
    setEditandoId(null);
    setFormulario(FORM_INICIAL);
  }

  async function guardar(e) {
    e.preventDefault();
    try {
      if (editandoId) {
        const usuarioActual = usuarios.find((usuario) => usuario.id === editandoId);
        const cambios = { nombre: formulario.nombre, email: formulario.email };
        if (formulario.clave) cambios.clave = formulario.clave;
        await actualizarUsuario(editandoId, cambios);
        const rolActual = String(usuarioActual?.rol || '').toLowerCase();
        const repartidorActual = usuarioActual?.repartidorCodigo || '';
        if (
          formulario.rol !== rolActual ||
          formulario.repartidorCodigo !== repartidorActual
        ) {
          await cambiarRolUsuario(
            editandoId,
            formulario.rol,
            formulario.repartidorCodigo
          );
        }
        setMensaje('Usuario actualizado correctamente.');
      } else {
        await crearUsuarioAdmin(formulario);
        setMensaje('Usuario creado correctamente.');
      }
      setError('');
      cancelar();
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  async function borrar(usuario) {
    try {
      await eliminarUsuario(usuario.id);
      setMensaje(`Usuario ${usuario.nombre} eliminado.`);
      setError('');
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <PlantillaAdmin>
      <h1 className="h3 mb-3">Gestión de usuarios</h1>
      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <form onSubmit={guardar} className="card p-4 mb-4">
        <h2 className="h5 mb-3">{editandoId ? 'Editar usuario' : 'Nuevo usuario'}</h2>
        <div className="row">
          <div className="col-md-3">
            <CampoFormulario id="u-nombre" name="nombre" label="Nombre" value={formulario.nombre} onChange={cambiar} required />
          </div>
          <div className="col-md-3">
            <CampoFormulario id="u-email" name="email" type="email" label="Correo" value={formulario.email} onChange={cambiar} required />
          </div>
          <div className="col-md-3">
            <CampoFormulario id="u-clave" name="clave" type="password" label={editandoId ? 'Nueva clave (opcional)' : 'Clave'} value={formulario.clave} onChange={cambiar} required={!editandoId} />
          </div>
          <div className="col-md-3">
            <CampoSelector id="u-rol" name="rol" label="Rol" value={formulario.rol} onChange={cambiar} opciones={ROLES} required />
          </div>
          {formulario.rol === 'repartidor' && (
            <div className="col-md-3">
              <CampoSelector
                id="u-repartidor"
                name="repartidorCodigo"
                label="Repartidor asignado"
                value={formulario.repartidorCodigo}
                onChange={cambiar}
                opciones={repartidores.map((repartidor) => ({
                  valor: repartidor.id,
                  texto: repartidor.nombre
                }))}
                placeholder="Selecciona un repartidor"
                required
              />
            </div>
          )}
        </div>
        <div className="d-flex gap-2">
          <Boton type="submit" texto={editandoId ? 'Guardar cambios' : 'Crear usuario'} />
          {editandoId && <Boton texto="Cancelar" variante="outline-secondary" onClick={cancelar} />}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td><span className="badge bg-secondary text-uppercase">{u.rol}</span></td>
                <td className="d-flex gap-2">
                  <Boton texto="Editar" variante="outline-primary" className="btn-sm" onClick={() => iniciarEdicion(u)} />
                  <Boton texto="Eliminar" variante="outline-danger" className="btn-sm" onClick={() => borrar(u)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlantillaAdmin>
  );
}