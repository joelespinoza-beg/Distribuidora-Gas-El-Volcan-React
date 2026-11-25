import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AutenticacionProvider } from './context/AutenticacionContext';
import { ProductosProvider } from './context/ProductosContext';
import { PedidosProvider } from './context/PedidosContext';
import { CarritoProvider } from './context/CarritoContext';

import RutaProtegida from './components/atoms/RutaProtegida';

// Importaciones de páginas
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Producto from './pages/Producto';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import NuevoPedido from './pages/NuevoPedido';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PedidoConfirmadoONoRealizado from './pages/PedidoConfirmadoONoRealizado';
import SeguimientoPedido from './pages/SeguimientoPedido';
import Operadora from './pages/Operadora';
import Repartidor from './pages/Repartidor';
import AdminProductos from './pages/AdminProductos';
import AdminUsuarios from './pages/AdminUsuarios';
import NoEncontrada from './pages/NoEncontrada';

function App(props) {
  return (
    <BrowserRouter>
      <AutenticacionProvider>
        <ProductosProvider>
          <PedidosProvider>
            <CarritoProvider>
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/producto/:id" element={<Producto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido/nuevo" element={<NuevoPedido />} />
                <Route path="/pedido/resultado/:id" element={<PedidoConfirmadoONoRealizado />} />
                <Route path="/seguimiento" element={<SeguimientoPedido />} />
                <Route path="/seguimiento/:id" element={<SeguimientoPedido />} />

                {/* Rutas Protegidas por Rol */}
                <Route 
                  path="/operadora" 
                  element={
                    <RutaProtegida rolesPermitidos={['operadora', 'admin']}>
                      <Operadora />
                    </RutaProtegida>
                  } 
                />
                
                <Route 
                  path="/repartidor" 
                  element={
                    <RutaProtegida rolesPermitidos={['repartidor', 'admin']}>
                      <Repartidor />
                    </RutaProtegida>
                  } 
                />
                
                <Route 
                  path="/admin/productos" 
                  element={
                    <RutaProtegida rolesPermitidos={['admin']}>
                      <AdminProductos />
                    </RutaProtegida>
                  } 
                />

                <Route 
                  path="/admin/usuarios" 
                  element={
                    <RutaProtegida rolesPermitidos={['admin']}>
                      <AdminUsuarios />
                    </RutaProtegida>
                  } 
                />

                {/* Ruta 404 */}
                <Route path="*" element={<NoEncontrada />} />
              </Routes>
            </CarritoProvider>
          </PedidosProvider>
        </ProductosProvider>
      </AutenticacionProvider>
    </BrowserRouter>
  );
}

export default App;