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

  it('muestra todos los productos al limpiar el filtro o seleccionar "Todas"', () => {
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

    // 1. Verificamos que parta filtrado (opcional si ya confías en el test anterior)
    expect(screen.queryByRole('heading', { name: 'Cilindro GLP 5 kg' })).not.toBeInTheDocument();

    // 2. Cambiamos el select a "Todas" (o la opción por defecto)
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: '' } }); // Ajusta el value según tu <select>

    // 3. Verificamos que ahora sí aparezcan los productos de otras categorías
    expect(screen.getByRole('heading', { name: 'Cilindro GLP 5 kg' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Regulador doméstico estándar' })).toBeInTheDocument();
  });
})