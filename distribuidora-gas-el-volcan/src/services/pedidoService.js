




export const ESTADOS_PEDIDO = ['pendiente', 'asignado', 'en_camino', 'entregado'];

const CLAVE = 'pedidos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}


export function listarPedidos() {
  return leer();
}


export function obtenerPedido(id) {
  return leer().find((p) => p.id === id) ?? null;
}


export function crearPedido(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1;
  const productos = datos.productos ?? [{
    id: datos.producto?.id,
    nombre: datos.producto?.nombre ?? datos.producto,
    cantidad: datos.cantidad,
    precioUnitario: datos.precioUnitario
  }];
  const nuevo = {
    ...datos,
    productos,
    id: nuevoId,
    estado: 'pendiente',
    repartidorId: null,
    hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  };

  guardar([...lista, nuevo]);
  return nuevo;
}


export function actualizarPedido(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p));

  guardar(lista);
  return lista.find((p) => p.id === id) ?? null;
}


export function asignarRepartidor(id, repartidorId) {
  return actualizarPedido(id, { repartidorId, estado: 'asignado' });
}


export function cambiarEstado(id, estado) {
  return actualizarPedido(id, { estado });
}
