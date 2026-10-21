# Distribuidora-Gas-El-Volcan-React

Proyecto con fines académicos (DSY1104 · Desarrollo Full Stack II).

## Nombres de los integrantes

- Benjamin Gutierrez
- Nicolas Ibañez
- Joel Espinoza

## Caso semestral

- Distribuidora de Gas El Volcán

## Descripción

El Volcán es una empresa familiar de Chillán que distribuye cilindros de gas de 5, 11 y 15 kg a clientes residenciales y comerciales. Con una flota de 2 camiones y un equipo de 5 personas, gestiona de 80 a 120 pedidos diarios en la zona. Su nueva página web optimiza la administración interna y resuelve la logística de entregas en tiempo real. Así, los clientes monitorean el estado de sus pedidos mientras la empresa agiliza sus operaciones cotidianas.

## Estructura del proyecto

```
src/
├── components/
│   ├── atoms/
│   │   ├── Boton.jsx
│   │   ├── CampoTexto.jsx
│   │   ├── ContadorCantidad.jsx
│   │   ├── EtiquetaEstadoPedido.jsx
│   │   ├── Precio.jsx
│   │   └── Selector.jsx
│   ├── molecules/
│   │   ├── CampoFormulario.jsx
│   │   ├── CampoSelector.jsx
│   │   ├── FilaPedido.jsx
│   │   ├── ItemPedido.jsx
│   │   ├── SelectorTipoClient.jsx
│   │   └── TarjetaProducto.jsx
│   ├── organisms/
│   │   ├── CatalogoGas.jsx
│   │   ├── Footer.jsx
│   │   ├── FormularioLogin.jsx
│   │   ├── FormularioNuevoPedido.jsx
│   │   ├── FormularioProducto.jsx
│   │   ├── FormularioRegistro.jsx
│   │   ├── ListaEntregas.jsx
│   │   ├── ListaPedidosDelDia.jsx
│   │   ├── Navbar.jsx
│   │   ├── SeccionLogin.jsx
│   │   ├── SeguimientoPedido.jsx
│   │   └── TablaProductos.jsx
│   └── templates/
│       ├── PlantillaAdmin.jsx
│       └── PlantillaPublica.jsx
├── pages/
│   ├── AdminProductos.jsx
│   ├── Catalogo.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── NoEncontrada.jsx
│   ├── NuevoPedido.jsx
│   ├── Operadora.jsx
│   ├── PedidoConfirmadoONoRealizado.jsx
│   ├── Producto.jsx
│   ├── Registro.jsx
│   ├── Repartidor.jsx
│   └── SeguimientoPedido.jsx
├── context/
│   ├── PedidosContext.jsx
│   └── ProductosContext.jsx
├── data/
│   ├── cilindros.js
│   ├── productos.js
│   └── repartidores.js
├── hooks/
│   └── useTituloPagina.js
├── services/
│   ├── pedidoService.js
│   ├── productoService.js
│   └── usuarioService.js
├── utils/
│   ├── precios.js
│   └── validaciones.js
├── styles/
│   └── componentes.css
├── App.jsx
└── main.jsx
```

Las pruebas unitarias (`*.test.js` y `*.test.jsx`) están junto al archivo que prueban.

## Rutas de la aplicación

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` | Catálogo con filtros |
| `/producto/:id` | Detalle de un producto |
| `/login` y `/registro` | Ingreso y creación de cuenta |
| `/pedido/nuevo` | Solicitar un pedido |
| `/pedido/resultado` | Pedido confirmado o no realizado |
| `/seguimiento` | Seguimiento del pedido |
| `/operadora` | Operadora: pedidos del día |
| `/repartidor` | Repartidor: mis entregas |
| `/admin/productos` | Administración de productos (CRUD) |

## Tecnologías usadas

- React + Vite
- React Router
- Bootstrap
- Vitest y Testing Library (pruebas unitarias)

## Comandos para usar el proyecto

```bash
npm install
npm run dev
```

Para ejecutar las pruebas:

```bash
npm run test:run
npm run test:cov
```

## Material complementario

- [ERS versión 2 (Drive)]()
