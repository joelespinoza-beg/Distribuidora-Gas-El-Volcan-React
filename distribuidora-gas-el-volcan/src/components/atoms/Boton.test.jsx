import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Boton from './Boton'

describe('Boton', () => {
  it('muestra el texto y usa la variante primaria por defecto', () => {
    render(<Boton texto="Continuar" />)

    const boton = screen.getByRole('button', { name: 'Continuar' })
    expect(boton).toHaveClass('btn', 'btn-primary')
    expect(boton).toHaveAttribute('type', 'button')
  })

  it('muestra los elementos hijos en lugar del texto', () => {
    render(<Boton texto="Texto alternativo"><span>Guardar cambios</span></Boton>)

    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Texto alternativo' })).not.toBeInTheDocument()
  })

  it('permite configurar la variante, el tipo y las clases', () => {
    render(
      <Boton
        texto="Enviar"
        variante="success"
        type="submit"
        className=" boton-formulario "
      />,
    )

    const boton = screen.getByRole('button', { name: 'Enviar' })
    expect(boton).toHaveClass('btn', 'btn-success', 'boton-formulario')
    expect(boton).toHaveAttribute('type', 'submit')
  })

  it('asigna id y name cuando se proporcionan', () => {
    render(<Boton texto="Eliminar" id="eliminar" name="accion" />)

    const boton = screen.getByRole('button', { name: 'Eliminar' })
    expect(boton).toHaveAttribute('id', 'eliminar')
    expect(boton).toHaveAttribute('name', 'accion')
  })

  it('ejecuta onClick al pulsarlo', () => {
    const onClick = vi.fn()
    render(<Boton texto="Agregar" onClick={onClick} />)

    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('deshabilita el botón y no ejecuta onClick cuando disabled es verdadero', () => {
    const onClick = vi.fn()
    render(<Boton texto="Procesando" disabled onClick={onClick} />)

    const boton = screen.getByRole('button', { name: 'Procesando' })
    expect(boton).toBeDisabled()

    fireEvent.click(boton)

    expect(onClick).not.toHaveBeenCalled()
  })
})