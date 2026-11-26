import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { rutaInicialPorRol } from '../utils/rutaInicialPorRol';

function RutaProtegida({ roles }) {
  const { usuario, cargandoSesion } = useAutenticacion();
  const ubicacion = useLocation();

  if (cargandoSesion) {
    return <p className="container py-5" role="status">Restaurando sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion }} />;
  }

  if (!roles.includes(usuario.rol)) {
    return <Navigate to={rutaInicialPorRol(usuario.rol)} replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;
