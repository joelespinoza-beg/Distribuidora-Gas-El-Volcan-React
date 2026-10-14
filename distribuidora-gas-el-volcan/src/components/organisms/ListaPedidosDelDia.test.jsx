import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ListaPedidosDelDia from './ListaPedidosDelDia';

const pedidos = [{
  id: 17,
  cliente: 'María González',
  direccion: 'Calle 1, Chillán',
  producto: { nombre: 'Cilindro GLP 11 kg' },
  estado: 'pendiente'
}];
const repartidores = [{ id: 3, nombre: 'Carlos Soto' }];

describe('ListaPedidosDelDia', () => {
  it('muestra pedidos y permite asignar un repartidor', () => {
    const onAsignar = vi.fn();
    render(
      <ListaPedidosDelDia
        pedidos={pedidos}
        repartidores={repartidores}
        onAsignar={onAsignar}
      />
    );

    fireEvent.change(screen.getByLabelText('Repartidor del pedido 17'), {
      target: { value: '3' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Asignar' }));

    expect(screen.getByText('María González')).toBeInTheDocument();
    expect(screen.getByText('Cilindro GLP 11 kg')).toBeInTheDocument();
    expect(onAsignar).toHaveBeenCalledWith({ pedidoId: 17, repartidorId: '3' });
  });

  it('permite actualizar el estado y presenta la lista vacía', () => {
    const onCambiarEstado = vi.fn();
    const { rerender } = render(
      <ListaPedidosDelDia
        pedidos={pedidos}
        repartidores={repartidores}
        onCambiarEstado={onCambiarEstado}
      />
    );

    fireEvent.change(screen.getByLabelText('Estado del pedido 17'), {
      target: { value: 'en_camino' }
    });

    expect(onCambiarEstado).toHaveBeenCalledWith({ pedidoId: 17, estado: 'en_camino' });

    rerender(<ListaPedidosDelDia />);
    expect(screen.getByRole('status')).toHaveTextContent('No hay pedidos registrados para hoy.');
  });
});
