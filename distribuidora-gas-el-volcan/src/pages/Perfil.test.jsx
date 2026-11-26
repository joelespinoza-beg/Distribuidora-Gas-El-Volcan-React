import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AutenticacionContext } from '../context/autenticacionContext';
import { CarritoProvider } from '../context/CarritoContext';
import { usePedidos } from '../context/PedidosContext';
import {
  actualizarPerfilCliente,
  obtenerPerfilCliente
} from '../services/clienteService';
import Perfil from './Perfil';

vi.mock('../services/clienteService', () => ({
  actualizarPerfilCliente: vi.fn(),
  obtenerPerfilCliente: vi.fn()
}));

vi.mock('../context/PedidosContext', () => ({
  usePedidos: vi.fn()
}));

const usuarioCliente = {
  id: 8,
  nombre: 'Ana Cuenta',
  email: 'ana@example.cl',
  rol: 'CLIENTE'
};

function renderizarPerfil(usuario = usuarioCliente) {
  return render(
    <AutenticacionContext.Provider value={{
      usuario,
      cargandoSesion: false,
      cerrarSesion: vi.fn()
    }}>
      <CarritoProvider>
        <MemoryRouter initialEntries={['/perfil']}>
          <Perfil />
        </MemoryRouter>
      </CarritoProvider>
    </AutenticacionContext.Provider>
  );
}

describe('Perfil', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    usePedidos.mockReturnValue({
      pedidos: [{
        id: 12,
        estado: 'entregado',
        total: 13000,
        productos: [{ cantidad: 1, nombre: 'Cilindro GLP 5 kg' }]
      }],
      cargando: false,
      error: ''
    });
  });

  it('carga y guarda los datos del cliente y muestra su historial de compras', async () => {
    obtenerPerfilCliente.mockResolvedValue({
      nombre: 'Ana Soto',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 123',
      tipoCliente: 'residencial'
    });
    actualizarPerfilCliente.mockResolvedValue(undefined);

    renderizarPerfil();

    expect(await screen.findByLabelText(/Dirección habitual/))
      .toHaveValue('Av. Libertad 123');
    expect(screen.getByLabelText(/Correo electrónico/)).toHaveValue('ana@example.cl');
    expect(screen.getByRole('heading', { name: 'Historial de compras' })).toBeInTheDocument();
    expect(screen.getByText('Pedido #12')).toBeInTheDocument();
    expect(screen.getByText('1 × Cilindro GLP 5 kg')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Dirección habitual/), {
      target: { value: 'Los Aromos 45' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Perfil actualizado');
    expect(actualizarPerfilCliente).toHaveBeenCalledWith({
      nombre: 'Ana Soto',
      telefono: '+56912345678',
      direccion: 'Los Aromos 45',
      tipoCliente: 'residencial'
    });
  });

  it('muestra la identidad y el rol del personal sin consultar el perfil de cliente', () => {
    renderizarPerfil({
      id: 2,
      nombre: 'Alex Admin',
      email: 'admin@example.cl',
      rol: 'ADMIN'
    });

    expect(screen.getByText('Administrador')).toBeInTheDocument();
    expect(screen.getByText('Rol: Administrador')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Historial de compras' })).not.toBeInTheDocument();
    expect(obtenerPerfilCliente).not.toHaveBeenCalled();
  });

  it('explica cuando la cuenta cliente aún no tiene un perfil creado', async () => {
    obtenerPerfilCliente.mockRejectedValue(
      Object.assign(new Error('Perfil de cliente no encontrado'), { status: 404 })
    );

    renderizarPerfil();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Un administrador debe crear el perfil'
    );
    expect(screen.queryByRole('button', { name: 'Guardar perfil' })).not.toBeInTheDocument();
  });
});
