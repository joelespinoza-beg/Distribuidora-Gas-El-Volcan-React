// pedidoService: guarda los pedidos de gas y cambia su estado.
// Un pedido: { id, cliente, telefono, direccion, zona, tipoCliente, producto, cantidad,
//              precioUnitario, total, metodoPago, estado, repartidorId, hora }

// Estados por los que avanza un pedido (los mismos que usan las listas y el seguimiento)
export const ESTADOS_PEDIDO = ['pendiente', 'asignado', 'en_camino', 'entregado'];

const CLAVE = 'pedidos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ: todos los pedidos
export function listarPedidos() {
  return leer();
}

// READ: un pedido por su número (o null)
export function obtenerPedido(id) {
  return leer().find((p) => p.id === id) ?? null;
}

// CREATE: registra un pedido nuevo. Siempre parte "pendiente" y sin repartidor.
export function crearPedido(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1;
  const nuevo = {
    ...datos,
    id: nuevoId,
    estado: 'pendiente',
    repartidorId: null,
    hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  };

  guardar([...lista, nuevo]);
  return nuevo;
}

// UPDATE: cambia los campos indicados
export function actualizarPedido(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p));

  guardar(lista);
  return lista.find((p) => p.id === id) ?? null;
}

// La operadora asigna un repartidor: el pedido pasa a "asignado"
export function asignarRepartidor(id, repartidorId) {
  return actualizarPedido(id, { repartidorId, estado: 'asignado' });
}

// El repartidor marca "en_camino" o "entregado"
export function cambiarEstado(id, estado) {
  return actualizarPedido(id, { estado });
}
