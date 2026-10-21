import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { listarUsuarios, registrarUsuario, autenticar } from './usuarioService'

const datos = { nombre: 'Joel Espinoza', email: 'Joel@Mail.cl', clave: '123456' }

describe('usuarioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('registra un usuario y lo deja guardado con el correo en minúsculas', () => {
    const nuevo = registrarUsuario(datos)

    expect(nuevo.email).toBe('joel@mail.cl')
    expect(listarUsuarios()).toHaveLength(1)
  })

  it('no permite registrar dos cuentas con el mismo correo', () => {
    registrarUsuario(datos)

    expect(() => registrarUsuario({ ...datos, email: 'JOEL@mail.cl' })).toThrow('Ya existe una cuenta')
  })

  it('autentica con el correo y la clave correctos', () => {
    registrarUsuario(datos)

    const usuario = autenticar('joel@mail.cl', '123456')

    expect(usuario.nombre).toBe('Joel Espinoza')
  })

  it('devuelve null si la clave es incorrecta o el usuario no existe', () => {
    registrarUsuario(datos)

    expect(autenticar('joel@mail.cl', 'otra-clave')).toBeNull()
    expect(autenticar('nadie@mail.cl', '123456')).toBeNull()
  })
})
