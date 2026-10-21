import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { useCarrito } from '../../context/CarritoContext';

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

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={enlacesPublicos}
        rutaActual={ubicacion.pathname}
        cantidadCarrito={cantidadTotal}
        onNavegar={navigate}
      />

      <main className="flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;
