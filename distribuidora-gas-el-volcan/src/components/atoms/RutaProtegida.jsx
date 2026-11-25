// src/components/atoms/RutaProtegida.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../../hooks/useAutenticacion';

function RutaProtegida(props) {
  const { usuario, cargandoSesion } = useAutenticacion();
  const ubicacion = useLocation();

  if (cargandoSesion) {
    return <div className="container py-5 text-center">Verificando sesión...</div>;
  }

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{ from: ubicacion.pathname, mensaje: 'Debes iniciar sesión para acceder.' }}
        replace
      />
    );
  }

  const rolUsuario = String(usuario.rol || '').trim().toUpperCase();
  const rolesPermitidos = props.rolesPermitidos?.map((rol) => String(rol).trim().toUpperCase());

  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h2 className="h4">Acceso denegado (403)</h2>
          <p className="mb-0">Tu rol ({usuario.rol}) no tiene permisos para ver esta sección.</p>
        </div>
      </div>
    );
  }

  return props.children;
}

export default RutaProtegida;