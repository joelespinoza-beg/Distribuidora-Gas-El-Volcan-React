import React, { useState } from 'react';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import { validarEmail, validarClave } from '../../utils/validaciones';

// "error" es un mensaje general que decide la página (por ejemplo: credenciales incorrectas).
function FormularioLogin(props) {
  // Lo que la persona escribió en cada campo
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  // Un solo useState para los mensajes: un objeto con una clave por campo.
  // '' significa "este campo está bien".
  const [errores, setErrores] = useState({ email: '', clave: '' });

  function cambiarEmail(evento) {
    const valor = evento.target.value;
    setEmail(valor);
    // Si el campo ya tenía un error, se revisa de nuevo mientras la persona corrige
    if (errores.email) {
      setErrores({ ...errores, email: validarEmail(valor) });
    }
  }

  function cambiarClave(evento) {
    const valor = evento.target.value;
    setClave(valor);
    if (errores.clave) {
      setErrores({ ...errores, clave: validarClave(valor) });
    }
  }

  function enviar(evento) {
    // 1. Cancela la recarga que el navegador hace por defecto al enviar un formulario
    evento.preventDefault();

    // 2. Valida TODOS los campos, para mostrar todos los errores juntos
    const nuevosErrores = {
      email: validarEmail(email),
      clave: validarClave(clave)
    };

    // 3. Guarda los mensajes en el estado
    setErrores(nuevosErrores);

    // 4. Solo si no hay ningún error, avisa a la página
    const hayErrores = nuevosErrores.email !== '' || nuevosErrores.clave !== '';
    if (!hayErrores) {
      props.onEnviar?.({ email: email.trim(), clave });
    }
  }

  return (
    <div className="card w-100 p-4 shadow-sm formulario-login">
      {/* noValidate: desactiva los mensajes del navegador para que se vean los de React */}
      <form onSubmit={enviar} noValidate className="d-flex flex-column gap-3">
        {props.error && (
          <div className="alert alert-danger mb-0" role="alert">{props.error}</div>
        )}

        <CampoFormulario
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          value={email}
          onChange={cambiarEmail}
          error={errores.email}
          required
        />
        <CampoFormulario
          id="clave"
          name="clave"
          type="password"
          label="Contraseña"
          value={clave}
          onChange={cambiarClave}
          error={errores.clave}
          required
        />
        <Boton texto="Ingresar" type="submit" className="w-100" />
      </form>
    </div>
  );
}

export default FormularioLogin;
