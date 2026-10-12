import React from 'react';
import Boton from '../atoms/Boton';
import FormularioLogin from './FormularioLogin';

function SeccionLogin() {
  const handleLogin = (credenciales) => {
    console.log('Iniciando sesión...', credenciales);
  };

  const handleRegistro = () => {
    console.log('Redirigiendo a registro...');
  };

  return (
    <section className="container py-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4 encabezado-login">
        <h2 className="fw-bold">Bienvenido al Portal</h2>
        <p className="text-muted">
          Ingresa con tu cuenta corporativa para gestionar tus pedidos.
        </p>
      </div>

      <FormularioLogin onSubmit={handleLogin} />

      <div className="mt-4 text-center">
        <p className="text-muted mb-2">¿Aún no tienes una cuenta?</p>
        <Boton
          texto="Crear nueva cuenta"
          variante="outline-dark"
          onClick={handleRegistro}
        />
      </div>
    </section>
  );
}

export default SeccionLogin;