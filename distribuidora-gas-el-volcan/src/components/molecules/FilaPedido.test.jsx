import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FilaPedido from './FilaPedido'

describe('FilaPedido', () => {
  it('muestra el nombre del producto, precio unitario y calcula el subtotal', () => {
    render(
      <FilaPedido
        nombreProducto="Cilindro GLP 15 kg"
        precioUnitario={16000}
        cantidad={2}
      />
    )

    expect(screen.getByRole('heading', { name: 'Cilindro GLP 15 kg' })).toBeInTheDocument()
    expect(screen.getByText('$ 16.000')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('$ 32.000')).toBeInTheDocument()
  })

  it('permite incrementar y decrementar la cantidad desde el contador', () => {
    const onIncrementar = vi.fn()
    const onDecrementar = vi.fn()

    render(
      <FilaPedido
        nombreProducto="Cilindro GLP 11 kg"
        precioUnitario={12000}
        cantidad={2}
        min={1}
        max={5}
        onIncrementar={onIncrementar}
        onDecrementar={onDecrementar}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '-' }))

    expect(onIncrementar).toHaveBeenCalledTimes(1)
    expect(onDecrementar).toHaveBeenCalledTimes(1)
  })
})
