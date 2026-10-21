import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  agregarAlCarrito,
  cambiarCantidadCarrito,
  listarCarrito,
  quitarDelCarrito,
  vaciarCarrito
} from './carritoService';

const producto = {
  id: 'CL001',
  nombre: 'Cilindro GLP 5 kg',
  categoria: 'Cilindros de Gas',
  stock: 3
};

describe('carritoService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('agrega un producto y conserva la solicitud en localStorage', () => {
    agregarAlCarrito(producto, 6500, 'residencial');

    expect(listarCarrito()).toEqual([expect.objectContaining({
      id: 'CL001',
      precio: 6500,
      cantidad: 1
    })]);
  });

  it('incrementa la cantidad del producto existente y no supera el stock', () => {
    agregarAlCarrito(producto, 6500);
    agregarAlCarrito(producto, 6500);
    agregarAlCarrito(producto, 6500);

    expect(() => agregarAlCarrito(producto, 6500)).toThrow('No hay más stock');
    expect(listarCarrito()[0].cantidad).toBe(3);
  });

  it('no mezcla el precio regular y el promocional de un mismo producto', () => {
    agregarAlCarrito(producto, 6500, 'residencial');

    expect(() => agregarAlCarrito(producto, 5850, 'Oferta 10%'))
      .toThrow('ya está en la solicitud con otro precio');
    expect(listarCarrito()[0]).toEqual(expect.objectContaining({
      precio: 6500,
      cantidad: 1
    }));
  });

  it('permite cambiar la cantidad, quitar artículos y vaciar el carrito', () => {
    agregarAlCarrito(producto, 6500);
    cambiarCantidadCarrito('CL001', 2);
    expect(listarCarrito()[0].cantidad).toBe(2);

    quitarDelCarrito('CL001');
    expect(listarCarrito()).toEqual([]);

    agregarAlCarrito(producto, 6500);
    vaciarCarrito();
    expect(listarCarrito()).toEqual([]);
  });
});
