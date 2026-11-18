import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  autenticar,
  eliminarAccessToken,
  guardarAccessToken,
  leerAccessToken,
  obtenerPerfil,
  registrarUsuario
} from './usuarioService';

const API_BASE_URL = 'http://api.test/api/v1';

describe('usuarioService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', API_BASE_URL);
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('registra solo nombre, email y clave en el endpoint de registro', async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      text: async () => JSON.stringify({ message: 'Cuenta creada' })
    });

    await registrarUsuario({ nombre: 'Joel', email: 'joel@mail.cl', clave: '123456' });

    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'Joel', email: 'joel@mail.cl', clave: '123456' })
    });
  });

  it('envía credenciales al login y devuelve el accessToken', async () => {
    const respuesta = { accessToken: 'jwt-de-prueba' };
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(respuesta)
    });

    await expect(autenticar({ email: 'joel@mail.cl', clave: '123456' })).resolves.toEqual(respuesta);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'joel@mail.cl', clave: '123456' })
    });
  });

  it('consulta el perfil usando el token bearer', async () => {
    const perfil = { nombre: 'Joel' };
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(perfil)
    });

    await expect(obtenerPerfil('jwt-de-prueba')).resolves.toEqual(perfil);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { Authorization: 'Bearer jwt-de-prueba' }
    });
  });

  it('conserva y elimina el token de sesión', () => {
    guardarAccessToken('jwt-de-prueba');
    expect(leerAccessToken()).toBe('jwt-de-prueba');

    eliminarAccessToken();
    expect(leerAccessToken()).toBeNull();
  });

  it('expone el mensaje de error devuelto por la API', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => JSON.stringify({ message: 'Credenciales inválidas' })
    });

    await expect(autenticar({ email: 'joel@mail.cl', clave: 'incorrecta' }))
      .rejects.toThrow('Credenciales inválidas');
  });
});
