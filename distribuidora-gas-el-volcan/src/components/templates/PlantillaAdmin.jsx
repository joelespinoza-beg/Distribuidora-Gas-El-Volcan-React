import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../../hooks/useAutenticacion';

function PlantillaAdmin(props) {
  const { usuario, cerrarSesion } = useAutenticacion();
  const navigate = useNavigate();

  const enlacesAdmin = [
    { id: 'productos', texto: 'Productos', ruta: '/admin/productos' },
    { id: 'usuarios', texto: 'Usuarios', ruta: '/admin/usuarios' }
  ];

  function salir() {
    cerrarSesion();
    navigate('/login');
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px' }}>
        <h2 className="h5 text-center mb-4 border-bottom pb-2">Panel Admin</h2>
        
        <nav className="nav flex-column gap-2 mb-auto">
          {enlacesAdmin.map((enlace) => (
            <Link 
              key={enlace.id} 
              to={enlace.ruta} 
              className="nav-link text-white rounded bg-secondary bg-opacity-25"
            >
              {enlace.texto}
            </Link>
          ))}
        </nav>

        <div className="mt-4 pt-3 border-top text-center">
          <p className="small mb-2">Sesión: {usuario?.nombre}</p>
          <button className="btn btn-outline-light btn-sm w-100" onClick={salir}>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-grow-1 p-4">
        {props.children}
      </main>
    </div>
  );
}

export default PlantillaAdmin;