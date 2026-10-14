import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CatalogoGas from './CatalogoGas'

const cilindrosMock = [
  {
    id: 1,
    nombre: 'Cilindro 15 Kg',
    precio: 23500,
    descripcion: 'Ideal para familias grandes',
    imagen: '/img/15kg.png',
    stock: 10
  },
  {
    id: 2,
    nombre: 'Cilindro 11 Kg',
    precio: 18500,
    descripcion: 'Formato estándar hogar',
    imagen: '/img/11kg.png',
    stock: 8
  }
]

describe('CatalogoGas', () => {
  it('muestra el título de la sección incluso si la lista de cilindros está vacía', () => {
    render(<CatalogoGas cilindros={[]} />)
    expect(screen.getByRole('heading', { name: 'Nuestros Cilindros' })).toBeInTheDocument()
  })

  it('renderiza las tarjetas de los cilindros enviados por props', () => {
    render(<CatalogoGas cilindros={cilindrosMock} />)
    expect(screen.getByText('Cilindro 15 Kg')).toBeInTheDocument()
    expect(screen.getByText('Cilindro 11 Kg')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /agregar al carrito/i })).toHaveLength(2)
  })

  it('ejecuta onAgregar cuando el usuario hace clic en Agregar al carrito', async () => {
    const handleAgregar = vi.fn()
    render(<CatalogoGas cilindros={[cilindrosMock[0]]} onAgregar={handleAgregar} />)

    await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    expect(handleAgregar).toHaveBeenCalledTimes(1)
  })
})
