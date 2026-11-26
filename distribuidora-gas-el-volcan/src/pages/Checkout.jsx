import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import CampoFormulario from '../components/molecules/CampoFormulario';
import CampoSelector from '../components/molecules/CampoSelector';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { ZONAS_DESPACHO } from '../constants/zonasDespacho';
import { useCarrito } from '../context/CarritoContext';
import { usePedidos } from '../context/PedidosContext';
import { useProductos } from '../context/ProductosContext';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { obtenerPerfilCliente } from '../services/clienteService';
import { validarEmail, validarObligatorio, validarTelefono } from '../utils/validaciones';

const formularioInicial = { nombre: '', email: '', telefono: '', direccion: '', zona: '' };

function Checkout() {
  const navigate = useNavigate();
  const { lineas, total, vaciar } = useCarrito();
  const { crear } = usePedidos();
  const { recargar: recargarProductos } = useProductos();
  const { usuario } = useAutenticacion();
  const camposEditados = useRef(new Set());
  const [formulario, setFormulario] = useState(() => ({
    ...formularioInicial,
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? ''
  }));
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(usuario?.rol === 'CLIENTE');
  const [enviando, setEnviando] = useState(false);

  useTituloPagina('Confirmar solicitud');

  useEffect(() => {
    if (usuario?.rol !== 'CLIENTE') return undefined;

    let activo = true;
    obtenerPerfilCliente()
      .then((perfil) => {
        if (!activo) return;
        setFormulario((actual) => ({
          ...actual,
          nombre: camposEditados.current.has('nombre') ? actual.nombre : perfil.nombre ?? actual.nombre,
          telefono: camposEditados.current.has('telefono') ? actual.telefono : perfil.telefono ?? '',
          direccion: camposEditados.current.has('direccion') ? actual.direccion : perfil.direccion ?? ''
        }));
      })
      .catch((fallo) => {
        if (activo) setErrorPerfil(fallo);
      })
      .finally(() => {
        if (activo) setCargandoPerfil(false);
      });

    return () => {
      activo = false;
    };
  }, [usuario?.id, usuario?.rol]);

  function cambiar(evento) {
    const { name, value } = evento.target;
    camposEditados.current.add(name);
    setFormulario((actual) => ({ ...actual, [name]: value }));
  }

  function validar() {
    return {
      nombre: validarObligatorio(formulario.nombre, 'Ingresa tu nombre'),
      email: validarEmail(formulario.email),
      telefono: validarTelefono(formulario.telefono),
      direccion: validarObligatorio(formulario.direccion, 'Ingresa la dirección de entrega'),
      zona: formulario.zona ? '' : 'Selecciona una zona de despacho'
    };
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;
    if (lineas.length === 0) {
      navigate('/carrito');
      return;
    }

    setEnviando(true);
    try {
      const pedido = await crear({
        cliente: formulario.nombre,
        email: formulario.email,
        telefono: formulario.telefono,
        direccion: formulario.direccion,
        zona: formulario.zona,
        tipoCliente: lineas[0].tipoCliente,
        metodoPago: 'efectivo al recibir',
        productos: lineas.map((linea) => ({
        id: linea.id,
        cantidad: linea.cantidad
        }))
      });

      await recargarProductos();
      vaciar();
      navigate(`/pedido/resultado/${pedido.id}`);
    } catch (fallo) {
      setErrorGeneral(`No se pudo registrar la solicitud: ${fallo.message}`);
    } finally {
      setEnviando(false);
    }
  }

  if (lineas.length === 0) {
    return (
      <PlantillaPublica>
        <div className="container py-5">
          <h1 className="h2">No hay productos para confirmar</h1>
          <p>Agrega productos al carrito antes de continuar al checkout.</p>
          <Boton texto="Volver al catálogo" onClick={() => navigate('/catalogo')} />
        </div>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <h1 className="h2">Confirmar solicitud</h1>
        <p className="text-muted">Revisa los productos y completa los datos de entrega.</p>
        {errorGeneral && <p className="alert alert-danger" role="alert">{errorGeneral}</p>}
        {cargandoPerfil && <p className="text-muted" role="status">Cargando tus datos de perfil...</p>}
        {errorPerfil && (
          <p className="alert alert-warning" role="status">
            {errorPerfil.status === 404
              ? 'Tu cuenta aún no tiene un perfil de cliente guardado. Puedes completar esta compra; un administrador debe crear el perfil para guardar tus datos.'
              : `No se pudieron cargar tus datos guardados: ${errorPerfil.message}. Puedes completarlos para esta compra.`}
          </p>
        )}

        <div className="row g-4">
          <section className="col-12 col-lg-5" aria-labelledby="resumen-checkout">
            <div className="card p-3">
              <h2 className="h5" id="resumen-checkout">Resumen del pedido</h2>
              <ul className="list-group list-group-flush mb-3">
                {lineas.map((linea) => (
                  <li key={linea.id} className="list-group-item px-0 d-flex justify-content-between gap-3">
                    <span>{linea.cantidad} × {linea.nombre}</span>
                    <strong>${(linea.precio * linea.cantidad).toLocaleString('es-CL')}</strong>
                  </li>
                ))}
              </ul>
              <p className="h5">
                Total estimado: ${total.toLocaleString('es-CL')}
              </p>
              <p className="small text-muted">
                La API confirma el precio y el stock al registrar el pedido.
              </p>
              <p className="small text-muted mb-0">Pago en efectivo al recibir el pedido.</p>
            </div>
          </section>

          <form className="col-12 col-lg-7" onSubmit={enviar} noValidate>
            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-nombre"
                  name="nombre"
                  label="Nombre completo"
                  value={formulario.nombre}
                  onChange={cambiar}
                  error={errores.nombre}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  value={formulario.email}
                  onChange={cambiar}
                  error={errores.email}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  id="checkout-telefono"
                  name="telefono"
                  type="tel"
                  label="Teléfono"
                  value={formulario.telefono}
                  onChange={cambiar}
                  error={errores.telefono}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoSelector
                  id="checkout-zona"
                  name="zona"
                  label="Zona de despacho"
                  value={formulario.zona}
                  onChange={cambiar}
                  opciones={ZONAS_DESPACHO}
                  placeholder="Selecciona una zona"
                  error={errores.zona}
                  required
                />
              </div>
              <div className="col-12">
                <CampoFormulario
                  id="checkout-direccion"
                  name="direccion"
                  label="Dirección de entrega"
                  value={formulario.direccion}
                  onChange={cambiar}
                  error={errores.direccion}
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Boton
                texto="Volver al carrito"
                variante="outline-secondary"
                onClick={() => navigate('/carrito')}
              />
              <Boton
                texto={enviando ? 'Registrando pedido...' : 'Confirmar pedido'}
                type="submit"
                disabled={enviando}
              />
            </div>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default Checkout;
