import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../services/productoService', () => ({
  listarProductos: vi.fn(),
  crearProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn()
}));

vi.mock('../hooks/useAutenticacion', () => ({
  useAutenticacion: () => ({
    usuario: null,
    cargandoSesion: false,
    cerrarSesion: vi.fn()
  })
}));

import { listarProductos } from '../services/productoService';
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
    vi.clearAllMocks();
    listarProductos.mockResolvedValue([
      { id: 'CL001', nombre: 'Cilindro GLP 5 kg', categoria: 'Cilindros de Gas' },
      { id: 'CL002', nombre: 'Cilindro GLP 11 kg', categoria: 'Cilindros de Gas' },
      { id: 'CL003', nombre: 'Cilindro GLP 15 kg', categoria: 'Cilindros de Gas' },
      { id: 'CL004', nombre: 'Cilindro GLP 45 kg', categoria: 'Cilindros de Gas' },
      { id: 'RG001', nombre: 'Regulador doméstico estándar', categoria: 'Reguladores' },
      { id: 'RG002', nombre: 'Manguera flexible', categoria: 'Accesorios' }
    ]);
  });

  it('muestra todos los productos al limpiar el filtro o seleccionar "Todas"', async () => {
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

    expect(await screen.findByRole('heading', { name: 'Regulador doméstico estándar' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cilindro GLP 5 kg' })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'todas' } });
    expect(screen.getByRole('heading', { name: 'Cilindro GLP 5 kg' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Regulador doméstico estándar' })).toBeInTheDocument();
  });
})