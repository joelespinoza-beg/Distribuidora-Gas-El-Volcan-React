import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { useCarrito } from '../../context/CarritoContext';
import { useAutenticacion } from '../../hooks/useAutenticacion';

const enlacesPublicos = [
  { id: 'inicio', texto: 'Inicio', ruta: '/' },
  { id: 'catalogo', texto: 'Catálogo', ruta: '/catalogo' },
  { id: 'categorias', texto: 'Categorías', ruta: '/categorias' },
  { id: 'ofertas', texto: 'Ofertas', ruta: '/ofertas' },
  { id: 'nosotros', texto: 'Nosotros', ruta: '/nosotros' },
  { id: 'carrito', texto: 'Carrito', ruta: '/carrito' },
  { id: 'pedido', texto: 'Pedir gas', ruta: '/pedido/nuevo' },
  { id: 'seguimiento', texto: 'Seguimiento', ruta: '/seguimiento' }
];

function PlantillaPublica(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { cantidadTotal } = useCarrito();
  const { usuario, cargandoSesion, cerrarSesion } = useAutenticacion();
  const enlacesRol = {
    OPERADORA: { id: 'panel', texto: 'Pedidos del día', ruta: '/operadora' },
    REPARTIDOR: { id: 'panel', texto: 'Mis entregas', ruta: '/repartidor' },
    ADMIN: { id: 'panel', texto: 'Panel interno', ruta: '/admin/productos' }
  };
  const enlaces = enlacesRol[usuario?.rol]
    ? [...enlacesPublicos, enlacesRol[usuario.rol]]
    : enlacesPublicos;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={enlaces}
        rutaActual={ubicacion.pathname}
        cantidadCarrito={cantidadTotal}
        onNavegar={navigate}
        usuario={usuario}
        cargandoSesion={cargandoSesion}
        onCerrarSesion={() => {
          cerrarSesion();
          navigate('/');
        }}
      />

      <main className="flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;
