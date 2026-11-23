import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../hooks/useAutenticacion', () => ({
  useAutenticacion: () => ({ usuario: { nombre: 'Ana', rol: 'cliente' } })
}));

vi.mock('../services/productoService', () => ({
  listarProductos: vi.fn(),
  crearProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn()
}));

vi.mock('../services/pedidoService', () => ({
  ESTADOS_PEDIDO: ['pendiente', 'asignado', 'en_camino', 'entregado'],
  listarPedidos: vi.fn(),
  obtenerPedido: vi.fn(),
  crearPedido: vi.fn(),
  asignarRepartidor: vi.fn(),
  cambiarEstado: vi.fn()
}));

import { listarProductos } from '../services/productoService';
import { crearPedido, obtenerPedido } from '../services/pedidoService';
import { CarritoProvider } from '../context/CarritoContext';
import { PedidosProvider } from '../context/PedidosContext';
import { ProductosProvider } from '../context/ProductosContext';
import Checkout from './Checkout';
import PedidoConfirmadoONoRealizado from './PedidoConfirmadoONoRealizado';

describe('Checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    listarProductos.mockResolvedValue([
      { id: 'CL001', nombre: 'Cilindro GLP 5 kg', categoria: 'Cilindros de Gas', stock: 80, precioResidencial: 6500, precioComercial: 6000 },
      { id: 'RG001', nombre: 'Regulador doméstico estándar', categoria: 'Reguladores', stock: 45, precioResidencial: 8990, precioComercial: 8000 }
    ]);
    crearPedido.mockResolvedValue({ id: 'P1', estado: 'pendiente' });
    obtenerPedido.mockResolvedValue({ id: 'P1', estado: 'pendiente' });
  });

  it('valida los datos de entrega y registra un pedido con el carrito completo', async () => {
    localStorage.setItem('gas-el-volcan-carrito', JSON.stringify([
      {
        id: 'CL001',
        nombre: 'Cilindro GLP 5 kg',
        categoria: 'Cilindros de Gas',
        precio: 6500,
        tipoCliente: 'residencial',
        stock: 80,
        cantidad: 2
      },
      {
        id: 'RG001',
        nombre: 'Regulador doméstico estándar',
        categoria: 'Reguladores',
        precio: 8990,
        tipoCliente: 'residencial',
        stock: 45,
        cantidad: 1
      }
    ]));

    render(
      <ProductosProvider>
        <PedidosProvider>
          <CarritoProvider>
            <MemoryRouter initialEntries={['/checkout']}>
              <Routes>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido/resultado/:id" element={<PedidoConfirmadoONoRealizado />} />
              </Routes>
            </MemoryRouter>
          </CarritoProvider>
        </PedidosProvider>
      </ProductosProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));
    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nombre completo/), {
      target: { value: 'Ana Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/Teléfono/), {
      target: { value: '+56912345678' }
    });
    fireEvent.change(screen.getByLabelText(/Zona/), {
      target: { value: 'Zona Centro' }
    });
    fireEvent.change(screen.getByLabelText(/Dirección de entrega/), {
      target: { value: 'Av. Libertad 123, Chillán' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    await vi.waitFor(() => {
      expect(crearPedido).toHaveBeenCalledWith(expect.objectContaining({
        cliente: 'Ana Pérez',
        telefono: '+56912345678',
        direccion: 'Av. Libertad 123, Chillán',
        zona: 'Zona Centro'
      }));
    });
  });
});
