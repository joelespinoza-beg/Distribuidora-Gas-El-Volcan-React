import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ListaEntregas from './ListaEntregas';

const pedidos = [
  {
    id: 4,
    cliente: 'Pedro Díaz',
    direccion: 'Los Aromos 15, Chillán',
    producto: 'Cilindro GLP 15 kg',
    cantidad: 1,
    estado: 'asignado',
    repartidorId: 2
  },
  {
    id: 5,
    cliente: 'Otra persona',
    direccion: 'Otra dirección',
    producto: 'Cilindro GLP 5 kg',
    estado: 'pendiente',
    repartidorId: 8
  }
];

describe('ListaEntregas', () => {
  it('muestra solamente las entregas del repartidor y permite avanzar su estado', () => {
    const onCambiarEstado = vi.fn();
    const { getByTestId } = render(
      <ListaEntregas
        pedidos={pedidos}
        repartidorId={2}
        onCambiarEstado={onCambiarEstado}
        data-testid="lista-entregas"
        className="entregas-personalizadas"
      />
    );

    expect(getByTestId('lista-entregas')).toHaveClass('entregas-personalizadas');
    expect(screen.getByText('Pedro Díaz')).toBeInTheDocument();
    expect(screen.queryByText('Otra persona')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Marcar en camino' }));

    expect(onCambiarEstado).toHaveBeenCalledWith({ pedidoId: 4, estado: 'en_camino' });
  });

  it('permite confirmar una entrega en camino y oculta acciones al completarla', () => {
    const onCambiarEstado = vi.fn();
    const enCamino = [{ ...pedidos[0], estado: 'en camino' }];
    const { rerender } = render(
      <ListaEntregas pedidos={enCamino} onCambiarEstado={onCambiarEstado} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar entrega' }));
    expect(onCambiarEstado).toHaveBeenCalledWith({ pedidoId: 4, estado: 'entregado' });

    rerender(<ListaEntregas pedidos={[{ ...enCamino[0], estado: 'entregado' }]} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
