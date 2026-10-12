import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeccionLogin from '../components/organism/SeccionLogin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  useTituloPagina('Ingresar');

  return (
    <PlantillaPublica>
      <SeccionLogin />
    </PlantillaPublica>
  );
}

export default Login;