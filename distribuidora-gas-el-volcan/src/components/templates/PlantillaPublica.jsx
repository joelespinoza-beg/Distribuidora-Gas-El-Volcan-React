import React from 'react';
import Navbar from '../organism/Navbar';
import Footer from '../organism/Footer';


function PlantillaPublica(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        paginaActual={props.paginaActual}
        onNavegar={props.onNavegar}
        onLogin={props.onLogin}
      />

      <main className="container py-4 flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;