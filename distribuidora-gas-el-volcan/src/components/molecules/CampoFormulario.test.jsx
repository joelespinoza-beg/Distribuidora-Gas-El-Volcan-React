import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CampoFormulario from './CampoFormulario'

describe('CampoFormulario', () => {
  it('asocia la etiqueta con el campo de texto y muestra el indicador de obligatorio', () => {
    render(
      <CampoFormulario
        id="correo"
        name="correo"
        label="Correo electrónico"
        value=""
        onChange={() => {}}
        required
      />
    )

    const input = screen.getByLabelText(/Correo electrónico/)
    expect(input).toBeInTheDocument()
    expect(input).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('muestra el mensaje de error y marca el campo como inválido cuando hay error', () => {
    render(
      <CampoFormulario
        id="nombre"
        label="Nombre"
        value=""
        onChange={() => {}}
        error="Ingresa tu nombre"
      />
    )

    const input = screen.getByLabelText('Nombre')
    expect(input).toHaveClass('is-invalid')
    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument()
  })

  it('propaga los cambios al escribir en el campo', () => {
    const onChange = vi.fn()
    render(
      <CampoFormulario
        id="telefono"
        label="Teléfono"
        value=""
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText('Teléfono'), {
      target: { value: '+56912345678' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
