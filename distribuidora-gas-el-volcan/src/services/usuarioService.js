// usuarioService: registro e ingreso de usuarios (datos simulados en localStorage).
// OJO: solo para el Parcial 2. En el Parcial 3 el backend guardará la clave cifrada;
// aquí se guarda tal cual porque no hay servidor.

const CLAVE = 'usuarios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ: todos los usuarios
export function listarUsuarios() {
  return leer();
}

// CREATE: registra un usuario. El correo no puede repetirse (sin distinguir mayúsculas).
export function registrarUsuario({ nombre, email, clave }) {
  const lista = leer();
  const correo = email.trim().toLowerCase();

  if (lista.some((usuario) => usuario.email === correo)) {
    throw new Error('Ya existe una cuenta con ese correo');
  }

  const nuevo = {
    id: Math.max(0, ...lista.map((usuario) => usuario.id)) + 1,
    nombre: nombre.trim(),
    email: correo,
    clave
  };

  guardar([...lista, nuevo]);
  return nuevo;
}

// Devuelve el usuario si el correo y la clave coinciden; si no, null.
export function autenticar(email, clave) {
  const correo = email.trim().toLowerCase();

  return leer().find((usuario) => usuario.email === correo && usuario.clave === clave) ?? null;
}
