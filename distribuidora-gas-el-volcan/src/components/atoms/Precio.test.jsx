import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Precio from './Precio'

describe('Precio', () => {
  it('muestra el monto formateado con el símbolo de moneda predeterminado', () => {
    render(<Precio monto={1800} />)

    expect(screen.getByText('$ 1.800')).toBeInTheDocument()
  })

  it('admite el valor mediante la propiedad valor', () => {
    render(<Precio valor={2200} />)

    expect(screen.getByText('$ 2.200')).toBeInTheDocument()
  })

  it('prioriza valor cuando se proporcionan valor y monto', () => {
    render(<Precio valor={1800} monto={2200} />)

    expect(screen.getByText('$ 1.800')).toBeInTheDocument()
    expect(screen.queryByText('$ 2.200')).not.toBeInTheDocument()
  })

  it('muestra cero como un precio válido', () => {
    render(<Precio monto={0} />)

    expect(screen.getByText('$ 0')).toBeInTheDocument()
  })

  it('permite personalizar moneda, id y clases', () => {
    render(<Precio monto={1800} moneda="CLP" id="precio-producto" className=" destacado " />)

    const precio = screen.getByText('CLP 1.800')
    expect(precio).toHaveAttribute('id', 'precio-producto')
    expect(precio).toHaveClass('destacado')
  })
})
