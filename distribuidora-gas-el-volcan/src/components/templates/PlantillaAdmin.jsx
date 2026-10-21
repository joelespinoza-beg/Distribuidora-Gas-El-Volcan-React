import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

// Esqueleto de las páginas del panel (administrador, operadora y repartidor).
// Reutiliza el Navbar con otros enlaces; como PlantillaPublica, es quien usa el router.
const enlacesAdmin = [
  { id: 'productos', texto: 'Productos', ruta: '/admin/productos' },
  { id: 'pedidos', texto: 'Pedidos del día', ruta: '/operadora' },
  { id: 'entregas', texto: 'Entregas', ruta: '/repartidor' }
];

function PlantillaAdmin(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        marca="Panel Gas El Volcán"
        enlaces={enlacesAdmin}
        rutaActual={ubicacion.pathname}
        onNavegar={navigate}
        textoLogin="Salir"
        rutaLogin="/"
      />

      <main className="container py-4 flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaAdmin;
