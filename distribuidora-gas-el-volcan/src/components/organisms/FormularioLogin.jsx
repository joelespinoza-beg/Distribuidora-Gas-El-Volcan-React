import React, { useState } from 'react';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import { validarEmail, validarClave } from '../../utils/validaciones';


function FormularioLogin(props) {

  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');



  const [errores, setErrores] = useState({ email: '', clave: '' });

  function cambiarEmail(evento) {
    const valor = evento.target.value;
    setEmail(valor);

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

    evento.preventDefault();


    const nuevosErrores = {
      email: validarEmail(email),
      clave: validarClave(clave)
    };


    setErrores(nuevosErrores);


    const hayErrores = nuevosErrores.email !== '' || nuevosErrores.clave !== '';
    if (!hayErrores) {
      props.onEnviar?.({ email: email.trim(), clave });
    }
  }

  return (
    <div className="card w-100 p-4 shadow-sm formulario-login">

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
        <Boton
          texto={props.cargando ? 'Ingresando...' : 'Ingresar'}
          type="submit"
          className="w-100"
          disabled={props.cargando}
        />
      </form>
    </div>
  );
}

export default FormularioLogin;
