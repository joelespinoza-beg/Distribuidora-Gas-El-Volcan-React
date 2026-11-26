import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { useAutenticacion } from '../../hooks/useAutenticacion';

const enlacesPorRol = {
  OPERADORA: [
    { id: 'pedidos', texto: 'Pedidos del día', ruta: '/operadora' }
  ],
  REPARTIDOR: [
    { id: 'entregas', texto: 'Mis entregas', ruta: '/repartidor' }
  ],
  ADMIN: [
    { id: 'productos', texto: 'Productos', ruta: '/admin/productos' },
    { id: 'usuarios', texto: 'Usuarios', ruta: '/admin/usuarios' },
    { id: 'pedidos', texto: 'Pedidos del día', ruta: '/operadora' },
    { id: 'entregas', texto: 'Entregas', ruta: '/repartidor' }
  ]
};

const enlacesAdmin = [
  { id: 'productos', texto: 'Productos', ruta: '/admin/productos' },
  { id: 'pedidos', texto: 'Pedidos del día', ruta: '/operadora' },
  { id: 'entregas', texto: 'Entregas', ruta: '/repartidor' }
];

function PlantillaAdmin(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { usuario, cargandoSesion, cerrarSesion } = useAutenticacion();
  const enlaces = enlacesPorRol[usuario?.rol] ?? enlacesAdmin;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        marca="Panel Gas El Volcán"
        enlaces={enlaces}
        rutaActual={ubicacion.pathname}
        onNavegar={navigate}
        usuario={usuario}
        cargandoSesion={cargandoSesion}
        onCerrarSesion={() => {
          cerrarSesion();
          navigate('/');
        }}
      />

      <main className="container py-4 flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaAdmin;
