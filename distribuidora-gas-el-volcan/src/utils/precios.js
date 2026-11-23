
export function precioSegunCliente(producto, tipo) {
  if (tipo === 'comercial') {
    return producto.precioComercial;
  }
  return producto.precioResidencial;
}
