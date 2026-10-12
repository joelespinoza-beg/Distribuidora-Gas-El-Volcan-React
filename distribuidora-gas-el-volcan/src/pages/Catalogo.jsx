import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoGas from '../components/organisms/CatalogoGas';
import { cilindros } from '../data/cilindros';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Catalogo() {
  const navigate = useNavigate();

  useTituloPagina('Catálogo');

  const handleAgregar = (producto) => {
    console.log('Agregando al carrito:', producto.nombre);
  };

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <CatalogoGas
          cilindros={cilindros}
          onAgregar={handleAgregar}
          onVer={(producto) => navigate(`/producto/${producto.id}`)}
        />
      </div>
    </PlantillaPublica>
  );
}

export default Catalogo;