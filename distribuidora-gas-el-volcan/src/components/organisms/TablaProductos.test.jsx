import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { productosCatalogo } from '../../data/productos';
import TablaProductos from './TablaProductos';

describe('TablaProductos', () => {
  it('muestra productos, ambos precios y el stock del catálogo', () => {
    render(<TablaProductos productos={productosCatalogo} />);

    expect(screen.getByRole('table', {
      name: 'Catálogo de productos, precios y stock actual'
    })).toBeInTheDocument();
    expect(screen.getByText('Cilindro GLP 11 kg')).toBeInTheDocument();
    const producto = screen.getByRole('row', { name: /CL002/ });
    expect(within(producto).getByText('$ 12.000')).toBeInTheDocument();
    expect(within(producto).getByText('$ 11.000')).toBeInTheDocument();
    expect(within(producto).getByText('200')).toBeInTheDocument();
    expect(within(screen.getByRole('row', { name: /RG001/ })).getByText('Reguladores'))
      .toBeInTheDocument();
  });

  it('acepta un catálogo filtrado por propiedades', () => {
    render(
      <TablaProductos
        productos={[{
          id: 'CL001',
          categoria: 'Cilindros de Gas',
          nombre: 'Cilindro GLP 5 kg',
          descripcion: 'Para uso residencial.',
          unidad: 'Unidad',
          precioResidencial: 6500,
          precioComercial: 6000,
          stock: 80
        }]}
      />
    );

    expect(screen.getByText('Cilindro GLP 5 kg')).toBeInTheDocument();
    expect(screen.queryByText('Reguladores')).not.toBeInTheDocument();
  });
});
