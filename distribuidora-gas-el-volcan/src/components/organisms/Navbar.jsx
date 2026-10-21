import React, { useState } from 'react';

const enlacesPorDefecto = [
  { id: 'inicio', texto: 'Inicio', ruta: '/' },
  { id: 'catalogo', texto: 'Catálogo', ruta: '/catalogo' },
  { id: 'categorias', texto: 'Categorías', ruta: '/categorias' }
];


function Navbar(props) {
  const enlaces = props.enlaces ?? enlacesPorDefecto;
  const enlaceCarrito = enlaces.find((enlace) => enlace.id === 'carrito');
  const enlacesMenu = enlaces.filter((enlace) => enlace.id !== 'carrito');
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
            {enlacesMenu.map((enlace) => (
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

          <div className="d-flex align-items-center gap-3">
            {enlaceCarrito && (
              <a
                href={enlaceCarrito.ruta}
                className="btn btn-outline-light d-inline-flex align-items-center justify-content-center position-relative p-2"
                onClick={(e) => ir(e, enlaceCarrito.ruta)}
                aria-label={`Carrito${props.cantidadCarrito > 0 ? `, ${props.cantidadCarrito} productos` : ', vacío'}`}
                title="Carrito"
                style={{ width: '44px', height: '40px' }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {props.cantidadCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {props.cantidadCarrito > 99 ? '99+' : props.cantidadCarrito}
                    <span className="visually-hidden"> productos</span>
                  </span>
                )}
              </a>
            )}
            <a
              href={rutaLogin}
              className="btn btn-outline-light"
              onClick={(e) => ir(e, rutaLogin)}
            >
              {props.textoLogin || 'Ingresar'}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;