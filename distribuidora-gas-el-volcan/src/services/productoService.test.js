import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { productosCatalogo } from '../data/productos'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from './productoService'

const productoNuevo = {
  id: 'TEST01',
  categoria: 'Accesorios',
  nombre: 'Producto de prueba',
  descripcion: 'Solo para pruebas',
  unidad: 'Unidad',
  precioResidencial: 1000,
  precioComercial: 900,
  stock: 5
}

describe('productoService (CRUD con localStorage)', () => {
  // Preparación y limpieza: cada caso parte con localStorage vacío
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('lista los productos de partida la primera vez', () => {
    expect(listarProductos()).toHaveLength(productosCatalogo.length)
  })

  it('crea un producto y lo deja guardado', () => {
    crearProducto(productoNuevo)

    expect(listarProductos()).toHaveLength(productosCatalogo.length + 1)
    expect(obtenerProducto('TEST01')).toEqual(productoNuevo)
  })

  it('no permite crear dos productos con el mismo código', () => {
    crearProducto(productoNuevo)

    expect(() => crearProducto(productoNuevo)).toThrow('Ya existe un producto')
  })

  it('actualiza solo los campos indicados', () => {
    crearProducto(productoNuevo)

    const actualizado = actualizarProducto('TEST01', { stock: 99 })

    expect(actualizado.stock).toBe(99)
    expect(actualizado.nombre).toBe('Producto de prueba')
  })

  it('elimina un producto', () => {
    crearProducto(productoNuevo)

    eliminarProducto('TEST01')

    expect(obtenerProducto('TEST01')).toBeNull()
  })

  it('devuelve null si el producto no existe', () => {
    expect(obtenerProducto('NO-EXISTE')).toBeNull()
  })
})
