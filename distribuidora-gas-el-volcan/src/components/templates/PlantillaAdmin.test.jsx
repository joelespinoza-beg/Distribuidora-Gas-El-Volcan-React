import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../hooks/useAutenticacion', () => ({
  useAutenticacion: () => ({
    usuario: { nombre: 'Joel', rol: 'admin' },
    cerrarSesion: vi.fn()
  })
}))

import PlantillaAdmin from './PlantillaAdmin'

describe('PlantillaAdmin', () => {
  it('renderiza la barra del panel administrativo, el contenido principal y el pie de página', () => {
    render(
      <MemoryRouter initialEntries={['/operadora']}>
        <PlantillaAdmin>
          <h1>Vista de operadora</h1>
        </PlantillaAdmin>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Panel Admin' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Productos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Usuarios' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cerrar Sesión' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vista de operadora' })).toBeInTheDocument()
  })
})

