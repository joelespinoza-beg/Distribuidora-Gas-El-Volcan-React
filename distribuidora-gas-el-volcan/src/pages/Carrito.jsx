import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

function precioFormateado(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

function Carrito() {
  const navigate = useNavigate();
  const { lineas, total, cambiarCantidad, quitar } = useCarrito();
  const [error, setError] = useState('');

  useTituloPagina('Solicitud en curso');

  function cambiar(id, valor) {
    try {
      cambiarCantidad(id, valor);
      setError('');
    } catch (fallo) {
      setError(fallo.message);
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2 mb-4">Solicitud en curso</h1>
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        {lineas.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Tu carrito está vacío.</p>
            <Boton texto="Ver catálogo" onClick={() => navigate('/catalogo')} />
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <caption className="visually-hidden">Productos de tu solicitud</caption>
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"><span className="visually-hidden">Acciones</span></th>
                  </tr>
                </thead>
                <tbody>
                  {lineas.map((linea) => (
                    <tr key={linea.id}>
                      <th scope="row">
                        {linea.nombre}
                        <span className="d-block small text-muted">{linea.tipoCliente}</span>
                      </th>
                      <td>{precioFormateado(linea.precio)}</td>
                      <td>
                        <label className="visually-hidden" htmlFor={`cantidad-${linea.id}`}>
                          Cantidad de {linea.nombre}
                        </label>
                        <input
                          id={`cantidad-${linea.id}`}
                          className="form-control"
                          type="number"
                          min="1"
                          max={linea.stock}
                          value={linea.cantidad}
                          onChange={(evento) => cambiar(linea.id, evento.target.value)}
                        />
                      </td>
                      <td>{precioFormateado(linea.precio * linea.cantidad)}</td>
                      <td>
                        <Boton
                          texto="Quitar"
                          variante="outline-danger"
                          onClick={() => quitar(linea.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <p className="h5 mb-0">Total: {precioFormateado(total)}</p>
              <div className="d-flex flex-wrap gap-2">
                <Boton
                  texto="Seguir comprando"
                  variante="outline-secondary"
                  onClick={() => navigate('/catalogo')}
                />
                <Boton texto="Continuar al checkout" onClick={() => navigate('/checkout')} />
              </div>
            </div>
          </>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Carrito;
