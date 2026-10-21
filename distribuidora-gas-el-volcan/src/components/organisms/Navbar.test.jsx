import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renderiza la marca, enlaces por defecto y marca como activo el enlace actual', () => {
    render(<Navbar rutaActual="/catalogo" />)

    expect(screen.getByRole('link', { name: 'Gas El Volcán' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inicio' })).not.toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Catálogo' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('muestra el ícono de carrito con la cantidad de productos y navega al pulsar enlaces', () => {
    const onNavegar = vi.fn()
    const enlaces = [
      { id: 'inicio', texto: 'Inicio', ruta: '/' },
      { id: 'carrito', texto: 'Carrito', ruta: '/carrito' }
    ]

    render(
      <Navbar
        enlaces={enlaces}
        cantidadCarrito={3}
        onNavegar={onNavegar}
      />
    )

    const botonCarrito = screen.getByRole('link', { name: 'Carrito, 3 productos' })
    expect(botonCarrito).toBeInTheDocument()

    fireEvent.click(botonCarrito)
    expect(onNavegar).toHaveBeenCalledWith('/carrito')
  })

  it('permite abrir y cerrar el menú colapsable en dispositivos móviles', () => {
    render(<Navbar />)

    const botonMenu = screen.getByRole('button', { name: 'Abrir menú' })
    expect(botonMenu).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(botonMenu)
    expect(botonMenu).toHaveAttribute('aria-expanded', 'true')
  })
})
