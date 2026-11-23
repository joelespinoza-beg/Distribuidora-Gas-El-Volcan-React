import { render, screen, fireEvent, within } from '@testing-library/react';
import TablaProductos from './TablaProductos';

const mockProductos = [
  { id: 1, nombre: 'Cilindro 11kg', precio: 15000, stock: 10 }
];

describe('TablaProductos', () => {
  it('renderiza correctamente con datos mockeados', () => {
    render(<TablaProductos productos={mockProductos} />);
    expect(screen.getByText('Cilindro 11kg')).toBeInTheDocument();
  });

  it('muestra la columna de acciones y ejecuta callbacks cuando se pasan las props onEditar y onEliminar', () => {
    const mockOnEditar = vi.fn(); // o jest.fn()
    const mockOnEliminar = vi.fn();

    render(
      <TablaProductos 
        productos={mockProductos} 
        onEditar={mockOnEditar} 
        onEliminar={mockOnEliminar} 
      />
    );

    const fila = screen.getByRole('row', { name: /Cilindro 11kg/i });
    const botonEditar = within(fila).getByRole('button', { name: /editar/i });
    const botonEliminar = within(fila).getByRole('button', { name: /eliminar/i });

    fireEvent.click(botonEditar);
    expect(mockOnEditar).toHaveBeenCalledWith(mockProductos[0]);

    fireEvent.click(botonEliminar);
    expect(mockOnEliminar).toHaveBeenCalledWith(mockProductos[0]);
  });
});