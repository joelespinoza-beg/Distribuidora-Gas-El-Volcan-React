import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const mocks = vi.hoisted(() => ({
  iniciarSesion: vi.fn()
}));

vi.mock('../hooks/useAutenticacion', () => ({
  useAutenticacion: () => ({ iniciarSesion: mocks.iniciarSesion, errorSesion: '' })
}));

vi.mock('../components/templates/PlantillaPublica', () => ({
  default: ({ children }) => children
}));

vi.mock('../components/organisms/SeccionLogin', () => ({
  default: ({ onEnviar }) => (
    <button onClick={() => onEnviar({ email: 'admin@elvolcan.cl', clave: 'Clave12345!' })}>
      Probar login
    </button>
  )
}));

import Login from './Login';

function RutaActual() {
  const ubicacion = useLocation();
  return <p>Ruta actual: {ubicacion.pathname}</p>;
}

function renderLogin(state) {
  const entrada = state ? { pathname: '/login', state } : '/login';
  render(
    <MemoryRouter initialEntries={[entrada]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<RutaActual />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ['ADMIN', '/admin/productos'],
    ['OPERADORA', '/operadora'],
    ['REPARTIDOR', '/repartidor'],
    ['CLIENTE', '/']
  ])('redirige al rol %s a %s tras iniciar sesión', async (rol, rutaEsperada) => {
    mocks.iniciarSesion.mockResolvedValue({ rol });
    renderLogin();

    fireEvent.click(screen.getByRole('button', { name: 'Probar login' }));

    expect(await screen.findByText(`Ruta actual: ${rutaEsperada}`)).toBeInTheDocument();
  });

  it('vuelve a la ruta protegida solicitada originalmente', async () => {
    mocks.iniciarSesion.mockResolvedValue({ rol: 'ADMIN' });
    renderLogin({ from: '/admin/usuarios' });

    fireEvent.click(screen.getByRole('button', { name: 'Probar login' }));

    expect(await screen.findByText('Ruta actual: /admin/usuarios')).toBeInTheDocument();
  });
});
