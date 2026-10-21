import React, { useState } from 'react';

const enlacesPorDefecto = [
  { id: 'inicio', texto: 'Inicio', ruta: '/' },
  { id: 'catalogo', texto: 'Catálogo', ruta: '/catalogo' },
  { id: 'categorias', texto: 'Categorías', ruta: '/categorias' }
];


function Navbar(props) {
  const enlaces = props.enlaces ?? enlacesPorDefecto;
  const rutaLogin = props.rutaLogin || '/login';
  const rutaActual = props.rutaActual || '';
  const [abierto, setAbierto] = useState(false);

  function ir(evento, ruta) {
    evento.preventDefault();
    setAbierto(false);
    props.onNavegar?.(ruta);
  }

  function estaActivo(ruta) {
    return ruta === '/' ? rutaActual === '/' : rutaActual.startsWith(ruta);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <a href="/" className="navbar-brand fw-bold" onClick={(e) => ir(e, '/')}>
          {props.marca || 'Gas El Volcán'}
        </a>

        <button
          type="button"
          className="navbar-toggler"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {enlaces.map((enlace) => (
              <li key={enlace.id} className="nav-item">
                <a
                  href={enlace.ruta}
                  className={`nav-link ${estaActivo(enlace.ruta) ? 'active' : ''}`.trim()}
                  onClick={(e) => ir(e, enlace.ruta)}
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={rutaLogin}
            className="btn btn-outline-light"
            onClick={(e) => ir(e, rutaLogin)}
          >
            {props.textoLogin || 'Ingresar'}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;