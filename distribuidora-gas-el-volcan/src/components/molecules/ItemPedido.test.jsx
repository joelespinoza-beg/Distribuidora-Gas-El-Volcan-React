import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ItemPedido from './ItemPedido'

const pedidoEjemplo = {
  id: 12,
  hora: '14:30',
  estado: 'En camino',
  cliente: 'Carlos Muñoz',
  direccion: 'Av. O’Higgins 450, Chillán',
  productos: [
    { id: 'CL002', nombre: 'Cilindro GLP 11 kg', cantidad: 2 },
    { id: 'RG001', nombre: 'Regulador doméstico estándar', cantidad: 1 }
  ],
  total: 32990
}

describe('ItemPedido', () => {
  it('muestra los datos del pedido, productos, estado y total formateado', () => {
    render(<ItemPedido pedido={pedidoEjemplo} />)

    expect(screen.getByRole('heading', { name: 'Pedido #12' })).toBeInTheDocument()
    expect(screen.getByText('14:30')).toBeInTheDocument()
    expect(screen.getByText('En camino')).toBeInTheDocument()
    expect(screen.getByText('Carlos Muñoz')).toBeInTheDocument()
    expect(screen.getByText('Av. O’Higgins 450, Chillán')).toBeInTheDocument()
    expect(screen.getByText('2 x Cilindro GLP 11 kg')).toBeInTheDocument()
    expect(screen.getByText('1 x Regulador doméstico estándar')).toBeInTheDocument()
    expect(screen.getByText('$ 32.990')).toBeInTheDocument()
  })

  it('renderiza las acciones personalizadas cuando se proporcionan', () => {
    render(
      <ItemPedido
        pedido={pedidoEjemplo}
        acciones={<button type="button">Ver detalle</button>}
      />
    )

    expect(screen.getByRole('button', { name: 'Ver detalle' })).toBeInTheDocument()
  })
})
