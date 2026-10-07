import React, { useState } from 'react';
import Boton from '../atoms/Boton';

const enlacesPorDefecto = [
  { id: 'inicio', texto: 'Inicio', href: '/' },
  { id: 'catalogo', texto: 'Catálogo', href: '/catalogo' }
];

function Navbar(props) {
  const enlaces = props.enlaces ?? enlacesPorDefecto;
  const [abierto, setAbierto] = useState(false);

  const handleClick = (event, enlace) => {
    if (props.onNavegar) {
      event.preventDefault();
      props.onNavegar(enlace.id);
    }
    setAbierto(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <span className="navbar-brand fw-bold">
          {props.marca || 'Gas El Volcán'}
        </span>

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
                  href={enlace.href}
                  className={`nav-link ${props.paginaActual === enlace.id ? 'active' : ''}`}
                  onClick={(event) => handleClick(event, enlace)}
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>

          {props.onLogin && (
            <Boton
              texto={props.textoLogin || 'Ingresar'}
              variante="outline-light"
              onClick={props.onLogin}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;