import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn()
  }
}))

import { api } from './api'
import {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  asignarRepartidor,
  cambiarEstado
} from './pedidoService'

const datosPedido = {
  cliente: 'María Soto',
  telefono: '+56912345678',
  direccion: 'Av. Libertad 123, Chillán',
  zona: 'Zona Centro',
  tipoCliente: 'residencial',
  metodoPago: 'efectivo al recibir',
  productos: [{ id: 'CL003', cantidad: 1 }]
}

describe('pedidoService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lista los pedidos desde la API', async () => {
    api.get.mockResolvedValue({ data: [{ id: 'P1' }] })

    await expect(listarPedidos()).resolves.toEqual([{ id: 'P1' }])
    expect(api.get).toHaveBeenCalledWith('/pedidos')
  })

  it('obtiene un pedido por identificador', async () => {
    api.get.mockResolvedValue({ data: { id: 'P1' } })

    await expect(obtenerPedido('P1')).resolves.toEqual({ id: 'P1' })
    expect(api.get).toHaveBeenCalledWith('/pedidos/P1')
  })

  it('envía el pedido con el DTO esperado', async () => {
    api.post.mockResolvedValue({ data: { id: 'P1', estado: 'pendiente' } })

    await expect(crearPedido(datosPedido)).resolves.toMatchObject({ estado: 'pendiente' })
    expect(api.post).toHaveBeenCalledWith('/pedidos', {
      cliente: 'María Soto',
      telefono: '+56912345678',
      direccion: 'Av. Libertad 123, Chillán',
      zona: 'Zona Centro',
      tipoCliente: 'residencial',
      metodoPago: 'efectivo al recibir',
      productos: [{ id: 'CL003', cantidad: 1 }]
    })
  })

  it('asigna un repartidor mediante PATCH', async () => {
    api.patch.mockResolvedValue({ data: { id: 'P1', estado: 'asignado' } })

    await asignarRepartidor('P1', 'R1')

    expect(api.patch).toHaveBeenCalledWith('/pedidos/P1/asignar', { repartidorId: 'R1' })
  })

  it('cambia el estado mediante PATCH', async () => {
    api.patch.mockResolvedValue({ data: { id: 'P1', estado: 'en_camino' } })

    await cambiarEstado('P1', 'en_camino')

    expect(api.patch).toHaveBeenCalledWith('/pedidos/P1/estado', { estado: 'en_camino' })
  })
})
