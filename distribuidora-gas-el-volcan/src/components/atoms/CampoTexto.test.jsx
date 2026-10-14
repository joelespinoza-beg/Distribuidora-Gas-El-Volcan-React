import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CampoTexto from './CampoTexto'

describe('CampoTexto', () => {
  it('renderiza como campo de texto con su placeholder', () => {
    render(<CampoTexto placeholder="Ingresa tu nombre" />)

    const campo = screen.getByPlaceholderText('Ingresa tu nombre')
    expect(campo).toHaveAttribute('type', 'text')
    expect(campo).toHaveClass('form-control')
  })

  it('muestra el valor proporcionado', () => {
    render(<CampoTexto value="Ana Pérez" onChange={() => {}} />)

    expect(screen.getByDisplayValue('Ana Pérez')).toBeInTheDocument()
  })

  it('notifica los cambios de valor mediante onChange', () => {
    const onChange = vi.fn((event) => event.target.value)
    render(<CampoTexto value="" onChange={onChange} placeholder="Correo" />)

    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'ana@ejemplo.cl' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveReturnedWith('ana@ejemplo.cl')
  })

  it('permite configurar tipo, id, name y clases', () => {
    render(
      <CampoTexto
        type="email"
        id="correo-cliente"
        name="correo"
        value=""
        onChange={() => {}}
        className=" campo-login "
        placeholder="Correo electrónico"
      />,
    )

    const campo = screen.getByPlaceholderText('Correo electrónico')
    expect(campo).toHaveAttribute('type', 'email')
    expect(campo).toHaveAttribute('id', 'correo-cliente')
    expect(campo).toHaveAttribute('name', 'correo')
    expect(campo).toHaveClass('form-control', 'campo-login')
  })

  it('marca el campo como requerido cuando corresponde', () => {
    render(<CampoTexto value="" onChange={() => {}} required />)

    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('deshabilita el campo cuando disabled es verdadero', () => {
    render(<CampoTexto value="Solo lectura" onChange={() => {}} disabled />)

    expect(screen.getByDisplayValue('Solo lectura')).toBeDisabled()
  })
})