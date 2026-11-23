import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

import { api } from './api'
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

describe('productoService (CRUD con Axios)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lista los productos desde la API', async () => {
    api.get.mockResolvedValue({ data: [productoNuevo] })

    await expect(listarProductos()).resolves.toEqual([productoNuevo])
    expect(api.get).toHaveBeenCalledWith('/productos')
  })

  it('obtiene un producto por identificador', async () => {
    api.get.mockResolvedValue({ data: productoNuevo })

    await expect(obtenerProducto('TEST01')).resolves.toEqual(productoNuevo)
    expect(api.get).toHaveBeenCalledWith('/productos/TEST01')
  })

  it('crea un producto con el DTO esperado', async () => {
    api.post.mockResolvedValue({ data: productoNuevo })

    await expect(crearProducto(productoNuevo)).resolves.toEqual(productoNuevo)
    expect(api.post).toHaveBeenCalledWith('/productos', productoNuevo)
  })

  it('actualiza un producto mediante PUT', async () => {
    api.put.mockResolvedValue({ data: { ...productoNuevo, stock: 99 } })

    await expect(actualizarProducto('TEST01', { stock: 99 })).resolves.toMatchObject({ stock: 99 })
    expect(api.put).toHaveBeenCalledWith('/productos/TEST01', { stock: 99 })
  })

  it('elimina un producto mediante DELETE', async () => {
    api.delete.mockResolvedValue({ data: null })

    await eliminarProducto('TEST01')

    expect(api.delete).toHaveBeenCalledWith('/productos/TEST01')
  })
})
