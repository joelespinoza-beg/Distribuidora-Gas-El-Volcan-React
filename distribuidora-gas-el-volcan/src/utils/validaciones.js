
export function validarObligatorio(valor, mensaje = 'Este campo es obligatorio') {
  if (!valor || valor.trim() === '') {
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