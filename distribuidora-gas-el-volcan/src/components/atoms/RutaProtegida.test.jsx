import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/useAutenticacion', () => ({
  useAutenticacion: vi.fn()
}));

import { useAutenticacion } from '../../hooks/useAutenticacion';
import RutaProtegida from './RutaProtegida';

describe('RutaProtegida', () => {
  it('acepta los roles del backend aunque lleguen en mayúsculas', () => {
    useAutenticacion.mockReturnValue({
      usuario: { rol: 'ADMIN' },
      cargandoSesion: false
    });

    render(
      <MemoryRouter>
        <RutaProtegida rolesPermitidos={['admin']}>
          <p>Panel de administración</p>
        </RutaProtegida>
      </MemoryRouter>
    );

    expect(screen.getByText('Panel de administración')).toBeInTheDocument();
  });
});
