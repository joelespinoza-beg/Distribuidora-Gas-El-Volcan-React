import { describe, it, expect } from 'vitest'
import {
  validarObligatorio,
  validarEmail,
  validarClave,
  validarNumero,
  validarConfirmacion
} from './validaciones'

describe('validarObligatorio', () => {
  it('rechaza un texto vacío o con solo espacios', () => {
    expect(validarObligatorio('')).toBe('Este campo es obligatorio')
    expect(validarObligatorio('   ')).toBe('Este campo es obligatorio')
  })

  it('acepta un texto con contenido', () => {
    expect(validarObligatorio('hola')).toBe('')
  })
})

describe('validarEmail', () => {
  it('rechaza un correo sin @', () => {
    expect(validarEmail('abc')).toBe('El correo debe tener exactamente un @')
  })

  it('rechaza un correo sin punto después del @', () => {
    expect(validarEmail('joel@mail')).toContain('Falta un punto')
  })

  it('acepta un correo válido', () => {
    expect(validarEmail('joel@mail.cl')).toBe('')
  })
})

describe('validarClave', () => {
  it('rechaza una clave de menos de 6 caracteres', () => {
    expect(validarClave('12345')).toBe('La clave debe tener al menos 6 caracteres')
  })

  it('acepta una clave de 6 caracteres o más', () => {
    expect(validarClave('123456')).toBe('')
  })
})

describe('validarNumero', () => {
  it('rechaza un texto vacío o que no es número', () => {
    expect(validarNumero('')).toBe('Ingresa un número')
    expect(validarNumero('abc')).toBe('Debe ser un número')
  })

  it('rechaza un número menor al mínimo', () => {
    expect(validarNumero('-5', 0)).toBe('Debe ser 0 o más')
  })

  it('acepta un número válido, incluido el mínimo', () => {
    expect(validarNumero('12')).toBe('')
    expect(validarNumero(0, 0)).toBe('')
  })
})

describe('validarConfirmacion', () => {
  it('rechaza una confirmación vacía', () => {
    expect(validarConfirmacion('123456', '')).toBe('Repite tu clave')
  })

  it('rechaza una confirmación distinta a la clave', () => {
    expect(validarConfirmacion('123456', '654321')).toBe('Las claves no coinciden')
  })

  it('acepta una confirmación igual a la clave', () => {
    expect(validarConfirmacion('123456', '123456')).toBe('')
  })
})
