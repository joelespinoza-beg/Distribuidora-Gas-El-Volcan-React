import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeccionLogin from '../components/organisms/SeccionLogin';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { iniciarSesion } = useAutenticacion();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion, errorSesion } = useAutenticacion();

  useTituloPagina('Ingresar');

  const mensaje = ubicacion.state?.mensaje;

  async function manejarEnvio(datos) {
    try {
      await iniciarSesion(datos);
      setError('');
      navigate('/'); 
    } catch (fallo) {
      setError(fallo.message || 'Correo o clave incorrectos');
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