import React, { useState } from 'react';
import Input from '../atoms/Input';
import Boton from '../atoms/Boton';

function FormularioCliente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <div 
      className="card p-4 shadow-sm" 
      style={{ 
        maxWidth: '480px', 
        borderTop: '5px solid #b80f1a',
        borderRadius: '0px 0px 4px 4px'
      }}
    >
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        {/* Campo Correo electrónico */}
        <div>
          <label className="form-label fw-bold text-dark mb-1">
            Correo electrónico
          </label>
          <Input 
            tipo="email" 
            valor={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="form-label fw-bold text-dark mb-1">
            Contraseña
          </label>
          <Input 
            tipo="password" 
            valor={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Botón de Ingreso */}
        <div className="mt-2">
          <Boton 
            texto="Ingresar como cliente" 
            tipo="submit"
            style={{ 
              backgroundColor: '#b80f1a', 
              borderColor: '#b80f1a', 
              color: '#ffffff',
              fontWeight: '600',
              padding: '10px 18px'
            }} 
          />
        </div>
      </form>
    </div>
  );
}

export default FormularioCliente;