import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { articulosBlog } from '../data/articulosBlog';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const articulo = id ? articulosBlog.find((item) => item.id === id) : null;

  useTituloPagina(articulo ? articulo.titulo : 'Blog');

  return (
    <PlantillaPublica>
      <div className="container py-5">
        {id && !articulo ? (
          <section>
            <h1 className="h2">Artículo no encontrado</h1>
            <Link to="/blog">Volver al blog</Link>
          </section>
        ) : articulo ? (
          <article>
            <Link to="/blog" className="d-inline-block mb-3">← Volver al blog</Link>
            <h1 className="h2">{articulo.titulo}</h1>
            <p className="lead text-muted">{articulo.resumen}</p>
            {articulo.contenido.map((parrafo) => <p key={parrafo}>{parrafo}</p>)}
          </article>
        ) : (
          <>
            <h1 className="h2 mb-4">Consejos y novedades</h1>
            <div className="row g-3">
              {articulosBlog.map((entrada) => (
                <div className="col-12 col-md-6" key={entrada.id}>
                  <article className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h2 className="h5">{entrada.titulo}</h2>
                      <p className="text-muted">{entrada.resumen}</p>
                      <Link className="mt-auto" to={`/blog/${entrada.id}`}>
                        Leer artículo
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Boton
                texto="Contactarnos"
                variante="outline-primary"
                onClick={() => navigate('/nosotros')}
              />
            </div>
          </>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Blog;
