const CLAVE_CARRITO = 'gas-el-volcan-carrito';

export function listarCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lineas) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
}

export function agregarAlCarrito(producto, precio, tipoCliente = 'residencial') {
  const lineas = listarCarrito();
  const existente = lineas.find((linea) => linea.id === producto.id);

  if (existente) {
    if (existente.precio !== Number(precio) || existente.tipoCliente !== tipoCliente) {
      throw new Error(
        `${producto.nombre} ya está en la solicitud con otro precio. Quítalo antes de agregarlo nuevamente.`
      );
    }
    if (existente.cantidad >= producto.stock) {
      throw new Error(`No hay más stock disponible de ${producto.nombre}.`);
    }
    existente.cantidad += 1;
    guardar(lineas);
    return existente;
  }

  if (producto.stock < 1) {
    throw new Error(`${producto.nombre} no tiene stock disponible.`);
  }

  const nuevaLinea = {
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: Number(precio),
    tipoCliente,
    stock: producto.stock,
    cantidad: 1
  };

  guardar([...lineas, nuevaLinea]);
  return nuevaLinea;
}

export function cambiarCantidadCarrito(id, cantidad) {
  const lineas = listarCarrito();
  const linea = lineas.find((item) => item.id === id);
  if (!linea) throw new Error('No encontramos ese producto en el carrito.');

  const cantidadNueva = Number(cantidad);
  if (!Number.isInteger(cantidadNueva) || cantidadNueva < 1 || cantidadNueva > linea.stock) {
    throw new Error(`La cantidad debe estar entre 1 y ${linea.stock}.`);
  }

  const actualizadas = lineas.map((item) => (
    item.id === id ? { ...item, cantidad: cantidadNueva } : item
  ));
  guardar(actualizadas);
  return actualizadas;
}

export function quitarDelCarrito(id) {
  const actualizadas = listarCarrito().filter((linea) => linea.id !== id);
  guardar(actualizadas);
  return actualizadas;
}

export function vaciarCarrito() {
  guardar([]);
}
