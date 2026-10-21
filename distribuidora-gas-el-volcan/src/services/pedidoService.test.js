import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  asignarRepartidor,
  cambiarEstado
} from './pedidoService'

const datosPedido = {
  cliente: 'María Soto',
  direccion: 'Av. Libertad 123, Chillán',
  producto: { id: 'CL003', nombre: 'Cilindro GLP 15 kg' },
  cantidad: 1,
  total: 16000
}

describe('pedidoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('no tiene pedidos al comenzar', () => {
    expect(listarPedidos()).toEqual([])
  })

  it('crea el pedido como pendiente, sin repartidor y con números distintos', () => {
    const primero = crearPedido(datosPedido)
    const segundo = crearPedido(datosPedido)

    expect(primero.estado).toBe('pendiente')
    expect(primero.repartidorId).toBeNull()
    expect(segundo.id).toBe(primero.id + 1)
    expect(listarPedidos()).toHaveLength(2)
  })

  it('al asignar un repartidor el pedido pasa a asignado', () => {
    const pedido = crearPedido(datosPedido)

    asignarRepartidor(pedido.id, 'R1')

    const guardado = obtenerPedido(pedido.id)
    expect(guardado.repartidorId).toBe('R1')
    expect(guardado.estado).toBe('asignado')
  })

  it('cambia el estado del pedido y lo deja guardado', () => {
    const pedido = crearPedido(datosPedido)

    cambiarEstado(pedido.id, 'en_camino')

    expect(obtenerPedido(pedido.id).estado).toBe('en_camino')
  })
})
