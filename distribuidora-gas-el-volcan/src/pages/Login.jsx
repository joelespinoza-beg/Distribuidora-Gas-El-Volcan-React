import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeccionLogin from '../components/organism/SeccionLogin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  const navigate = useNavigate();

  useTituloPagina('Ingresar');

  function manejarEnvio(datos) {
    console.log('Ingreso correcto de:', datos.email);
    navigate('/catalogo');
  }

  function manejarRegistro() {
    console.log('Redirigiendo a registro...');
  }

  return (
    <PlantillaPublica>
      <SeccionLogin onEnviar={manejarEnvio} onRegistro={manejarRegistro} />
    </PlantillaPublica>
  );
}

export default Login;