import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeccionLogin from '../components/organisms/SeccionLogin';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { rutaInicialPorRol } from '../utils/rutaInicialPorRol';


function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion, errorSesion } = useAutenticacion();

  useTituloPagina('Ingresar');


  const mensaje = ubicacion.state?.mensaje;

  async function manejarEnvio(datos) {
    setCargando(true);
    setError('');

    try {
      const perfil = await iniciarSesion(datos);
      const rol = String(perfil?.rol ?? '').trim().toUpperCase();
      navigate(
        ubicacion.state?.from
          ?? ubicacion.state?.desde?.pathname
          ?? rutaInicialPorRol(rol),
        { replace: true }
      );
    } catch (fallo) {
      setError(fallo.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <PlantillaPublica>
      {mensaje && (
        <div className="container pt-4">
          <div className="alert alert-success mb-0" role="status">{mensaje}</div>
        </div>
      )}
      <SeccionLogin
        onEnviar={manejarEnvio}
        onRegistro={() => navigate('/registro')}
        error={error || errorSesion}
        cargando={cargando}
      />
    </PlantillaPublica>
  );
}

export default Login;
