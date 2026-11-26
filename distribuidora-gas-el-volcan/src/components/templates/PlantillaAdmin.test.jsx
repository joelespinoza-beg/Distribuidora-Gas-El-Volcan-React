import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PlantillaAdmin from './PlantillaAdmin'
import { AutenticacionContext } from '../../context/autenticacionContext'

describe('PlantillaAdmin', () => {
  it('renderiza la barra del panel administrativo, el contenido principal y el pie de página', () => {
    render(
      <AutenticacionContext.Provider value={{
        usuario: { nombre: 'Operadora', rol: 'OPERADORA' },
        cerrarSesion: () => {}
      }}>
        <MemoryRouter initialEntries={['/operadora']}>
          <PlantillaAdmin>
            <h1>Vista de operadora</h1>
          </PlantillaAdmin>
        </MemoryRouter>
      </AutenticacionContext.Provider>
    )

    expect(screen.getByRole('link', { name: 'Panel Gas El Volcán' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pedidos del día' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Productos' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Entregas' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vista de operadora' })).toBeInTheDocument()
  })

  it('incluye la gestión de usuarios en la navegación del administrador', () => {
    render(
      <AutenticacionContext.Provider value={{
        usuario: { nombre: 'Admin', rol: 'ADMIN' },
        cargandoSesion: false,
        cerrarSesion: () => {}
      }}>
        <MemoryRouter initialEntries={['/admin/productos']}>
          <PlantillaAdmin>
            <h1>Administración</h1>
          </PlantillaAdmin>
        </MemoryRouter>
      </AutenticacionContext.Provider>
    )

    expect(screen.getByRole('link', { name: 'Usuarios' })).toHaveAttribute('href', '/admin/usuarios')
  })
})

