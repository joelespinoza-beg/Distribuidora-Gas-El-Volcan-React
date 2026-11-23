import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormularioNuevoPedido from './FormularioNuevoPedido';

function llenarFormulario(cambios = {}) {
  const datos = {
    'Nombre del cliente': 'Ana Pérez',
    'Teléfono': '+56912345678',
    'Dirección de entrega': 'Av. Libertad 100, Chillán',
    'Zona de despacho': 'Zona Centro',
    'Cilindro de gas': 'CL002',
    'Cantidad': '2',
    ...cambios
  };

  for (const [etiqueta, valor] of Object.entries(datos)) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
  }
}

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

    llenarFormulario();
    fireEvent.change(screen.getByLabelText('Tipo de cliente'), {
      target: { value: 'comercial' }
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

  it('muestra un error junto al campo y no envía el pedido si el teléfono es texto', () => {
    const onEnviar = vi.fn();
    render(<FormularioNuevoPedido onEnviar={onEnviar} />);

    llenarFormulario({ 'Teléfono': 'hola' });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(screen.getByText(/Ingresa un teléfono válido/)).toBeInTheDocument();
    expect(onEnviar).not.toHaveBeenCalled();
  });

  it('muestra los errores de todos los campos obligatorios al enviar vacío', () => {
    const onEnviar = vi.fn();
    render(<FormularioNuevoPedido onEnviar={onEnviar} />);

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(screen.getByText('Ingresa el nombre del cliente')).toBeInTheDocument();
    expect(screen.getByText('Ingresa tu teléfono')).toBeInTheDocument();
    expect(screen.getByText('Ingresa la dirección de entrega')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una zona de despacho')).toBeInTheDocument();
    expect(screen.getByText('Elige el cilindro que necesitas')).toBeInTheDocument();
    expect(onEnviar).not.toHaveBeenCalled();
  });

  it('no permite pedir más unidades que el stock disponible', () => {
    const onEnviar = vi.fn();
    render(<FormularioNuevoPedido onEnviar={onEnviar} />);

    llenarFormulario({ 'Cantidad': '99999' });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(screen.getByText(/Solo quedan \d+ unidades disponibles/)).toBeInTheDocument();
    expect(onEnviar).not.toHaveBeenCalled();
  });
});