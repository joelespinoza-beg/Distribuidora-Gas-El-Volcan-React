import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Selector from './Selector'

describe('Selector', () => {
  it('renderiza opciones de texto simple y el placeholder inicial', () => {
    render(
      <Selector
        id="zona"
        placeholder="Selecciona una zona"
        opciones={['Zona Centro', 'Zona Sur']}
        onChange={() => {}}
      />
    )

    expect(screen.getByRole('option', { name: 'Selecciona una zona' })).toHaveValue('')
    expect(screen.getByRole('option', { name: 'Zona Centro' })).toHaveValue('Zona Centro')
    expect(screen.getByRole('option', { name: 'Zona Sur' })).toHaveValue('Zona Sur')
  })

  it('renderiza opciones como objetos { valor, texto } y notifica cambios', () => {
    const onChange = vi.fn()
    const opciones = [
      { valor: 'residencial', texto: 'Residencial' },
      { valor: 'comercial', texto: 'Comercial' }
    ]

    render(
      <Selector
        id="tipo-cliente"
        name="tipoCliente"
        value="residencial"
        opciones={opciones}
        onChange={onChange}
      />
    )

    const selector = screen.getByRole('combobox')
    expect(selector).toHaveValue('residencial')

    fireEvent.change(selector, { target: { value: 'comercial' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('aplica los atributos disabled, required y className', () => {
    render(
      <Selector
        opciones={['Opción 1']}
        onChange={() => {}}
        disabled
        required
        className="selector-personalizado"
      />
    )

    const selector = screen.getByRole('combobox')
    expect(selector).toBeDisabled()
    expect(selector).toBeRequired()
    expect(selector).toHaveClass('form-select', 'selector-personalizado')
  })
})
