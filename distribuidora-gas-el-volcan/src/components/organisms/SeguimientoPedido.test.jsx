import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SeguimientoPedido from './SeguimientoPedido';

describe('SeguimientoPedido', () => {
  it('muestra el progreso y la dirección del pedido', () => {
    render(
      <SeguimientoPedido
        pedido={{ id: 42, estado: 'en camino', direccion: 'Av. Brasil 200, Chillán' }}
        estados={[
          { valor: 'pendiente', texto: 'Pedido recibido' },
          { valor: 'en_camino', texto: 'Repartidor en ruta' }
        ]}
        data-testid="seguimiento-pedido"
        className="seguimiento-personalizado"
      />
    );

    const seguimiento = screen.getByTestId('seguimiento-pedido');
    expect(seguimiento).toHaveClass('seguimiento-personalizado');
    expect(screen.getByText('Pedido #42')).toBeInTheDocument();
    expect(screen.getByText('Repartidor en ruta', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('Av. Brasil 200, Chillán')).toBeInTheDocument();
    expect(screen.getByText('Pedido recibido')).toBeInTheDocument();
    expect(screen.getByRole('listitem', { current: 'step' }))
      .toHaveTextContent('Repartidor en ruta');
    expect(screen.queryByText('Asignado a repartidor')).not.toBeInTheDocument();
  });

  it('informa cuando todavía no hay un pedido para consultar', () => {
    render(<SeguimientoPedido />);

    expect(screen.getByRole('status')).toHaveTextContent('No hay un pedido para mostrar.');
  });
});
