import FormularioCliente from '../molecules/FormularioCliente';
import Boton from './atoms/Boton';

function SeccionLogin() {
  const handleRegistro = () => {
    console.log("Redirigiendo a registro...");
  };

  return (
    <section className="container py-5 d-flex flex-column align-items-center">
      {/* 1. Encabezado del organismo */}
      <div className="text-center mb-4" style={{ maxWidth: '480px' }}>
        <h2 className="fw-bold">Bienvenido al Portal</h2>
        <p className="text-muted">
          Ingresa con tu cuenta corporativa para gestionar tus pedidos.
        </p>
      </div>

      {/* 2. Molécula: Formulario de Login */}
      <FormularioCliente />

      {/* 3. Átomos/Acciones complementarias fuera del formulario */}
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