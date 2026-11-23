import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AutenticacionProvider } from './context/AutenticacionContext';
import { ProductosProvider } from './context/ProductosContext';
import { PedidosProvider } from './context/PedidosContext';
import { CarritoProvider } from './context/CarritoContext';

import RutaProtegida from './components/atoms/RutaProtegida';

// Importaciones de páginas
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PedidoConfirmadoONoRealizado from './pages/PedidoConfirmadoONoRealizado';
import Seguimiento from './pages/Seguimiento';
import Operadora from './pages/Operadora';
import Repartidor from './pages/Repartidor';
import AdminProductos from './pages/AdminProductos';
import AdminUsuarios from './pages/AdminUsuarios';
import NotFound from './pages/NotFound';

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
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido/resultado/:id" element={<PedidoConfirmadoONoRealizado />} />
                <Route path="/seguimiento" element={<Seguimiento />} />
                <Route path="/seguimiento/:id" element={<Seguimiento />} />

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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CarritoProvider>
          </PedidosProvider>
        </ProductosProvider>
      </AutenticacionProvider>
    </BrowserRouter>
  );
}

export default App;