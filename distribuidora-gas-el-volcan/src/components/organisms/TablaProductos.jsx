import React from 'react';
import Precio from '../atoms/Precio';
import { productosCatalogo } from '../../data/productos';

function TablaProductos({ productos = productosCatalogo }) {
  return (
    <section aria-labelledby="titulo-tabla-productos">
      <h2 id="titulo-tabla-productos" className="mb-3">Productos y stock</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <caption className="visually-hidden">
            Catálogo de productos, precios y stock actual
          </caption>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Categoría</th>
              <th scope="col">Producto</th>
              <th scope="col">Unidad</th>
              <th scope="col">Precio residencial</th>
              <th scope="col">Precio comercial</th>
              <th scope="col">Stock actual</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <th scope="row">{producto.id}</th>
                <td>{producto.categoria}</td>
                <td>
                  <strong>{producto.nombre}</strong>
                  <span className="d-block small text-muted">{producto.descripcion}</span>
                </td>
                <td>{producto.unidad}</td>
                <td><Precio valor={producto.precioResidencial} /></td>
                <td><Precio valor={producto.precioComercial} /></td>
                <td>{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaProductos;
