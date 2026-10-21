import { describe, it, expect } from 'vitest'
import { precioSegunCliente } from './precios'

const cilindro = {
  id: 'CL003',
  nombre: 'Cilindro GLP 15 kg',
  precioResidencial: 16000,
  precioComercial: 14500
}

describe('precioSegunCliente', () => {
  it('devuelve el precio residencial para un cliente residencial', () => {
    expect(precioSegunCliente(cilindro, 'residencial')).toBe(16000)
  })

  it('devuelve el precio comercial para un cliente comercial', () => {
    expect(precioSegunCliente(cilindro, 'comercial')).toBe(14500)
  })

  it('usa el precio residencial si el tipo de cliente no se reconoce', () => {
    expect(precioSegunCliente(cilindro, 'otro')).toBe(16000)
  })
})
