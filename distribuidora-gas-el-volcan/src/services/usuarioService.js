const CLAVE_ACCESS_TOKEN = 'gas-el-volcan-access-token';

async function solicitar(path, { method = 'GET', body, token } = {}) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '');

  if (!apiBaseUrl) {
    throw new Error('Configura VITE_API_BASE_URL para conectar con la API.');
  }

  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  const texto = await response.text();
  let datos;

  if (texto) {
    try {
      datos = JSON.parse(texto);
    } catch {
      if (response.ok) {
        throw new Error('La API devolvió una respuesta inválida.');
      }
      datos = { message: texto };
    }
  }

  if (!response.ok) {
    const mensaje = datos?.message ?? datos?.error;
    throw new Error(typeof mensaje === 'string' ? mensaje : `Error HTTP ${response.status}`);
  }

  return datos;
}

export function registrarUsuario({ nombre, email, clave }) {
  return solicitar('/auth/register', {
    method: 'POST',
    body: { nombre: nombre.trim(), email: email.trim().toLowerCase(), clave }
  });
}

export function autenticar({ email, clave }) {
  return solicitar('/auth/login', {
    method: 'POST',
    body: { email: email.trim().toLowerCase(), clave }
  });
}

export function obtenerPerfil(token) {
  return solicitar('/auth/me', { token });
}

export function leerAccessToken() {
  return localStorage.getItem(CLAVE_ACCESS_TOKEN);
}

export function guardarAccessToken(token) {
  localStorage.setItem(CLAVE_ACCESS_TOKEN, token);
}

export function eliminarAccessToken() {
  localStorage.removeItem(CLAVE_ACCESS_TOKEN);
}
