import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SeguimientoPedido from './SeguimientoPedido';

describe('SeguimientoPedido', () => {
  it('muestra el progreso y la dirección del pedido', () => {
    render(
      <SeguimientoPedido
        pedido={{ id: 42, estado: 'en camino', direccion: 'Av. Brasil 200, Chillán' }}
      />
    );

    expect(screen.getByText('Pedido #42')).toBeInTheDocument();
    expect(screen.getByText('En camino', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('Av. Brasil 200, Chillán')).toBeInTheDocument();
    expect(screen.getByText('Asignado a repartidor')).toBeInTheDocument();
    expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent('En camino');
  });

  it('informa cuando todavía no hay un pedido para consultar', () => {
    render(<SeguimientoPedido />);

    expect(screen.getByRole('status')).toHaveTextContent('No hay un pedido para mostrar.');
  });
});
