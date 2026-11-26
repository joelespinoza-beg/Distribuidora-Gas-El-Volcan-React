import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CarritoProvider } from '../../context/CarritoContext'
import { AutenticacionContext } from '../../context/autenticacionContext'
import PlantillaPublica from './PlantillaPublica'

describe('PlantillaPublica', () => {
  it('renderiza la barra de navegación pública, el contenido hijo y el pie de página', () => {
    render(
      <AutenticacionContext.Provider value={{ usuario: null, cerrarSesion: () => {} }}>
        <CarritoProvider>
          <MemoryRouter initialEntries={['/catalogo']}>
            <PlantillaPublica>
              <h1>Contenido de prueba</h1>
            </PlantillaPublica>
          </MemoryRouter>
        </CarritoProvider>
      </AutenticacionContext.Provider>
    )

    expect(screen.getByRole('link', { name: 'Catálogo' })).toHaveClass('active')
    expect(screen.getByRole('heading', { name: 'Contenido de prueba' })).toBeInTheDocument()
    expect(screen.getByText('Distribuidora de Gas El Volcán')).toBeInTheDocument()
  })
})

