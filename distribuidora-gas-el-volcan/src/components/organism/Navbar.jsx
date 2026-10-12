import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const enlacesPorDefecto = [
  { id: 'inicio', texto: 'Inicio', to: '/' },
  { id: 'catalogo', texto: 'Catálogo', to: '/catalogo' }
];

function Navbar(props) {
  const enlaces = props.enlaces ?? enlacesPorDefecto;
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          {props.marca || 'Gas El Volcán'}
        </Link>

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
                <NavLink
                  to={enlace.to}
                  end={enlace.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}
                  onClick={() => setAbierto(false)}
                >
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to={props.rutaLogin || '/login'}
            className="btn btn-outline-light"
            onClick={() => setAbierto(false)}
          >
            {props.textoLogin || 'Ingresar'}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;