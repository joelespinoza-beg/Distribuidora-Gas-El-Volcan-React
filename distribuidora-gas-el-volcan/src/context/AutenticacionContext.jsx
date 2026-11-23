// src/context/AutenticacionContext.jsx
import { useEffect, useState } from 'react';
import { AutenticacionContext } from './autenticacionContext';
import {
  autenticar,
  eliminarAccessToken,
  guardarAccessToken,
  leerAccessToken,
  obtenerPerfil,
  registrarUsuario
} from '../services/usuarioService';

export function AutenticacionProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(() => Boolean(leerAccessToken()));
  const [errorSesion, setErrorSesion] = useState('');

  useEffect(() => {
    let activo = true;
    const token = leerAccessToken();

    if (!token) return;

    obtenerPerfil()
      .then((perfil) => {
        if (activo) setUsuario(perfil);
      })
      .catch((error) => {
        if (activo) {
          eliminarAccessToken();
          setUsuario(null);
          setErrorSesion(error.message);
        }
      })
      .finally(() => {
        if (activo) setCargandoSesion(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  async function iniciarSesion(credenciales) {
    const respuesta = await autenticar(credenciales);
    const token = respuesta?.accessToken;

    if (typeof token !== 'string' || token.length === 0) {
      throw new Error('La respuesta de la API no contiene accessToken.');
    }

    guardarAccessToken(token);
    try {
      const perfil = await obtenerPerfil();
      setUsuario(perfil);
      setErrorSesion('');
      return perfil;
    } catch (error) {
      eliminarAccessToken();
      setUsuario(null);
      throw error;
    }
  }

  function cerrarSesion() {
    eliminarAccessToken();
    setUsuario(null);
    setErrorSesion('');
  }

  async function crearCuenta(datos) {
    return registrarUsuario(datos);
  }

  return (
    <AutenticacionContext.Provider
      value={{ usuario, cargandoSesion, errorSesion, iniciarSesion, cerrarSesion, crearCuenta }}
    >
      {children}
    </AutenticacionContext.Provider>
  );
}