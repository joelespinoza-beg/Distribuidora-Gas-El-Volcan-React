// Reglas de validación: funciones puras.
// Reciben un valor y devuelven un mensaje de error,
// o '' (texto vacío) si el valor está bien.

export function validarObligatorio(valor, mensaje = 'Este campo es obligatorio') {
  if (!valor || String(valor).trim() === '') {
    return mensaje;
  }
  return '';
}

export function validarEmail(valor) {
  const obligatorio = validarObligatorio(valor, 'Ingresa tu correo');
  if (obligatorio) return obligatorio;

  const partes = valor.trim().split('@');

  if (partes.length !== 2) {
    return 'El correo debe tener exactamente un @';
  }

  const antes = partes[0];
  const despues = partes[1];

  if (antes === '') {
    return 'Falta algo antes del @';
  }

  if (!despues.includes('.') || despues.startsWith('.') || despues.endsWith('.')) {
    return 'Falta un punto después del @ (ejemplo: correo@dominio.cl)';
  }

  return '';
}

export function validarClave(valor) {
  const obligatorio = validarObligatorio(valor, 'Ingresa tu clave');
  if (obligatorio) return obligatorio;

  if (valor.length < 6) {
    return 'La clave debe tener al menos 6 caracteres';
  }

  return '';
}

// Número: rechaza texto vacío, texto que no es número y valores bajo el mínimo.
export function validarNumero(valor, minimo = 0) {
  const texto = String(valor ?? '').trim();

  if (texto === '') {
    return 'Ingresa un número';
  }

  const numero = Number(texto);

  if (Number.isNaN(numero)) {
    return 'Debe ser un número';
  }

  if (numero < minimo) {
    return `Debe ser ${minimo} o más`;
  }

  return '';
}

// Confirmación de clave: no puede estar vacía y debe ser igual a la clave.
export function validarConfirmacion(clave, confirmacion) {
  const obligatorio = validarObligatorio(confirmacion, 'Repite tu clave');
  if (obligatorio) return obligatorio;

  if (clave !== confirmacion) {
    return 'Las claves no coinciden';
  }

  return '';
}
