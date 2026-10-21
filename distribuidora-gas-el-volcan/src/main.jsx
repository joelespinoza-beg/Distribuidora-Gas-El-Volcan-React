import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './styles/componentes.css';
import App from './App.jsx';
import { ProductosProvider } from './context/ProductosContext';
import { PedidosProvider } from './context/PedidosContext';
import { CarritoProvider } from './context/CarritoContext';

// Los providers envuelven la app: todos los componentes pueden abrir esas "cajas compartidas".
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
      <PedidosProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </PedidosProvider>
    </ProductosProvider>
  </StrictMode>,
);
