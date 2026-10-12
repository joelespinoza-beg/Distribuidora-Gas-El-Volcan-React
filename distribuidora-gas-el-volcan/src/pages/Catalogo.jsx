import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoGas from '../components/organism/CatalogoGas';
import { cilindros } from '../data/cilindros';

function Catalogo() {
  const handleAgregar = (producto) => {
    console.log('Agregando al carrito:', producto.nombre);
  };

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <CatalogoGas cilindros={cilindros} onAgregar={handleAgregar} />
      </div>
    </PlantillaPublica>
  );
}

export default Catalogo;