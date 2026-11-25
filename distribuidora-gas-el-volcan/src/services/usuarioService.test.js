import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./api', () => ({
  CLAVE_ACCESS_TOKEN: 'gas-el-volcan-access-token',
  api: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

import { api } from './api';
import {
  autenticar,
  cambiarRolUsuario,
  crearUsuarioAdmin,
  eliminarAccessToken,
  guardarAccessToken,
  leerAccessToken,
  obtenerPerfil,
  registrarUsuario
} from './usuarioService';

describe('usuarioService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('registra solo nombre, email y clave en el endpoint de registro', async () => {
    api.post.mockResolvedValue({ data: { message: 'Cuenta creada' } });

    await registrarUsuario({ nombre: ' Joel ', email: ' JOEL@MAIL.CL ', clave: '123456' });

    expect(api.post).toHaveBeenCalledWith('/auth/register', {
      nombre: 'Joel',
      email: 'joel@mail.cl',
      clave: '123456'
    });
  });

  it('envía credenciales al login y devuelve el accessToken', async () => {
    const respuesta = { accessToken: 'jwt-de-prueba' };
    api.post.mockResolvedValue({ data: respuesta });

    await expect(autenticar({ email: ' JOEL@MAIL.CL ', clave: '123456' })).resolves.toEqual(respuesta);
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'joel@mail.cl',
      clave: '123456'
    });
  });

  it('consulta el perfil usando la petición autenticada', async () => {
    const perfil = { nombre: 'Joel' };
    api.get.mockResolvedValue({ data: perfil });

    await expect(obtenerPerfil()).resolves.toEqual(perfil);
    expect(api.get).toHaveBeenCalledWith('/auth/me');
  });

  it('crea repartidores con el rol y el código que exige el backend', async () => {
    api.post.mockResolvedValue({ data: { id: 8, rol: 'REPARTIDOR' } });

    await crearUsuarioAdmin({
      nombre: ' Pedro ',
      email: ' PEDRO@MAIL.CL ',
      clave: 'Clave123!',
      rol: 'repartidor',
      repartidorCodigo: 'R1'
    });

    expect(api.post).toHaveBeenCalledWith('/usuarios', {
      nombre: 'Pedro',
      email: 'pedro@mail.cl',
      clave: 'Clave123!',
      rol: 'REPARTIDOR',
      repartidorCodigo: 'R1'
    });
  });

  it('cambia el rol por la ruta administrativa dedicada', async () => {
    api.patch.mockResolvedValue({ data: { id: 8, rol: 'REPARTIDOR' } });

    await cambiarRolUsuario(8, 'repartidor', 'R1');

    expect(api.patch).toHaveBeenCalledWith('/usuarios/8/rol', {
      rol: 'REPARTIDOR',
      repartidorCodigo: 'R1'
    });
  });

  it('conserva y elimina el token de sesión', () => {
    guardarAccessToken('jwt-de-prueba');
    expect(leerAccessToken()).toBe('jwt-de-prueba');

    eliminarAccessToken();
    expect(leerAccessToken()).toBeNull();
  });

  it('propaga el mensaje de error devuelto por Axios', async () => {
    api.post.mockRejectedValue(new Error('Credenciales inválidas'));

    await expect(autenticar({ email: 'joel@mail.cl', clave: 'incorrecta' }))
      .rejects.toThrow('Credenciales inválidas');
  });
});
