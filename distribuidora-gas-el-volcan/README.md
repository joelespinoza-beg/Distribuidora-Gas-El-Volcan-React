# Distribuidora Gas El Volcán - Frontend React

Proyecto académico desarrollado para el caso semestral de **DSY1104 · Desarrollo Full Stack II**.

## Integrantes

- Benjamin Gutierrez
- Nicolas Ibañez
- Joel Espinoza

## Descripción

Aplicación web para la Distribuidora de Gas El Volcán, ubicada en Chillán. Permite consultar productos, gestionar el carrito, crear pedidos, hacer seguimiento y administrar usuarios, productos, pedidos y entregas según el rol del usuario.

## Tecnologías

- React 19
- Vite 8
- React Router DOM 7
- Bootstrap 5 y React Bootstrap
- Axios
- JavaScript ES Modules
- Vitest
- Testing Library y Jest DOM
- Oxc/Oxlint

## Requisitos

- Node.js y npm
- Backend disponible con API REST
- Archivo `.env` configurado con la URL del backend

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Por defecto, el cliente Axios utiliza:

```text
http://localhost:3000/api/v1
```

Si el backend está alojado en otro servidor, cambia `.env`:

```env
VITE_API_BASE_URL=http://TU-IP-O-DOMINIO:3000/api/v1
```

La configuración debe reiniciar el servidor de Vite después de modificarse.

## Comandos disponibles

```bash
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Generar versión de producción
npm run preview   # Probar la versión compilada
npm run test      # Ejecutar pruebas en modo interactivo
npm run test:run  # Ejecutar todas las pruebas una vez
npm run test:cov  # Generar reporte de cobertura
npm run lint      # Ejecutar el analizador Oxc/Oxlint
```

## Estructura del proyecto

```text
src/
├── assets/
├── components/
│   ├── atoms/
│   │   ├── Boton.jsx
│   │   ├── ContadorCantidad.jsx
│   │   ├── Precio.jsx
│   │   ├── RutaProtegida.jsx
│   │   └── Selector.jsx
│   ├── molecules/
│   │   ├── CampoFormulario.jsx
│   │   ├── CampoSelector.jsx
│   │   ├── FilaPedido.jsx
│   │   ├── ItemPedido.jsx
│   │   └── SelectorTipoClient.jsx
│   ├── organisms/
│   │   ├── CatalogoGas.jsx
│   │   ├── Footer.jsx
│   │   ├── Formularios.jsx
│   │   ├── ListaPedidosDelDia.jsx
│   │   ├── Navbar.jsx
│   │   ├── TablaProductos.jsx
│   │   └── SeguimientoPedido.jsx
│   └── templates/
│       ├── PlantillaAdmin.jsx
│       └── PlantillaPublica.jsx
├── context/
│   ├── AutenticacionContext.jsx
│   ├── CarritoContext.jsx
│   ├── PedidosContext.jsx
│   └── ProductosContext.jsx
├── data/
│   ├── articulosBlog.js
│   ├── cilindros.js
│   ├── productos.js
│   └── repartidores.js
├── hooks/
│   ├── useAutenticacion.js
│   └── useTituloPagina.js
├── pages/
│   ├── AdminProductos.jsx
│   ├── AdminUsuarios.jsx
│   ├── Blog.jsx
│   ├── Carrito.jsx
│   ├── Catalogo.jsx
│   ├── Categorias.jsx
│   ├── Checkout.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── NoEncontrada.jsx
│   ├── Nosotros.jsx
│   ├── NuevoPedido.jsx
│   ├── Ofertas.jsx
│   ├── Operadora.jsx
│   ├── PedidoConfirmadoONoRealizado.jsx
│   ├── Producto.jsx
│   ├── Registro.jsx
│   ├── Repartidor.jsx
│   └── SeguimientoPedido.jsx
├── services/
│   ├── api.js
│   ├── carritoService.js
│   ├── pedidoService.js
│   ├── productoService.js
│   └── usuarioService.js
├── utils/
│   ├── precios.js
│   └── validaciones.js
├── App.jsx
├── index.css
├── main.jsx
└── setupTests.js
```

Las pruebas unitarias utilizan los nombres `*.test.js` y `*.test.jsx` y se encuentran junto a los archivos que prueban.

## Rutas públicas

| Ruta | Vista |
|---|---|
| `/` | Página de inicio |
| `/login` | Inicio de sesión |
| `/registro` | Creación de cuenta |
| `/carrito` | Carrito de compras |
| `/checkout` | Confirmación del pedido |
| `/pedido/resultado/:id` | Resultado del pedido |
| `/seguimiento` | Buscar o seguir un pedido |
| `/seguimiento/:id` | Detalle de seguimiento |
| `*` | Página no encontrada |

## Rutas protegidas por rol

| Ruta | Roles permitidos | Vista |
|---|---|---|
| `/perfil` | Todos los usuarios autenticados | Perfil y datos del cliente |
| `/operadora` | `operadora`, `admin` | Gestión de pedidos |
| `/repartidor` | `repartidor`, `admin` | Entregas asignadas |
| `/admin/productos` | `admin` | CRUD de productos |
| `/admin/usuarios` | `admin` | Gestión de usuarios |

Las rutas protegidas usan `RutaProtegida`. Si no existe una sesión válida, redirigen al inicio de sesión. Si el rol no está autorizado, muestran acceso denegado.

## Conexión con el backend

La instancia central de Axios está definida en `src/services/api.js`.

Características:

- URL configurable mediante `VITE_API_BASE_URL`.
- Timeout configurado de 10 segundos.
- Agregado automático del JWT Bearer desde `localStorage`.
- Normalización de errores devueltos por la API.

Los servicios del frontend consumen estos grupos de endpoints:

| Servicio | Endpoints principales |
|---|---|
| Autenticación | `/auth/register`, `/auth/login`, `/auth/me` |
| Usuarios | `/usuarios` |
| Productos | `/productos` |
| Pedidos | `/pedidos` |

El backend debe habilitar CORS para el origen de Vite, normalmente `http://localhost:5173`, y el puerto configurado por el servidor backend.

## Autenticación

- El token de acceso se guarda en `localStorage` con la clave `gas-el-volcan-access-token`.
- Axios agrega el token como `Authorization: Bearer <token>` a las solicitudes protegidas.
- `AutenticacionContext` restaura la sesión consultando el perfil al recargar la página.
- `RutaProtegida` controla el acceso según usuario autenticado y rol.

## Pruebas

Las pruebas cubren componentes, contextos, páginas, servicios y utilidades:

```bash
npm run test:run
npm run test:cov
```

## Material complementario

- [ERS versión 1 (Google Drive)](https://drive.google.com/drive/folders/1gQgQNAdRC82WPKbCPvOgrOTeHvAdklCW?usp=drive_link)
