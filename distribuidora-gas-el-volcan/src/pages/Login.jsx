import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeccionLogin from '../components/organisms/SeccionLogin';
import { autenticar } from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: decide qué pasa cuando el formulario avisa que los datos tienen buen formato.
function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [error, setError] = useState('');

  useTituloPagina('Ingresar');

  // Mensaje que puede traer la página de registro (por ejemplo "Cuenta creada")
  const mensaje = ubicacion.state?.mensaje;

  function manejarEnvio(datos) {
    const usuario = autenticar(datos.email, datos.clave);

    if (usuario === null) {
      setError('Correo o clave incorrectos');
      return;
    }

    setError('');
    navigate('/catalogo');
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
        error={error}
      />
    </PlantillaPublica>
  );
}

export default Login;
