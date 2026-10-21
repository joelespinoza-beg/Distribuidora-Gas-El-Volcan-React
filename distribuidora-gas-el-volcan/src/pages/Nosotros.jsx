import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Nosotros() {
  useTituloPagina('Nosotros y contacto');

  return (
    <PlantillaPublica>
      <div className="container py-5">
        <h1 className="h2">Nosotros</h1>
        <p className="lead">
          Somos una distribuidora familiar de gas a domicilio en Chillán y sus
          comunas cercanas.
        </p>
        <p>
          En Gas El Volcán trabajamos para entregar un servicio cercano,
          confiable y seguro a hogares y comercios de la Región de Ñuble.
        </p>

        <section className="card p-4 mt-4" aria-labelledby="titulo-contacto">
          <h2 id="titulo-contacto" className="h4">Contacto</h2>
          <address className="mb-0">
            <p>Chillán, Región de Ñuble, Chile</p>
            <p>
              Teléfono: <a href="tel:+56422223344">(42) 222 3344</a>
            </p>
            <p>
              WhatsApp: <a href="https://wa.me/56987654321">+56 9 8765 4321</a>
            </p>
            <p className="mb-0">
              Horario: lunes a sábado 08:00–20:00; domingos 09:00–15:00.
            </p>
          </address>
        </section>
      </div>
    </PlantillaPublica>
  );
}

export default Nosotros;
