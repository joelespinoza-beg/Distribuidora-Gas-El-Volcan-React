import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import CampoFormulario from '../components/molecules/CampoFormulario';
import CampoSelector from '../components/molecules/CampoSelector';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { usePedidos } from '../context/PedidosContext';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { actualizarPerfilCliente, obtenerPerfilCliente } from '../services/clienteService';
import { validarObligatorio, validarTelefono } from '../utils/validaciones';

const nombresRoles = {
  CLIENTE: 'Cliente',
  OPERADORA: 'Operadora',
  REPARTIDOR: 'Repartidor',
  ADMIN: 'Administrador'
};

const formularioInicial = {
  nombre: '',
  telefono: '',
  direccion: '',
  tipoCliente: 'residencial'
};

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useAutenticacion();
  const { pedidos, cargando: cargandoPedidos, error: errorPedidos } = usePedidos();
  const esCliente = usuario?.rol === 'CLIENTE';
  const Plantilla = esCliente ? PlantillaPublica : PlantillaAdmin;
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [cargandoPerfil, setCargandoPerfil] = useState(esCliente);
  const [guardando, setGuardando] = useState(false);
  const [errorPerfil, setErrorPerfil] = useState('');
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useTituloPagina('Mi perfil');

  useEffect(() => {
    if (!esCliente) return undefined;

    let activo = true;
    obtenerPerfilCliente()
      .then((perfil) => {
        if (!activo) return;
        setFormulario({
          nombre: perfil.nombre ?? usuario.nombre ?? '',
          telefono: perfil.telefono ?? '',
          direccion: perfil.direccion ?? '',
          tipoCliente: perfil.tipoCliente ?? 'residencial'
        });
      })
      .catch((fallo) => {
        if (!activo) return;
        if (fallo.status === 404) {
          setPerfilNoExiste(true);
        } else {
          setErrorPerfil(fallo.message);
        }
      })
      .finally(() => {
        if (activo) setCargandoPerfil(false);
      });

    return () => {
      activo = false;
    };
  }, [esCliente, usuario?.id, usuario?.nombre]);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setMensaje('');
  }

  async function guardar(evento) {
    evento.preventDefault();
    const nuevosErrores = {
      nombre: validarObligatorio(formulario.nombre, 'Ingresa tu nombre'),
      telefono: validarTelefono(formulario.telefono),
      direccion: validarObligatorio(formulario.direccion, 'Ingresa tu dirección habitual'),
      tipoCliente: formulario.tipoCliente ? '' : 'Selecciona el tipo de cliente'
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    setGuardando(true);
    setErrorPerfil('');
    try {
      await actualizarPerfilCliente({
        nombre: formulario.nombre.trim(),
        telefono: formulario.telefono.trim(),
        direccion: formulario.direccion.trim(),
        tipoCliente: formulario.tipoCliente
      });
      setMensaje('Perfil actualizado. Tus datos se usarán como valores iniciales en el checkout.');
    } catch (fallo) {
      setErrorPerfil(fallo.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <Plantilla>
      <div className="container py-4">
        <h1 className="h2">Mi perfil</h1>
        <div className="card p-3 mb-4">
          <dl className="row mb-0">
            <dt className="col-sm-3">Nombre de cuenta</dt>
            <dd className="col-sm-9">{usuario?.nombre || 'No disponible'}</dd>
            <dt className="col-sm-3">Correo</dt>
            <dd className="col-sm-9">{usuario?.email || 'No disponible'}</dd>
            <dt className="col-sm-3">Rol</dt>
            <dd className="col-sm-9">{nombresRoles[usuario?.rol] ?? usuario?.rol ?? 'No disponible'}</dd>
          </dl>
        </div>

        {esCliente && (
          <section className="mb-5" aria-labelledby="datos-cliente">
            <h2 className="h4" id="datos-cliente">Datos guardados del cliente</h2>
            <p className="text-muted">
              Estos datos se guardan en tu perfil. En cada checkout podrás editarlos para una entrega distinta.
              La zona de despacho se elige en cada compra.
            </p>
            {cargandoPerfil && <p role="status">Cargando tu perfil de cliente...</p>}
            {perfilNoExiste && (
              <p className="alert alert-warning" role="alert">
                Esta cuenta aún no tiene un perfil de cliente creado en el backend. Un administrador debe crear
                el perfil antes de que puedas guardar aquí tu teléfono y dirección.
              </p>
            )}
            {errorPerfil && <p className="alert alert-danger" role="alert">{errorPerfil}</p>}
            {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}

            {!cargandoPerfil && !perfilNoExiste && (
              <form className="card p-3" onSubmit={guardar} noValidate>
                <CampoFormulario
                  id="perfil-nombre"
                  name="nombre"
                  label="Nombre completo"
                  value={formulario.nombre}
                  onChange={cambiar}
                  error={errores.nombre}
                  required
                />
                <CampoFormulario
                  id="perfil-email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  value={usuario?.email ?? ''}
                  disabled
                />
                <CampoFormulario
                  id="perfil-telefono"
                  name="telefono"
                  type="tel"
                  label="Teléfono"
                  value={formulario.telefono}
                  onChange={cambiar}
                  error={errores.telefono}
                  required
                />
                <CampoFormulario
                  id="perfil-direccion"
                  name="direccion"
                  label="Dirección habitual"
                  value={formulario.direccion}
                  onChange={cambiar}
                  error={errores.direccion}
                  required
                />
                <CampoSelector
                  id="perfil-tipo-cliente"
                  name="tipoCliente"
                  label="Tipo de cliente"
                  value={formulario.tipoCliente}
                  onChange={cambiar}
                  opciones={[
                    { valor: 'residencial', texto: 'Residencial' },
                    { valor: 'comercial', texto: 'Comercial' }
                  ]}
                  error={errores.tipoCliente}
                  required
                />
                <div>
                  <Boton
                    texto={guardando ? 'Guardando perfil...' : 'Guardar perfil'}
                    type="submit"
                    disabled={guardando}
                  />
                </div>
              </form>
            )}
          </section>
        )}

        {esCliente && (
          <section aria-labelledby="historial-compras">
            <h2 className="h4" id="historial-compras">Historial de compras</h2>
            {cargandoPedidos && <p role="status">Cargando tus pedidos...</p>}
            {errorPedidos && <p className="alert alert-danger" role="alert">{errorPedidos}</p>}
            {!cargandoPedidos && !errorPedidos && pedidos.length === 0 && (
              <p>Aún no tienes compras registradas.</p>
            )}
            {!cargandoPedidos && !errorPedidos && pedidos.length > 0 && (
              <div className="list-group">
                {pedidos.map((pedido) => (
                  <article className="list-group-item" key={pedido.id}>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                      <strong>Pedido #{pedido.id}</strong>
                      <span className="badge text-bg-secondary">{pedido.estado}</span>
                    </div>
                    <p className="mb-1">
                      {pedido.productos?.length
                        ? pedido.productos.map((producto) => (
                          `${producto.cantidad} × ${producto.nombre}`
                        )).join(', ')
                        : 'Detalle de productos no disponible'}
                    </p>
                    <p className="mb-1">
                      Total: ${Number(pedido.total ?? 0).toLocaleString('es-CL')}
                      {pedido.fecha || pedido.hora ? ` · ${pedido.fecha ?? pedido.hora}` : ''}
                    </p>
                    <a
                      href={`/seguimiento/${pedido.id}`}
                      onClick={(evento) => {
                        evento.preventDefault();
                        navigate(`/seguimiento/${pedido.id}`);
                      }}
                    >
                      Ver seguimiento
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </Plantilla>
  );
}

export default Perfil;
