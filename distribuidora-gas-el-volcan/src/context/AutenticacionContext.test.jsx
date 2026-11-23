import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

vi.mock('../services/usuarioService', () => ({
  autenticar: vi.fn(),
  registrarUsuario: vi.fn(),
  obtenerPerfil: vi.fn(),
  leerAccessToken: vi.fn(),
  guardarAccessToken: vi.fn(),
  eliminarAccessToken: vi.fn()
}));

import { AutenticacionProvider } from './AutenticacionContext';
import { useAutenticacion } from '../hooks/useAutenticacion';
import {
  autenticar,
  guardarAccessToken,
  leerAccessToken,
  obtenerPerfil
} from '../services/usuarioService';

function EstadoSesion() {
  const { usuario, cargandoSesion } = useAutenticacion();
  return <p>{cargandoSesion ? 'Cargando sesión' : usuario?.nombre ?? 'Sin sesión'}</p>;
}

function InicioSesionPrueba() {
  const { iniciarSesion, usuario } = useAutenticacion();
  const [error, setError] = useState('');

  async function iniciar() {
    try {
      await iniciarSesion({ email: 'joel@mail.cl', clave: '123456' });
    } catch (fallo) {
      setError(fallo.message);
    }
  }

  return (
    <>
      <button onClick={iniciar}>Ingresar</button>
      <p>{usuario?.nombre}</p>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

describe('AutenticacionProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('recupera el perfil al recargar con un accessToken guardado', async () => {
    leerAccessToken.mockReturnValue('jwt-de-prueba');
    obtenerPerfil.mockResolvedValue({ nombre: 'Joel' });

    render(
      <AutenticacionProvider>
        <EstadoSesion />
      </AutenticacionProvider>
    );

    expect(await screen.findByText('Joel')).toBeInTheDocument();
    expect(leerAccessToken).toHaveBeenCalled();
    expect(obtenerPerfil).toHaveBeenCalledWith();
  });

  it('guarda el accessToken del login y carga el perfil autenticado', async () => {
    leerAccessToken.mockReturnValue(null);
    autenticar.mockResolvedValue({ accessToken: 'jwt-nuevo' });
    obtenerPerfil.mockResolvedValue({ nombre: 'Joel' });

    render(
      <AutenticacionProvider>
        <InicioSesionPrueba />
      </AutenticacionProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByText('Joel')).toBeInTheDocument();
    expect(autenticar).toHaveBeenCalledWith({ email: 'joel@mail.cl', clave: '123456' });
    expect(guardarAccessToken).toHaveBeenCalledWith('jwt-nuevo');
    expect(obtenerPerfil).toHaveBeenCalledWith();
  });
});
