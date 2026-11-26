import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from './api';
import { actualizarPerfilCliente, obtenerPerfilCliente } from './clienteService';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    patch: vi.fn()
  }
}));

describe('clienteService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('consulta el perfil propio de cliente con el token Bearer', async () => {
    const perfil = { nombre: 'Ana', telefono: '+56912345678' };
    api.get.mockResolvedValue({ data: perfil });

    await expect(obtenerPerfilCliente()).resolves.toEqual(perfil);
    expect(api.get).toHaveBeenCalledWith('/clientes/me');
  });

  it('actualiza solo los datos de cliente soportados por el perfil', async () => {
    const datos = {
      nombre: 'Ana',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 123',
      tipoCliente: 'residencial'
    };
    api.patch.mockResolvedValue({ data: datos });

    await expect(actualizarPerfilCliente(datos)).resolves.toEqual(datos);
    expect(api.patch).toHaveBeenCalledWith('/clientes/me', datos);
  });
});
