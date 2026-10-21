import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { CarritoProvider } from '../context/CarritoContext';
import { PedidosProvider } from '../context/PedidosContext';
import { ProductosProvider } from '../context/ProductosContext';
import Checkout from './Checkout';
import PedidoConfirmadoONoRealizado from './PedidoConfirmadoONoRealizado';

describe('Checkout', () => {
  beforeEach(() => localStorage.clear());

  it('valida los datos de entrega y registra un pedido con el carrito completo', () => {
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

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));
    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nombre completo/), {
      target: { value: 'Ana Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), {
      target: { value: 'ana@example.cl' }
    });
    fireEvent.change(screen.getByLabelText(/Teléfono/), {
      target: { value: '+56912345678' }
    });
    fireEvent.change(screen.getByLabelText(/Zona de despacho/), {
      target: { value: 'Zona Centro' }
    });
    fireEvent.change(screen.getByLabelText(/Dirección de entrega/), {
      target: { value: 'Av. Libertad 123, Chillán' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(screen.getByText('¡Pedido confirmado!')).toBeInTheDocument();
    expect(screen.getByText(/2 × Cilindro GLP 5 kg, 1 × Regulador doméstico estándar/)).toBeInTheDocument();
    expect(screen.getByText(/21\.990/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('gas-el-volcan-carrito'))).toEqual([]);
    expect(JSON.parse(localStorage.getItem('pedidos'))).toHaveLength(1);
  });
});
