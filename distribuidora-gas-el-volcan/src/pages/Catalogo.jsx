import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoGas from '../components/organisms/CatalogoGas';
import SelectorTipoClient from '../components/molecules/SelectorTipoClient';
import CampoSelector from '../components/molecules/CampoSelector';
import CampoFormulario from '../components/molecules/CampoFormulario';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { precioSegunCliente } from '../utils/precios';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Catalogo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { productos } = useProductos();
  const { agregar } = useCarrito();

  // Estado de los filtros
  const [tipoCliente, setTipoCliente] = useState('residencial');
  const [categoria, setCategoria] = useState(
    () => searchParams.get('categoria') || 'todas'
  );
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorCarrito, setErrorCarrito] = useState('');

  useTituloPagina('Catálogo');

  const categorias = [...new Set(productos.map((producto) => producto.categoria))];
  const opcionesCategoria = [
    { valor: 'todas', texto: 'Todas las categorías' },
    ...categorias.map((nombre) => ({ valor: nombre, texto: nombre }))
  ];

  // Se filtra por categoría y por texto, y a cada producto se le asigna el
  // precio que corresponde al tipo de cliente elegido.
  const visibles = productos
    .filter((producto) => categoria === 'todas' || producto.categoria === categoria)
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    )
    .map((producto) => ({
      ...producto,
      precio: precioSegunCliente(producto, tipoCliente),
      tipoCliente
    }));

  return (
    <PlantillaPublica>
      <div className="container py-4">
        {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}
        {errorCarrito && <p className="alert alert-danger" role="alert">{errorCarrito}</p>}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <SelectorTipoClient
              value={tipoCliente}
              onChange={(evento) => setTipoCliente(evento.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoSelector
              id="filtro-categoria"
              name="categoria"
              label="Categoría"
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
              opciones={opcionesCategoria}
            />
          </div>
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="filtro-busqueda"
              name="busqueda"
              label="Buscar producto"
              placeholder="Ej: regulador"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
        </div>

        <CatalogoGas
          titulo="Catálogo de productos"
          textoBoton="Agregar al carrito"
          cilindros={visibles}
          onAgregar={(producto) => {
            try {
              agregar(producto, producto.precio, producto.tipoCliente);
              setErrorCarrito('');
              setMensaje(`${producto.nombre} se agregó al carrito.`);
            } catch (fallo) {
              setMensaje('');
              setErrorCarrito(fallo.message);
            }
          }}
          onVer={(producto) => navigate(`/producto/${producto.id}`)}
        />

        {visibles.length === 0 && (
          <p role="status" className="text-muted mt-3">
            No hay productos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Catalogo;
