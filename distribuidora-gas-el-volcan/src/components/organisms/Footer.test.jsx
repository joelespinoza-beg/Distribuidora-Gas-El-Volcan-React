import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  it('muestra la información de contacto, horarios y enlace al blog por defecto', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByText('Distribuidora de Gas El Volcán')).toBeInTheDocument()
    expect(screen.getByText('Chillán, Región de Ñuble, Chile')).toBeInTheDocument()
    expect(screen.getByText(/\(42\) 222 3344/)).toBeInTheDocument()
    expect(screen.getByText(/\+56 9 8765 4321/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Consejos y novedades' })).toHaveAttribute('href', '/blog')
  })

  it('permite personalizar la información mostrada mediante la prop info', () => {
    render(
      <MemoryRouter>
        <Footer info={{ nombre: 'Gas Sur', ubicacion: 'Concepción' }} />
      </MemoryRouter>
    )

    expect(screen.getByText('Gas Sur')).toBeInTheDocument()
    expect(screen.getByText('Concepción')).toBeInTheDocument()
  })
})
