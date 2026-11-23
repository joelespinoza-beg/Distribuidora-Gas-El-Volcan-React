import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioRegistro from '../components/organisms/FormularioRegistro';
import Boton from '../components/atoms/Boton';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Registro(props) {
  const navigate = useNavigate();
  const { crearCuenta } = useAutenticacion();
  const [error, setError] = useState('');

  useTituloPagina('Crear cuenta');

  async function manejarEnvio(datos) {
    try {
      await crearCuenta(datos);
      navigate('/login', { state: { mensaje: 'Cuenta creada. Ya puedes ingresar.' } });
    } catch (fallo) {
      setError(fallo.message || 'No se pudo crear la cuenta');
    }
  }

  return (
    <PlantillaPublica>
      <section className="container py-5 d-flex flex-column align-items-center">
        <div className="text-center mb-4 encabezado-login">
          <h2 className="fw-bold">Crear cuenta</h2>
          <p className="text-muted">Regístrate para hacer y seguir tus pedidos.</p>
        </div>

        <FormularioRegistro onEnviar={manejarEnvio} error={error} />

        <div className="mt-4 text-center">
          <p className="text-muted mb-2">¿Ya tienes una cuenta?</p>
          <Boton texto="Ingresar" variante="outline-dark" onClick={() => navigate('/login')} />
        </div>
      </section>
    </PlantillaPublica>
  );
}

export default Registro;