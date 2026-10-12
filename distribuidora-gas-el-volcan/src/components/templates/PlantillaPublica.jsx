import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../organism/Navbar';
import Footer from '../organism/Footer';


function PlantillaPublica(props) {
  const navigate = useNavigate();
  const ubicacion = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar rutaActual={ubicacion.pathname} onNavegar={navigate} />

      <main className="flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;