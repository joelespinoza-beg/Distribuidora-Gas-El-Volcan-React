import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FormularioRegistro from './FormularioRegistro'

describe('FormularioRegistro', () => {
  it('valida todos los campos obligatorios y que las contraseñas coincidan', () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu clave')).toBeInTheDocument()
    expect(screen.getByText('Repite tu clave')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('envía nombre, email y clave cuando todos los datos son válidos', () => {
    const onEnviar = vi.fn()
    render(<FormularioRegistro onEnviar={onEnviar} />)

    fireEvent.change(screen.getByLabelText(/Nombre completo/), {
      target: { value: 'Nicolás Ibáñez' }
    })
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), {
      target: { value: 'nicolas@volcan.cl' }
    })
    fireEvent.change(screen.getByLabelText(/^Contraseña/), {
      target: { value: 'secreto123' }
    })
    fireEvent.change(screen.getByLabelText(/Repite la contraseña/), {
      target: { value: 'secreto123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(onEnviar).toHaveBeenCalledWith({
      nombre: 'Nicolás Ibáñez',
      email: 'nicolas@volcan.cl',
      clave: 'secreto123'
    })
  })

  it('muestra un mensaje de error general si se proporciona la prop error', () => {
    render(<FormularioRegistro error="Ya existe una cuenta con ese correo" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Ya existe una cuenta con ese correo')
  })
})
