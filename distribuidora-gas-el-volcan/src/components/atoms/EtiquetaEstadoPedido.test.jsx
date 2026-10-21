import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import EtiquetaEstadoPedido from './EtiquetaEstadoPedido'

describe('EtiquetaEstadoPedido', () => {
  it('muestra el estado Pendiente por defecto con su clase de advertencia', () => {
    render(<EtiquetaEstadoPedido />)

    const etiqueta = screen.getByText('Pendiente')
    expect(etiqueta).toHaveClass('badge', 'bg-warning', 'text-dark')
  })

  it.each([
    ['Asignado', 'bg-info'],
    ['En camino', 'bg-primary'],
    ['Entregado', 'bg-success'],
    ['Cancelado', 'bg-danger']
  ])('aplica el estilo correspondiente para el estado %s', (estado, claseEsperada) => {
    render(<EtiquetaEstadoPedido estado={estado} />)

    expect(screen.getByText(estado)).toHaveClass(claseEsperada)
  })

  it('usa el estilo secundario cuando el estado no está reconocido y aplica id y className', () => {
    render(<EtiquetaEstadoPedido estado="En revisión" id="estado-pedido" className="extra" />)

    const etiqueta = screen.getByText('En revisión')
    expect(etiqueta).toHaveAttribute('id', 'estado-pedido')
    expect(etiqueta).toHaveClass('bg-secondary', 'text-white', 'extra')
  })
})
