import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const enlacesPublicos = [
  { id: 'inicio', texto: 'Inicio', ruta: '/' },
  { id: 'catalogo', texto: 'Catálogo', ruta: '/catalogo' },
  { id: 'pedido', texto: 'Pedir gas', ruta: '/pedido/nuevo' },
  { id: 'seguimiento', texto: 'Seguimiento', ruta: '/seguimiento' }
];

function PlantillaPublica(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={enlacesPublicos}
        rutaActual={ubicacion.pathname}
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
