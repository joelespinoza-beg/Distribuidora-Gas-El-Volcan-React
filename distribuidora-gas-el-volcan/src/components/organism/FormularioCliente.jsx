import React, { useState } from 'react';
import Boton from '../atoms/Boton';
import CampoFormulario from '../molecule/CampoFormulario';

function FormularioCliente(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit?.({ email, password });
  };

  return (
    <div className="card w-100 p-4 shadow-sm" style={{ maxWidth: '480px' }}>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <CampoFormulario
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <CampoFormulario
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Boton texto="Ingresar" type="submit" className="w-100" />
      </form>
    </div>
  );
}

export default FormularioCliente;