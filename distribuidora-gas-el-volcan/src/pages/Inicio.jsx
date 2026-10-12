import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoGas from '../components/organism/CatalogoGas';
import Boton from '../components/atoms/Boton';
import { cilindros } from '../data/cilindros';

function Inicio() {
  const navigate = useNavigate();

  const handleAgregar = (producto) => {
    console.log('Agregando al carrito:', producto.nombre);
  };

  return (
    <PlantillaPublica>
      <div className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Distribuidora Gas El Volcán</h1>
              <p className="lead mb-4">
                Servicio de gas a domicilio confiable, seguro y directo a tu puerta.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Boton
                  texto="Ir al Catálogo"
                  variante="light"
                  className="btn-lg fw-bold"
                  onClick={() => navigate('/catalogo')}
                />
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <div className="p-5 bg-white rounded-circle shadow-sm d-inline-block opacity-25"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="card-body">
                <h3 className="h4 fw-bold text-primary mb-3">Rapidez</h3>
                <p className="card-text text-muted mb-0">
                  Contamos con una amplia flota para asegurar que tu pedido llegue en tiempo récord.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="card-body">
                <h3 className="h4 fw-bold text-primary mb-3">Calidad</h3>
                <p className="card-text text-muted mb-0">
                  Cilindros con sello de seguridad intacto, garantizando el peso exacto y tu tranquilidad.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="card-body">
                <h3 className="h4 fw-bold text-primary mb-3">Cobertura</h3>
                <p className="card-text text-muted mb-0">
                  Llegamos a todos los sectores con un servicio eficiente y cercano a tu comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-4">
          <p className="text-muted text-center mb-5">
            Elige el formato que mejor se adapte a tu hogar o negocio
          </p>
          <CatalogoGas cilindros={cilindros} onAgregar={handleAgregar} />
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default Inicio;