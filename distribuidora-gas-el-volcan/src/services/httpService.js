const CLAVE_ACCESS_TOKEN = 'gas-el-volcan-access-token';

function leerTokenGuardado() {
  return localStorage.getItem(CLAVE_ACCESS_TOKEN);
}

export async function solicitarApi(path, {
  method = 'GET',
  body,
  token
} = {}) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '');

  if (!apiBaseUrl) {
    throw new Error('Configura VITE_API_BASE_URL para conectar con la API.');
  }

  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const tokenActual = token === undefined ? leerTokenGuardado() : token;
  if (tokenActual) headers.Authorization = `Bearer ${tokenActual}`;

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
    const error = new Error(
      typeof mensaje === 'string' ? mensaje : `Error HTTP ${response.status}`
    );
    error.status = response.status;
    throw error;
  }

  return datos;
}

export function guardarAccessToken(token) {
  localStorage.setItem(CLAVE_ACCESS_TOKEN, token);
}

export function leerAccessToken() {
  return leerTokenGuardado();
}

export function eliminarAccessToken() {
  localStorage.removeItem(CLAVE_ACCESS_TOKEN);
}
