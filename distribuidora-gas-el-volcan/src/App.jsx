import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Categorias from './pages/Categorias';
import Producto from './pages/Producto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import NuevoPedido from './pages/NuevoPedido';
import PedidoConfirmadoONoRealizado from './pages/PedidoConfirmadoONoRealizado';
import SeguimientoPedido from './pages/SeguimientoPedido';
import Operadora from './pages/Operadora';
import Repartidor from './pages/Repartidor';
import AdminProductos from './pages/AdminProductos';
import NoEncontrada from './pages/NoEncontrada';

// Mapa de rutas: para cada dirección, qué página se dibuja.
// Un ":" en el path crea un parámetro (en /producto/CL002, id vale "CL002").
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/pedido/nuevo" element={<NuevoPedido />} />
        <Route path="/pedido/resultado" element={<PedidoConfirmadoONoRealizado />} />
        <Route path="/pedido/resultado/:id" element={<PedidoConfirmadoONoRealizado />} />
        <Route path="/seguimiento" element={<SeguimientoPedido />} />
        <Route path="/seguimiento/:id" element={<SeguimientoPedido />} />
        <Route path="/operadora" element={<Operadora />} />
        <Route path="/repartidor" element={<Repartidor />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
