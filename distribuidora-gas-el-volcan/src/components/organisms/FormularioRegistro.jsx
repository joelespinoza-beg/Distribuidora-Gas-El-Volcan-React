import React, { useState } from 'react';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecules/CampoFormulario';
import {
  validarObligatorio,
  validarEmail,
  validarClave,
  validarConfirmacion
} from '../../utils/validaciones';

// Una regla por campo: recibe todos los campos y devuelve el mensaje de error ('' si está bien)
const reglas = {
  nombre: (campos) => validarObligatorio(campos.nombre, 'Ingresa tu nombre'),
  email: (campos) => validarEmail(campos.email),
  clave: (campos) => validarClave(campos.clave),
  confirmacion: (campos) => validarConfirmacion(campos.clave, campos.confirmacion)
};

const VACIO = { nombre: '', email: '', clave: '', confirmacion: '' };

// Formulario de registro: guarda los campos y los errores, y avisa con onEnviar cuando todo está correcto.
function FormularioRegistro({ onEnviar, error = '' }) {
  const [campos, setCampos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    const nuevos = { ...campos, [name]: value };

    setCampos(nuevos);

    // Si el campo ya tenía un error, se revisa de nuevo mientras la persona corrige
    if (errores[name]) {
      setErrores({ ...errores, [name]: reglas[name](nuevos) });
    }
  }

  function enviar(evento) {
    evento.preventDefault();

    // Se validan TODOS los campos para mostrar todos los errores juntos
    const nuevosErrores = {};
    for (const nombre of Object.keys(reglas)) {
      nuevosErrores[nombre] = reglas[nombre](campos);
    }
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (!hayErrores) {
      onEnviar?.({ nombre: campos.nombre, email: campos.email, clave: campos.clave });
    }
  }

  return (
    <div className="card w-100 p-4 shadow-sm formulario-login">
      <form onSubmit={enviar} noValidate className="d-flex flex-column gap-3">
        {error && (
          <div className="alert alert-danger mb-0" role="alert">{error}</div>
        )}

        <CampoFormulario
          id="registro-nombre"
          name="nombre"
          label="Nombre completo"
          value={campos.nombre}
          onChange={cambiar}
          error={errores.nombre}
          required
        />
        <CampoFormulario
          id="registro-email"
          name="email"
          type="email"
          label="Correo electrónico"
          value={campos.email}
          onChange={cambiar}
          error={errores.email}
          required
        />
        <CampoFormulario
          id="registro-clave"
          name="clave"
          type="password"
          label="Contraseña"
          value={campos.clave}
          onChange={cambiar}
          error={errores.clave}
          required
        />
        <CampoFormulario
          id="registro-confirmacion"
          name="confirmacion"
          type="password"
          label="Repite la contraseña"
          value={campos.confirmacion}
          onChange={cambiar}
          error={errores.confirmacion}
          required
        />

        <Boton texto="Crear cuenta" type="submit" className="w-100" />
      </form>
    </div>
  );
}

export default FormularioRegistro;
