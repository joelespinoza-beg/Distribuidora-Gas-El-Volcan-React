// Función pura: el precio depende del tipo de cliente (residencial o comercial).
export function precioSegunCliente(producto, tipo) {
  if (tipo === 'comercial') {
    return producto.precioComercial;
  }
  return producto.precioResidencial;
}
