import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import RutaProtegida from './RutaProtegida';
import { useAutenticacion } from '../hooks/useAutenticacion';

vi.mock('../hooks/useAutenticacion', () => ({
  useAutenticacion: vi.fn()
}));

function DestinoLogin() {
  const ubicacion = useLocation();
  return <p>Login: {ubicacion.state?.desde?.pathname}</p>;
}

function renderizarRuta({ usuario = null, cargandoSesion = false, ruta = '/privado' } = {}) {
  useAutenticacion.mockReturnValue({ usuario, cargandoSesion });

  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route element={<RutaProtegida roles={['OPERADORA']} />}>
          <Route path="/privado" element={<p>Contenido protegido</p>} />
        </Route>
        <Route path="/" element={<p>Inicio cliente</p>} />
        <Route path="/login" element={<DestinoLogin />} />
        <Route path="/catalogo" element={<p>Catálogo cliente</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('RutaProtegida', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el estado de restauración mientras valida la sesión', () => {
    renderizarRuta({ cargandoSesion: true });

    expect(screen.getByRole('status')).toHaveTextContent('Restaurando sesión');
  });

  it('redirige al login y conserva la ruta solicitada para un visitante', () => {
    renderizarRuta({ ruta: '/privado?pagina=2' });

    expect(screen.getByText('Login: /privado')).toBeInTheDocument();
  });

  it('redirige al inicio del rol cuando la sesión no tiene permiso', () => {
    renderizarRuta({ usuario: { rol: 'CLIENTE' } });

    expect(screen.getByText('Inicio cliente')).toBeInTheDocument();
  });

  it('permite continuar a un usuario con el rol autorizado', () => {
    renderizarRuta({ usuario: { rol: 'OPERADORA' } });

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
  });
});
