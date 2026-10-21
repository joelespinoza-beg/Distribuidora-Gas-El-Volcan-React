import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProductosProvider } from '../context/ProductosContext';
import { CarritoProvider } from '../context/CarritoContext';
import Catalogo from './Catalogo';
import Categorias from './Categorias';

function CatalogoConCategoria() {
  const [searchParams] = useSearchParams();
  return <p>Filtro activo: {searchParams.get('categoria')}</p>;
}

describe('Categorias', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra categorías con su cantidad de productos y abre el catálogo filtrado', () => {
    render(
      <ProductosProvider>
        <CarritoProvider>
          <MemoryRouter initialEntries={['/categorias']}>
            <Routes>
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/catalogo" element={<CatalogoConCategoria />} />
            </Routes>
          </MemoryRouter>
        </CarritoProvider>
      </ProductosProvider>
    );

    expect(screen.getByRole('heading', { name: 'Categorías de productos' })).toBeInTheDocument();
    const tarjetaCilindros = screen.getByRole('heading', { name: 'Cilindros de Gas' }).closest('article');
    expect(within(tarjetaCilindros).getByText('4 productos')).toBeInTheDocument();

    const tarjetaReguladores = screen.getByRole('heading', { name: 'Reguladores' }).closest('article');
    fireEvent.click(within(tarjetaReguladores).getByRole('button', { name: 'Ver productos' }));

    expect(screen.getByText('Filtro activo: Reguladores')).toBeInTheDocument();
  });

  it('inicializa el filtro del catálogo con la categoría seleccionada', () => {
    render(
      <ProductosProvider>
        <CarritoProvider>
          <MemoryRouter initialEntries={['/catalogo?categoria=Reguladores']}>
            <Routes>
              <Route path="/catalogo" element={<Catalogo />} />
            </Routes>
          </MemoryRouter>
        </CarritoProvider>
      </ProductosProvider>
    );

    expect(screen.getByLabelText('Categoría')).toHaveValue('Reguladores');
    expect(screen.getByRole('heading', { name: 'Regulador doméstico estándar' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cilindro GLP 5 kg' })).not.toBeInTheDocument();
  });
});
