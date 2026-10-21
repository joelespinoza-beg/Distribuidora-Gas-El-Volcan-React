import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('muestra mensajes de validación cuando se intenta enviar vacío y no llama a onEnviar', () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Ingresa tu correo')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu clave')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('envía las credenciales limpias cuando el correo y la contraseña tienen formato válido', () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    fireEvent.change(screen.getByLabelText(/Correo electrónico/), {
      target: { value: '  cliente@volcan.cl  ' }
    })
    fireEvent.change(screen.getByLabelText(/Contraseña/), {
      target: { value: '123456' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onEnviar).toHaveBeenCalledWith({
      email: 'cliente@volcan.cl',
      clave: '123456'
    })
  })

  it('muestra la alerta de error general cuando la recibe por props', () => {
    render(<FormularioLogin error="Correo o clave incorrectos" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Correo o clave incorrectos')
  })
})
