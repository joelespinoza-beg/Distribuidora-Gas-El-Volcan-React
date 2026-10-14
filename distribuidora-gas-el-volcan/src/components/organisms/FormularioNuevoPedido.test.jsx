import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormularioNuevoPedido from './FormularioNuevoPedido';

describe('FormularioNuevoPedido', () => {
  it('muestra los campos del pedido y calcula el precio residencial del catálogo', () => {
    render(<FormularioNuevoPedido />);

    fireEvent.change(screen.getByLabelText('Cilindro de gas'), {
      target: { value: 'CL002' }
    });

    expect(screen.getByRole('option', { name: 'Zona Centro' })).toBeInTheDocument();
    expect(screen.getByText('Total estimado:')).toHaveTextContent('$12.000');
  });

  it('envía los datos del cliente, el producto, el total y pago en efectivo', () => {
    const onEnviar = vi.fn();
    render(<FormularioNuevoPedido onEnviar={onEnviar} />);

    fireEvent.change(screen.getByLabelText('Nombre del cliente'), {
      target: { value: 'Ana Pérez' }
    });
    fireEvent.change(screen.getByLabelText('Teléfono'), {
      target: { value: '+56912345678' }
    });
    fireEvent.change(screen.getByLabelText('Dirección de entrega'), {
      target: { value: 'Av. Libertad 100, Chillán' }
    });
    fireEvent.change(screen.getByLabelText('Zona de despacho'), {
      target: { value: 'Zona Centro' }
    });
    fireEvent.change(screen.getByLabelText('Tipo de cliente'), {
      target: { value: 'comercial' }
    });
    fireEvent.change(screen.getByLabelText('Cilindro de gas'), {
      target: { value: 'CL002' }
    });
    fireEvent.change(screen.getByLabelText('Cantidad'), {
      target: { value: '2' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(onEnviar).toHaveBeenCalledWith(expect.objectContaining({
      cliente: 'Ana Pérez',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 100, Chillán',
      zona: 'Zona Centro',
      tipoCliente: 'comercial',
      productoId: 'CL002',
      cantidad: 2,
      precioUnitario: 11000,
      total: 22000,
      metodoPago: 'efectivo',
      producto: expect.objectContaining({ nombre: 'Cilindro GLP 11 kg' })
    }));
  });
});
