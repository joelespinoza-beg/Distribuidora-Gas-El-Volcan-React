import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AutenticacionContext } from '../context/autenticacionContext';
import { CarritoProvider } from '../context/CarritoContext';
import { PedidosProvider } from '../context/PedidosContext';
import { ProductosProvider } from '../context/ProductosContext';
import {
  actualizarPerfilCliente,
  obtenerPerfilCliente
} from '../services/clienteService';
import {
  crearPedido,
  listarPedidos,
  obtenerPedido
} from '../services/pedidoService';
import { listarProductos } from '../services/productoService';
import Checkout from './Checkout';
import PedidoConfirmadoONoRealizado from './PedidoConfirmadoONoRealizado';

vi.mock('../services/clienteService', () => ({
  actualizarPerfilCliente: vi.fn(),
  obtenerPerfilCliente: vi.fn()
}));

vi.mock('../services/pedidoService', () => ({
  ESTADOS_PEDIDO: ['pendiente', 'asignado', 'en_camino', 'entregado'],
  listarPedidos: vi.fn(),
  obtenerPedido: vi.fn(),
  crearPedido: vi.fn(),
  asignarRepartidor: vi.fn(),
  cambiarEstado: vi.fn()
}));

vi.mock('../services/productoService', () => ({
  listarProductos: vi.fn(),
  obtenerProducto: vi.fn(),
  crearProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn()
}));

const usuario = {
  id: 4,
  nombre: 'Ana Pérez',
  email: 'ana@example.cl',
  rol: 'CLIENTE'
};

const pedidoCreado = {
  id: 17,
  cliente: 'Ana Pérez',
  estado: 'pendiente',
  productos: [{ id: 'CL001', nombre: 'Cilindro GLP 5 kg', cantidad: 2 }],
  total: 13000
};

describe('Checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('gas-el-volcan-carrito', JSON.stringify([{
      id: 'CL001',
      nombre: 'Cilindro GLP 5 kg',
      categoria: 'Cilindros de Gas',
      precio: 6500,
      tipoCliente: 'residencial',
      stock: 80,
      cantidad: 2
    }]));

    listarProductos.mockResolvedValue([
      {
        id: 'CL001',
        nombre: 'Cilindro GLP 5 kg',
        categoria: 'Cilindros de Gas',
        precioResidencial: 6500,
        precioComercial: 6000,
        stock: 80
      }
    ]);
    listarPedidos.mockResolvedValue([]);
    obtenerPerfilCliente.mockResolvedValue({
      nombre: 'Ana Pérez',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 123, Chillán',
      tipoCliente: 'residencial'
    });
    crearPedido.mockResolvedValue(pedidoCreado);
    obtenerPedido.mockResolvedValue(pedidoCreado);
  });

  it('prellena el perfil, valida la zona y registra el pedido con el carrito', async () => {
    render(
      <AutenticacionContext.Provider value={{
        usuario,
        cargandoSesion: false,
        errorSesion: '',
        cerrarSesion: vi.fn()
      }}>
        <ProductosProvider>
          <PedidosProvider>
            <CarritoProvider>
              <MemoryRouter initialEntries={['/checkout']}>
                <Routes>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/pedido/resultado/:id"
                    element={<PedidoConfirmadoONoRealizado />}
                  />
                </Routes>
              </MemoryRouter>
            </CarritoProvider>
          </PedidosProvider>
        </ProductosProvider>
      </AutenticacionContext.Provider>
    );

    expect(await screen.findByLabelText(/Nombre completo/)).toHaveValue('Ana Pérez');
    expect(screen.getByLabelText(/Correo electrónico/)).toHaveValue('ana@example.cl');
    expect(screen.getByLabelText(/Teléfono/)).toHaveValue('+56912345678');
    expect(screen.getByLabelText(/Dirección de entrega/))
      .toHaveValue('Av. Libertad 123, Chillán');

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));
    expect(await screen.findByText('Selecciona una zona de despacho')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Zona de despacho/), {
      target: { value: 'Zona Centro' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(await screen.findByRole('heading', { name: '¡Pedido Confirmado!' }))
      .toBeInTheDocument();
    expect(crearPedido).toHaveBeenCalledWith(expect.objectContaining({
      cliente: 'Ana Pérez',
      email: 'ana@example.cl',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 123, Chillán',
      zona: 'Zona Centro',
      productos: [{ id: 'CL001', cantidad: 2 }]
    }));
    expect(JSON.parse(localStorage.getItem('gas-el-volcan-carrito'))).toEqual([]);
    await waitFor(() => expect(listarProductos).toHaveBeenCalledTimes(2));
    expect(actualizarPerfilCliente).not.toHaveBeenCalled();
  });
});
