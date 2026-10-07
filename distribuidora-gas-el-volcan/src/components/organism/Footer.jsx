import React from 'react';

const infoPorDefecto = {
  nombre: 'Distribuidora de Gas El Volcán',
  ubicacion: 'Chillán, Región de Ñuble, Chile',
  telefono: '(42) 222 3344',
  whatsapp: '+56 9 8765 4321',
  horarios: [
    'Lunes a Sábado 08:00 - 20:00 hrs',
    'Domingos 09:00 - 15:00 hrs'
  ]
};

function Footer(props) {
  const info = { ...infoPorDefecto, ...props.info };
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="fw-bold mb-1">{info.nombre}</p>
        <p className="small mb-1">{info.ubicacion}</p>
        <p className="small mb-1">
          Teléfono: {info.telefono} | WhatsApp: {info.whatsapp}
        </p>
        <p className="small mb-3">
          Horarios: {info.horarios.join(' | ')}
        </p>
        <p className="small text-secondary mb-0">
          &copy; {anio} {info.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;