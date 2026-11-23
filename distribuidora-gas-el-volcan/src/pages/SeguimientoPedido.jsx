import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { usePedidos } from '../context/PedidosContext';
import Boton from '../components/atoms/Boton';
import CampoFormulario from '../components/molecules/CampoFormulario';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Seguimiento(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { buscarPorId } = usePedidos();

  const [idBuscado, setIdBuscado] = useState(id || '');
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(Boolean(id));
  const [error, setError] = useState('');

  useTituloPagina('Seguimiento de pedido');

  useEffect(() => {
    if (!id) return;
    
    setCargando(true);
    buscarPorId(id)
      .then((datos) => {
        setPedido(datos);
        setError('');
      })
      .catch(() => {
        setPedido(null);
        setError('No se encontró un pedido con ese ID.');
      })
      .finally(() => setCargando(false));
  }, [id, buscarPorId]);

  function buscar(e) {
    e.preventDefault();
    if (!idBuscado.trim()) return;
    navigate(`/seguimiento/${idBuscado.trim()}`);
  }

  return (
    <PlantillaPublica>
      <div className="container py-5">
        <div className="card p-4 mx-auto mb-4" style={{ maxWidth: '500px' }}>
          <h1 className="h4 mb-3 text-center">Rastrea tu pedido</h1>
          <form onSubmit={buscar} className="d-flex gap-2">
            <CampoFormulario
              id="idPedido"
              name="idPedido"
              placeholder="Ingresa el ID (Ej: PED-123)"
              value={idBuscado}
              onChange={(e) => setIdBuscado(e.target.value)}
            />
            <Boton type="submit" texto="Buscar" />
          </form>
        </div>

        {cargando && <p className="text-center">Buscando pedido...</p>}
        {error && !cargando && <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: '500px' }}>{error}</div>}

        {pedido && !cargando && (
          <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
            <h2 className="h5 border-bottom pb-2 mb-3">Detalle del Pedido #{pedido.id}</h2>
            <p><strong>Estado:</strong> <span className="badge bg-primary text-uppercase">{pedido.estado}</span></p>
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <p><strong>Dirección:</strong> {pedido.direccion}, {pedido.zona}</p>
            <p><strong>Total:</strong> ${pedido.total}</p>
          </div>
        )}
      </div>
    </PlantillaPublica>
  );
}

export default Seguimiento;