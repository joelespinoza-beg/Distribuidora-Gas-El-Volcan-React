import React from 'react';
import Navbar from '../organism/Navbar';
import Footer from '../organism/Footer';


function PlantillaPublica(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;