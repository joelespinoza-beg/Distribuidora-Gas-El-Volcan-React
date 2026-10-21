import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import SeguimientoPedido from '../components/organisms/SeguimientoPedido';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import { usePedidos } from '../context/PedidosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: seguimiento. Rutas: /seguimiento (buscar) y /seguimiento/:id (ver un pedido)
function Seguimiento() {
  const navigate = useNavigate();
  const params = useParams();
  const { obtener } = usePedidos();
  const [numero, setNumero] = useState('');

  useTituloPagina('Seguimiento del pedido');

  const pedido = params.id ? obtener(Number(params.id)) : null;

  function buscar(evento) {
    evento.preventDefault();
    if (numero.trim() !== '') {
      navigate(`/seguimiento/${numero.trim()}`);
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h2 className="mb-3">Seguimiento de tu pedido</h2>

        <form onSubmit={buscar} className="row g-2 align-items-end mb-4">
          <div className="col-12 col-md-4">
            <CampoFormulario
              id="numero-pedido"
              name="numero"
              label="Número de pedido"
              placeholder="Ej: 1"
              value={numero}
              onChange={(evento) => setNumero(evento.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Boton texto="Buscar pedido" type="submit" />
          </div>
        </form>

        {params.id && !pedido && (
          <p role="alert" className="text-danger">
            No encontramos un pedido con el número {params.id}.
          </p>
        )}

        {pedido && <SeguimientoPedido pedido={pedido} />}
      </div>
    </PlantillaPublica>
  );
}

export default Seguimiento;
