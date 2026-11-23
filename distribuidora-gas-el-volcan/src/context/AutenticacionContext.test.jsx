import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { AutenticacionProvider } from './AutenticacionContext';
import { useAutenticacion } from '../hooks/useAutenticacion';
import {
  guardarAccessToken,
  leerAccessToken
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
    vi.stubEnv('VITE_API_BASE_URL', 'http://api.test/api/v1');
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('recupera el perfil al recargar con un accessToken guardado', async () => {
    guardarAccessToken('jwt-de-prueba');
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ nombre: 'Joel' })
    });

    render(
      <AutenticacionProvider>
        <EstadoSesion />
      </AutenticacionProvider>
    );

    expect(await screen.findByText('Joel')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://api.test/api/v1/auth/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer jwt-de-prueba' }
    });
  });

  it('guarda el accessToken del login y carga el perfil autenticado', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ accessToken: 'jwt-nuevo' })
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ nombre: 'Joel' })
      });

    render(
      <AutenticacionProvider>
        <InicioSesionPrueba />
      </AutenticacionProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByText('Joel')).toBeInTheDocument();
    expect(leerAccessToken()).toBe('jwt-nuevo');
    expect(fetch).toHaveBeenNthCalledWith(1, 'http://api.test/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'joel@mail.cl', clave: '123456' })
    });
    expect(fetch).toHaveBeenNthCalledWith(2, 'http://api.test/api/v1/auth/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer jwt-nuevo' }
    });
  });
});
