import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SelectorTipoClient from './SelectorTipoClient'

describe('SelectorTipoClient', () => {
  it('renderiza las opciones por defecto Residencial y Comercial', () => {
    render(<SelectorTipoClient value="residencial" onChange={() => {}} />)

    const selector = screen.getByLabelText('Tipo de cliente')
    expect(selector).toHaveValue('residencial')
    expect(screen.getByRole('option', { name: 'Residencial' })).toHaveValue('residencial')
    expect(screen.getByRole('option', { name: 'Comercial' })).toHaveValue('comercial')
  })

  it('notifica cuando cambia el tipo de cliente seleccionado', () => {
    const onChange = vi.fn()
    render(<SelectorTipoClient value="residencial" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Tipo de cliente'), {
      target: { value: 'comercial' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
