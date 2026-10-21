import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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

    expect(screen.getByRole('link', { name: 'Panel Gas El Volcán' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pedidos del día' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Salir' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vista de operadora' })).toBeInTheDocument()
  })
})
