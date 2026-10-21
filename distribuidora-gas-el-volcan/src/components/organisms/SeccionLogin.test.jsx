import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SeccionLogin from './SeccionLogin'

describe('SeccionLogin', () => {
  it('muestra el encabezado del portal, el formulario de ingreso y el botón de registro', () => {
    const onRegistro = vi.fn()
    render(<SeccionLogin onRegistro={onRegistro} error="Credenciales inválidas" />)

    expect(screen.getByRole('heading', { name: 'Bienvenido al Portal' })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Credenciales inválidas')

    fireEvent.click(screen.getByRole('button', { name: 'Crear nueva cuenta' }))
    expect(onRegistro).toHaveBeenCalledTimes(1)
  })
})
