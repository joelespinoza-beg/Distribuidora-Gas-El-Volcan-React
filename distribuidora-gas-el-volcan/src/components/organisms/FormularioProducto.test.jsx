import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FormularioProducto from './FormularioProducto'

describe('FormularioProducto', () => {
  it('valida los campos obligatorios antes de crear un producto nuevo', () => {
    const onEnviar = vi.fn()
    render(<FormularioProducto onEnviar={onEnviar} />)

    expect(screen.getByRole('heading', { name: 'Nuevo producto' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(screen.getByText('Ingresa el código')).toBeInTheDocument()
    expect(screen.getByText('Ingresa la categoría')).toBeInTheDocument()
    expect(screen.getByText('Ingresa el nombre')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('envía el producto con precios y stock numéricos al completar el formulario', () => {
    const onEnviar = vi.fn()
    render(<FormularioProducto onEnviar={onEnviar} />)

    fireEvent.change(screen.getByLabelText(/Código/), { target: { value: ' CL099 ' } })
    fireEvent.change(screen.getByLabelText(/Categoría/), { target: { value: 'Cilindros de Gas' } })
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Cilindro Especial' } })
    fireEvent.change(screen.getByLabelText(/Descripción/), { target: { value: 'Formato especial' } })
    fireEvent.change(screen.getByLabelText(/Precio residencial/), { target: { value: '15000' } })
    fireEvent.change(screen.getByLabelText(/Precio comercial/), { target: { value: '13500' } })
    fireEvent.change(screen.getByLabelText(/Stock/), { target: { value: '25' } })

    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(onEnviar).toHaveBeenCalledWith({
      id: 'CL099',
      categoria: 'Cilindros de Gas',
      nombre: 'Cilindro Especial',
      descripcion: 'Formato especial',
      unidad: 'Unidad',
      precioResidencial: 15000,
      precioComercial: 13500,
      stock: 25
    })
  })

  it('carga los datos en modo edición, deshabilita el código y permite cancelar', () => {
    const onCancelar = vi.fn()
    const productoExistente = {
      id: 'CL001',
      categoria: 'Cilindros de Gas',
      nombre: 'Cilindro GLP 5 kg',
      descripcion: 'Uso doméstico',
      unidad: 'Unidad',
      precioResidencial: 6500,
      precioComercial: 6000,
      stock: 80
    }

    render(
      <FormularioProducto
        producto={productoExistente}
        onEnviar={() => {}}
        onCancelar={onCancelar}
      />
    )

    expect(screen.getByRole('heading', { name: 'Editar producto' })).toBeInTheDocument()
    expect(screen.getByLabelText(/Código/)).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancelar).toHaveBeenCalledTimes(1)
  })
})
