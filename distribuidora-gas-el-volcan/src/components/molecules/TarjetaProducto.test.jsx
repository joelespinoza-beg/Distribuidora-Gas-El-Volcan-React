import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import TarjetaProducto from './TarjetaProducto'

const productoMock = {
  id: 'CL002',
  nombre: 'Cilindro GLP 11 kg',
  descripcion: 'Formato estándar doméstico',
  precio: 12000
}

describe('TarjetaProducto', () => {
  it('muestra el nombre, descripción y precio del producto', () => {
    render(<TarjetaProducto producto={productoMock} />)

    expect(screen.getByRole('heading', { name: 'Cilindro GLP 11 kg' })).toBeInTheDocument()
    expect(screen.getByText('Formato estándar doméstico')).toBeInTheDocument()
    expect(screen.getByText('$ 12.000')).toBeInTheDocument()
  })

  it('ejecuta onAgregar y onVer con el producto cuando se pulsan sus botones', () => {
    const onAgregar = vi.fn()
    const onVer = vi.fn()

    render(
      <TarjetaProducto
        producto={productoMock}
        textoBoton="Agregar al carrito"
        onAgregar={onAgregar}
        onVer={onVer}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Ver detalle' }))
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    expect(onVer).toHaveBeenCalledWith(productoMock)
    expect(onAgregar).toHaveBeenCalledWith(productoMock)
  })

  it('deshabilita el botón de agregar cuando disabled es verdadero', () => {
    render(<TarjetaProducto producto={productoMock} disabled />)

    expect(screen.getByRole('button', { name: 'Agregar' })).toBeDisabled()
  })
})
