import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Categorias() {
  const navigate = useNavigate();
  const { productos } = useProductos();

  useTituloPagina('Categorías');

  const categorias = [...new Set(productos.map((producto) => producto.categoria))]
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map((nombre) => ({
      nombre,
      cantidad: productos.filter((producto) => producto.categoria === nombre).length
    }));

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2 mb-2">Categorías de productos</h1>
        <p className="text-muted mb-4">
          Explora nuestros productos por categoría.
        </p>

        {categorias.length === 0 ? (
          <p role="status" className="text-muted">
            No hay categorías disponibles por el momento.
          </p>
        ) : (
          <div className="row g-3">
            {categorias.map((categoria) => (
              <div className="col-12 col-sm-6 col-lg-4" key={categoria.nombre}>
                <article className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h2 className="h5 card-title">{categoria.nombre}</h2>
                    <p className="card-text text-muted">
                      {categoria.cantidad}{' '}
                      {categoria.cantidad === 1 ? 'producto' : 'productos'}
                    </p>
                    <Boton
                      texto="Ver productos"
                      className="mt-auto align-self-start"
                      onClick={() => navigate(
                        `/catalogo?categoria=${encodeURIComponent(categoria.nombre)}`
                      )}
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Categorias;
