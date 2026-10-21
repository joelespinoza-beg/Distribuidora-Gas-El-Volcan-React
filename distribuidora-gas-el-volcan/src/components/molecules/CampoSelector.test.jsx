import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CampoSelector from './CampoSelector'

const opciones = [
  { valor: 'centro', texto: 'Zona Centro' },
  { valor: 'sur', texto: 'Zona Sur' }
]

describe('CampoSelector', () => {
  it('renderiza la etiqueta, el placeholder y las opciones del selector', () => {
    render(
      <CampoSelector
        id="zona-despacho"
        label="Zona de despacho"
        placeholder="Selecciona una zona"
        opciones={opciones}
        value=""
        onChange={() => {}}
        required
      />
    )

    const select = screen.getByLabelText(/Zona de despacho/)
    expect(select).toBeRequired()
    expect(screen.getByRole('option', { name: 'Selecciona una zona' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Zona Centro' })).toBeInTheDocument()
  })

  it('muestra el mensaje de error y agrega la clase is-invalid cuando recibe error', () => {
    render(
      <CampoSelector
        id="zona-despacho"
        label="Zona de despacho"
        opciones={opciones}
        value=""
        onChange={() => {}}
        error="Selecciona una zona de despacho"
      />
    )

    expect(screen.getByLabelText('Zona de despacho')).toHaveClass('is-invalid')
    expect(screen.getByText('Selecciona una zona de despacho')).toBeInTheDocument()
  })

  it('ejecuta onChange al cambiar la opción seleccionada', () => {
    const onChange = vi.fn()
    render(
      <CampoSelector
        id="zona-despacho"
        label="Zona de despacho"
        opciones={opciones}
        value="centro"
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText('Zona de despacho'), {
      target: { value: 'sur' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
