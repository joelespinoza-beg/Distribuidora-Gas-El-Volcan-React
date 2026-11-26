const RUTA_INICIAL_POR_ROL = {
  CLIENTE: '/',
  OPERADORA: '/operadora',
  REPARTIDOR: '/repartidor',
  ADMIN: '/admin/productos'
};

export function rutaInicialPorRol(rol) {
  return RUTA_INICIAL_POR_ROL[rol] ?? '/';
}
