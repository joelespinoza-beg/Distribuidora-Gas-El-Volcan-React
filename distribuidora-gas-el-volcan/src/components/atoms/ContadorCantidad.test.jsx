import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ContadorCantidad from './ContadorCantidad'

describe('ContadorCantidad', () => {
  it('muestra la cantidad por defecto en 1 y deshabilita el botón de restar en el mínimo', () => {
    render(<ContadorCantidad />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '-' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '+' })).not.toBeDisabled()
  })

  it('ejecuta onIncrementar y onDecrementar cuando la cantidad está dentro del rango', () => {
    const onIncrementar = vi.fn()
    const onDecrementar = vi.fn()

    render(
      <ContadorCantidad
        cantidad={3}
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

  it('deshabilita el botón de sumar cuando alcanza la cantidad máxima', () => {
    render(<ContadorCantidad cantidad={5} min={1} max={5} />)

    expect(screen.getByRole('button', { name: '+' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '-' })).not.toBeDisabled()
  })
})
