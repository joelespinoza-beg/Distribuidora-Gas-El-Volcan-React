import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function NoEncontrada() {
  const navigate = useNavigate();

  useTituloPagina('Página no encontrada');

  return (
    <PlantillaPublica>
      <div className="container py-5 text-center">
        <h2>Página no encontrada</h2>
        <p className="text-muted">La dirección que escribiste no existe.</p>
        <Boton texto="Ir al catálogo" onClick={() => navigate('/catalogo')} />
      </div>
    </PlantillaPublica>
  );
}

export default NoEncontrada;